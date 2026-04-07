import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setError("Udfyld venligst navn, e-mail og besked");
            setSuccess("");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Indtast en gyldig e-mailadresse");
            setSuccess("");
            return;
        }
        console.log("Kontaktformular:", formData);
        setError("");
        setSuccess("Tak for din besked. Vi kontakter dig hurtigst muligt.");
        setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
        });
    };

    return (
        <main className="contactPage">
            <section className="pageBanner">
                <h1>Kontakt os</h1>
            </section>

            <section className="contactPage__content">
                <form className="contactPage__content__form" onSubmit={handleSubmit}>
                    <p>Vi sidder klar til at hjælpe dig med spørgsmål om boligkøb, salg eller vurdering.</p>
                    <h2>Send os en besked</h2>
                    <label htmlFor="name">Navn</label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />

                    <label htmlFor="email">E-mail</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />

                    <label htmlFor="phone">Telefon</label>
                    <input id="phone" name="phone" type="text" value={formData.phone} onChange={handleChange} />

                    <label htmlFor="message">Besked</label>
                    <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange}></textarea>

                    <button type="submit">Send besked</button>
                    {error && <p className="contactPage__content__form__error">{error}</p>}
                    {success && <p className="contactPage__content__form__success">{success}</p>}
                </form>

                <aside className="contactPage__content__contactBox">
                    <h3>Kontaktinfo</h3>
                    <p>Telefon</p>
                    <p>+45 7070 4000</p>
                    <p>E-mail</p>
                    <p>4000@dinmaegler.com</p>
                    <p>Adresse</p>
                    <p>Stændertorvet 78, 4000 Roskilde</p>
                </aside>
            </section>

            <section className="contactPage__mapSection">
                <img
                    src="https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=1200&height=380&center=lonlat:12.0837,55.6415&zoom=12.5&marker=lonlat:12.0837,55.6415;color:%23162A41;size:large&apiKey=3d8448b6f09848bc9028816b8e9d8f85"
                    alt="Kort over Din Mægler i Roskilde"
                />
            </section>
        </main>
    );
}