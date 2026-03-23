import Phone from "../assets/svg/phone.svg";
import Plane from "../assets/svg/plane.svg";
import User from "../assets/svg/user.svg";
import Logo from "../assets/svg/logo.svg";
import { Link } from "react-router";

export default function Header() {
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
            <p>45+ 70 70 40 00</p>
          </li>
          <li>
            <img src={User} alt="User" />
            <p>Log ind</p>
          </li>
        </ul>
      </address>
      <nav className="header__nav">
        <img src={Logo} alt="Logo" />
        <ul className="header__nav__list">
          <li>
            <Link to="/">Boliger til salg</Link>
          </li>
          <li>
            <Link to="/">Mæglere</Link>
          </li>
          <li>
            <Link to="/">Mine favoritter</Link>
          </li>
          <li>
            <Link to="/contact">Kontakt os</Link>
          </li>
        </ul>
      </nav>
      <section className="header__heroSection">
        <img
          src="../../public/hero-house.png"
          alt="background image, of a house"
        />
        <h3>Søg efter din drømmebolig</h3>
        <div className="header__heroSection__white">
          <form>
            <input
              type="text"
              placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignendes"
            />
            <button type="submit">Søg</button>
          </form>
        </div>
      </section>
    </header>
  );
}
