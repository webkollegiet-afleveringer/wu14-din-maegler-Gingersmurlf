import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("https://dinmaegler.onrender.com/agents")
      .then((response) => response.json())
      .then((data) => setAgents(data));
  }, []);

  return (
    <main className="agentsPage">
      <section className="pageBanner">
        <h1>Medarbejdere i Roskilde</h1>
      </section>

      <section className="agentsPage__grid">
        {agents.map((agent) => {
          const image = agent.image?.formats?.thumbnail?.url || agent.image?.url;
          return (
            <article key={agent.id} className="agentsPage__grid__card">
              <img src={image} alt={agent.name} />
              <div>
                <h2>{agent.name}</h2>
                <p>{agent.title}</p>
                <p>{agent.phone}</p>
                <p>{agent.email}</p>
                <Link to={`/maegler/${agent.id}`}>Se profil</Link>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
