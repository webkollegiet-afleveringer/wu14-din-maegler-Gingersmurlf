import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Udfyld alle felter");
      setSuccess("");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Adgangskoderne matcher ikke");
      setSuccess("");
      return;
    }
    console.log("Ny bruger registreret:", formData);
    setError("");
    setSuccess("Brugeren er oprettet. Du kan nu logge ind.");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <main className="authPage">
      <section className="pageBanner">
        <h1>Register</h1>
      </section>
      <section className="authPage__box authPage__box--compact">
        <h2>Opret bruger hos Din Mægler</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="registerName">Navn</label>
          <input id="registerName" name="name" type="text" value={formData.name} onChange={handleChange} />

          <label htmlFor="registerEmail">E-mail</label>
          <input id="registerEmail" name="email" type="email" value={formData.email} onChange={handleChange} />

          <label htmlFor="registerPassword">Adgangskode</label>
          <input id="registerPassword" name="password" type="password" value={formData.password} onChange={handleChange} />

          <label htmlFor="registerConfirmPassword">Gentag adgangskode</label>
          <input id="registerConfirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />

          <button type="submit">Registrer bruger</button>
          {error && <p className="authPage__box__error">{error}</p>}
          {success && <p className="authPage__box__success">{success}</p>}
        </form>
      </section>
    </main>
  );
}
