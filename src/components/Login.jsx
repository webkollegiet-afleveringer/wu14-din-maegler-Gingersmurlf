import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Indtast både e-mail og adgangskode");
      return;
    }
    login();
    navigate("/");
  };

  return (
    <main className="authPage">
      <section className="pageBanner">
        <h1>Log ind</h1>
      </section>
      <section className="authPage__box authPage__box--compact">
        <h2>Log ind på din bruger</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="loginEmail">E-mail</label>
          <input id="loginEmail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />

          <label htmlFor="loginPassword">Adgangskode</label>
          <input id="loginPassword" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

          <button type="submit">Log ind</button>
          {error && <p className="authPage__box__error">{error}</p>}
        </form>

        <div className="authPage__box__social">
          <button type="button" className="google">Google</button>
          <button type="button" className="facebook">Facebook</button>
          <button type="button" className="twitter">Twitter</button>
        </div>

        <p>
          Har du ikke en bruger? <Link to="/register">Klik her</Link>
        </p>
      </section>
    </main>
  );
}
