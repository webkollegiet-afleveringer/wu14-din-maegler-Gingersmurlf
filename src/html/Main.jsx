import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";

import solgt from "../assets/svg/boliger-solgt.svg";
import salg from "../assets/svg/boliger-til-salg.svg";
import hand from "../assets/svg/customer-hand.svg";
import salesCheck from "../assets/svg/salgstjek.svg";
import Phone from "../assets/svg/phone.svg";
import Plane from "../assets/svg/plane.svg";
import Location from "../assets/svg/location.svg";

export default function Main() {
  const boligerSolgt = 1000;
  const [boligerTilSalg, setBoligerTilSalg] = useState(0);
  const [homes, setHomes] = useState([]);
  const [agents, setAgents] = useState([]);
  const [newsletterMail, setNewsletterMail] = useState("");
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState("");

  useEffect(() => {
    fetch("https://dinmaegler.onrender.com/homes/count", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setBoligerTilSalg(data);
      });

    fetch("https://dinmaegler.onrender.com/homes", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setHomes(data.slice(0, 4));
      });

    fetch("https://dinmaegler.onrender.com/agents", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAgents(data.slice(0, 3));
      });
  }, []);

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterMail)) {
      setNewsletterError("Indtast en gyldig e-mailadresse");
      setNewsletterSuccess("");
      return;
    }
    console.log("Tilmeld nyhedsbrev:", { email: newsletterMail });
    setNewsletterSuccess("Tak for din tilmelding");
    setNewsletterError("");
    setNewsletterMail("");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("da-DK").format(price);
  };

  return (
    <main className="main">
      <section className="main__firstSection">
        <div className="main__firstSection__container">
          <img src="/38aars-maegler-erfaring.png" alt="38 års mæglererfaring" />
          <div className="main__firstSection__container__box">
            <h3>Vi har fulgt danskerne hjem i snart 4 årtier</h3>
            <h4>Det synes vi siger noget om os!</h4>
            <p>
              Siden 1985 har vi hjulpet danske familier med at finde hjem i
              både by og forstad. Med lokalkendskab, ærlig rådgivning og en
              tæt dialog gennem hele processen gør vi bolighandel tryg.
            </p>
            <p>
              Vi ved, at hver bolig er unik. Derfor møder vi både købere og
              sælgere med en personlig indsats, høj faglighed og fokus på det
              resultat, der giver mening for dig.
            </p>
            <div className="main__firstSection__container__box__images">
              <div className="main__firstSection__container__box__images__">
                <img className="blue" src={solgt} alt="Boliger solgt" />
                <div>
                  <h5>{boligerSolgt}</h5>
                  <p>Boliger solgt</p>
                </div>
              </div>
              <div>
                <img className="blue" src={salg} alt="Boliger til salg" />
                <div>
                  <h5>{boligerTilSalg}</h5>
                  <p>Boliger til salg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main__firstSection__features">
          <article>
            <img src={salesCheck} alt="Salgstjek" />
            <h5>Gratis salgstjek</h5>
            <p>Få professionel vurdering af din bolig.</p>
          </article>
          <article>
            <img src={Plane} alt="Mail" />
            <h5>Tryg kommunikation</h5>
            <p>Følg hele salgsprocessen tæt med os.</p>
          </article>
          <article>
            <img src={Location} alt="Lokation" />
            <h5>Lokalt kendskab</h5>
            <p>Stærk indsigt i områderne omkring Roskilde.</p>
          </article>
          <article>
            <img src={Phone} alt="Telefon" />
            <h5>Direkte kontakt</h5>
            <p>Ring til os når som helst i åbningstiden.</p>
          </article>
        </div>
      </section>

      <section className="main__homesSection">
        <div className="main__sectionHeading">
          <h3>Udvalgte boliger</h3>
          <Link to="/boliger">Se alle boliger</Link>
        </div>
        <div className="main__homesSection__grid">
          {homes.map((home) => {
            const image = home.images?.[0]?.formats?.thumbnail?.url || home.images?.[0]?.url;
            return (
              <article key={home.id} className="main__homesSection__grid__card">
                <img src={image} alt={home.adress1} />
                <div className="main__homesSection__grid__card__body">
                  <h4>{home.adress1}</h4>
                  <p>{home.postalcode} {home.city}</p>
                  <p>{home.type} | {home.livingspace} m2 | {home.rooms} værelser</p>
                  <h5>{formatPrice(home.price)} kr.</h5>
                  <Link to={`/bolig/${home.id}`}>Se bolig</Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="main__newsletterSection">
        <div className="main__newsletterSection__box">
          <img src={hand} alt="Nyhedsbrev" />
          <div>
            <h3>Tilmeld nyhedsbrev</h3>
            <p>Få nye boliger og seneste nyheder direkte i din indbakke.</p>
          </div>
          <form onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              value={newsletterMail}
              onChange={(event) => setNewsletterMail(event.target.value)}
              placeholder="Din e-mail"
            />
            <button type="submit">Tilmeld</button>
          </form>
          {newsletterError && <p className="main__newsletterSection__box__error">{newsletterError}</p>}
          {newsletterSuccess && <p className="main__newsletterSection__box__success">{newsletterSuccess}</p>}
        </div>
      </section>

      <section className="main__agentsSection">
        <div className="main__sectionHeading">
          <h3>Mød vores mæglere</h3>
          <Link to="/maeglere">Se alle mæglere</Link>
        </div>
        <div className="main__agentsSection__grid">
          {agents.map((agent) => {
            const image = agent.image?.formats?.thumbnail?.url || agent.image?.url;
            return (
              <article key={agent.id} className="main__agentsSection__grid__card">
                <img src={image} alt={agent.name} />
                <div>
                  <h4>{agent.name}</h4>
                  <p>{agent.title}</p>
                  <Link to={`/maegler/${agent.id}`}>Kontakt mægler</Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="main__serviceSection">
        <div className="main__serviceSection__box">
          <img src={salesCheck} alt="Salgstjek" />
          <div>
            <h3>Gratis salgstjek af din bolig</h3>
            <p>
              Få en professionel vurdering af din bolig og en plan for et godt
              salg. Vi gennemgår muligheder, prisniveau og timing sammen med dig.
            </p>
            <Link to="/contact">Book en vurdering</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
