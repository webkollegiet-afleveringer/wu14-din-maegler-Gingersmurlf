import Phone from "../assets/svg/phone.svg";
import Plane from "../assets/svg/plane.svg";
import User from "../assets/svg/user.svg";
import Logo from "../assets/svg/logo.svg";

import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/useAuth.jsx";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const isFrontPage = location.pathname === "/";

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchValue.trim();
    if (query.length === 0) {
      navigate("/boliger");
      return;
    }
    navigate(`/boliger?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="header">
      <address className="header__adress">
        <ul className="header__adress__list">
          <li>
            <img src={Plane} alt="Plane" />
            <p>4000@dinmaegler.com</p>
          </li>
          <li>
            <img src={Phone} alt="Phone" />
            <p>+45 70 70 40 00</p>
          </li>
          <li>
            <img src={User} alt="User" />
            {isLoggedIn ? (
              <button type="button" onClick={logout} className="header__adress__list__logoutBtn">Log ud</button>
            ) : (
              <Link to="/login">Log ind</Link>
            )}
          </li>
        </ul>
      </address>
      <nav className="header__nav">
        <Link to="/"><img src={Logo} alt="Logo" /></Link>
        <ul className="header__nav__list">
          <li>
            <Link to="/">Forside</Link>
          </li>
          <li>
            <Link to="/boliger">Boliger til salg</Link>
          </li>
          <li>
            <Link to="/maeglere">Mæglere</Link>
          </li>
          {isLoggedIn && (<li><Link to="/favoritter">Mine favoritter</Link></li>)}
          <li>
            <Link to="/contact">Kontakt os</Link>
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/register">Bliv bruger</Link>
            </li>
          )}
          <li>
            <Link to={isLoggedIn ? "/favoritter" : "/login"}>{isLoggedIn ? "Min side" : "Login"}</Link>
          </li>
        </ul>
      </nav>
      {isFrontPage && (
      <section className="header__heroSection">
        <img
          src="/hero-house.png"
          alt="background image, of a house"
        />
        <div className="header__heroSection__box">
          <div className="header__heroSection__box__heading">
            <h2>Søg efter din drømmebolig</h2>
          </div>
          <div className="header__heroSection__box__white">
            <p 
            id="hej"
            className="header__heroSection__box__white__header">
              Søg blandt 158 boliger til salg i 74 butikker
            </p>
            <form className="header__heroSection__box__white__form" onSubmit={handleSearch}>
              <legend className="header__heroSection__box__white__form__legend">
                Hvad skal din næste bolig indeholde
              </legend>
              <input
                className="header__heroSection__box__white__form__input"
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignende"
              />
              <button
                className="header__heroSection__box__white__form__btn"
                type="submit"
              >
                Søg
              </button>
            </form>
          </div>
        </div>
      </section>
      )}
    </header>
  );
}
