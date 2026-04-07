import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

export default function AgentDetails() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [homes, setHomes] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    fetch("https://dinmaegler.onrender.com/agents")
      .then((response) => response.json())
      .then((data) => {
        const foundAgent = data.find((currentAgent) => currentAgent.id === id);
        setAgent(foundAgent || null);
      });

    fetch("https://dinmaegler.onrender.com/homes")
      .then((response) => response.json())
      .then((data) => setHomes(data));
  }, [id]);

  const filteredHomes = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) {
      return homes;
    }
    return homes.filter((home) => {
      const text = `${home.adress1} ${home.city} ${home.type}`.toLowerCase();
      return text.includes(query);
    });
  }, [homes, search]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Udfyld alle felter i formularen");
      setFormSuccess("");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Indtast en gyldig e-mailadresse");
      setFormSuccess("");
      return;
    }
    console.log("Besked til mægler:", { agentId: id, ...formData });
    setFormError("");
    setFormSuccess("Beskeden er sendt til mægleren");
    setFormData({ name: "", email: "", message: "" });
  };

  if (!agent) {
    return (
      <main className="agentDetailsPage">
        <p>Henter mægler...</p>
      </main>
    );
  }

  const image = agent.image?.formats?.thumbnail?.url || agent.image?.url;

  return (
    <main className="agentDetailsPage">
      <section className="pageBanner">
        <h1>Kontakt en medarbejder</h1>
      </section>

      <section className="agentDetailsPage__intro">
        <div className="agentDetailsPage__intro__profile">
          <img src={image} alt={agent.name} />
          <h2>{agent.name}</h2>
          <p>{agent.title}</p>
          <p>{agent.phone}</p>
          <p>{agent.email}</p>
        </div>
        <div className="agentDetailsPage__intro__about">
          <h3>Om {agent.name}</h3>
          <p>{agent.description}</p>
        </div>
        <div className="agentDetailsPage__intro__contactCard">
          <h3>Kontakt Mægler</h3>
          <p>{agent.name}</p>
          <p>{agent.email}</p>
          <p>{agent.phone}</p>
        </div>
      </section>

      <section className="agentDetailsPage__formSection">
        <h3>Send besked til mægler</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="agentName">Navn</label>
          <input id="agentName" name="name" type="text" value={formData.name} onChange={handleFormChange} />

          <label htmlFor="agentEmail">E-mail</label>
          <input id="agentEmail" name="email" type="email" value={formData.email} onChange={handleFormChange} />

          <label htmlFor="agentMessage">Besked</label>
          <textarea id="agentMessage" name="message" rows="5" value={formData.message} onChange={handleFormChange}></textarea>

          <button type="submit">Send besked</button>
          {formError && <p className="agentDetailsPage__formSection__error">{formError}</p>}
          {formSuccess && <p className="agentDetailsPage__formSection__success">{formSuccess}</p>}
        </form>
      </section>

      <section className="agentDetailsPage__searchSection">
        <h3>Find Bolig</h3>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Søg på adresse, by eller boligtype"
        />
        <p>Antal resultater: {filteredHomes.length}</p>
      </section>
    </main>
  );
}
