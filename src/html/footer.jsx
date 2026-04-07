import Logo from "../assets/svg/logo.svg";
import Phone from "../assets/svg/phone.svg";
import Plane from "../assets/svg/plane.svg";
import Location from "../assets/svg/location.svg";
import { Link } from "react-router";

export default function Footer() {
	return (
		<footer className="footer">
			<section className="footer__app">
				<div className="footer__app__container">
					<div className="footer__app__container__content">
						<h2>Hold dig opdateret på salgsprocessen</h2>
						<p>
							Når du sælger din bolig hos Din Mægler, kommunikerer du nemt med
							den ansvarlige mægler eller butik i vores app. Her kan du følge
							interessen for din bolig og få overblik over hele salgsprocessen.
						</p>
						<div className="footer__app__container__content__buttons">
							<img
								src="https://placehold.co/130x40?text=Google+Play"
								alt="Google Play placeholder"
							/>
							<img
								src="https://placehold.co/130x40?text=App+Store"
								alt="App Store placeholder"
							/>
						</div>
					</div>
					<div className="footer__app__container__images">
						<img
							src="https://placehold.co/220x320?text=Phone+Mockup"
							alt="Telefon app mockup placeholder"
						/>
						<img
							src="https://placehold.co/220x320?text=Phone+Mockup"
							alt="Telefon app mockup placeholder"
						/>
					</div>
				</div>
			</section>

			<section className="footer__info">
				<div className="footer__info__container">
					<div className="footer__info__container__top">
						<img src={Logo} alt="Din Mægler logo" />
						<p>
							Din Mægler er din lokale ejendomsmægler i Roskilde. Vi kombinerer
							mange års erfaring med en moderne salgsproces og personlig rådgivning.
						</p>
					</div>

					<div className="footer__info__container__middle">
						<div className="footer__info__container__middle__contactBox">
							<ul>
								<li>
									<img src={Phone} alt="Telefon" />
									<div>
										<p>Ring til os</p>
										<p>+45 7070 4000</p>
									</div>
								</li>
								<li>
									<img src={Plane} alt="Email" />
									<div>
										<p>Send en mail</p>
										<p>4000@dinmaegler.com</p>
									</div>
								</li>
								<li>
									<img src={Location} alt="Lokation" />
									<div>
										<p>Butik</p>
										<p>Stændertorvet 78, 4000 Roskilde</p>
									</div>
								</li>
							</ul>
							<p>Din Mægler Roskilde, er din boligbutik i lokalområdet.</p>
						</div>

						<div className="footer__info__container__middle__links">
							<h4>Quick Links</h4>
							<ul>
								<li><Link to="/">Forside</Link></li>
								<li><Link to="/boliger">Boliger til salg</Link></li>
								<li><Link to="/maeglere">Mæglere</Link></li>
								<li><Link to="/contact">Kontakt os</Link></li>
								<li><Link to="/login">Log ind</Link></li>
								<li><Link to="/register">Bliv bruger</Link></li>
							</ul>
						</div>
					</div>

					<div className="footer__info__container__bottom">
						<div>
							<p>Medlem af</p>
							<h5>DMS</h5>
							<p>Dansk Mægler Sammenslutning</p>
						</div>
					</div>
				</div>
			</section>

			<section className="footer__copyright">
				<p>Layout by JL at Bank 2020</p>
			</section>
		</footer>
	);
}
