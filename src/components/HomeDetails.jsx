import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../context/useAuth.jsx";

export default function HomeDetails() {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [activeOverlay, setActiveOverlay] = useState("");
  const { isLoggedIn, favoriteIds, toggleFavorite } = useAuth();

  useEffect(() => {
    fetch(`https://dinmaegler.onrender.com/homes/${id}`)
      .then((response) => response.json())
      .then((data) => setHome(data));
  }, [id]);

  if (!home) {
    return (
      <main className="homeDetailsPage">
        <p>Henter bolig...</p>
      </main>
    );
  }

  const heroImage = home.images?.[0]?.url;
  const isFavorite = favoriteIds.includes(home.id);
  const formatPrice = (price) => new Intl.NumberFormat("da-DK").format(price);

  return (
    <main className="homeDetailsPage">
      <section className="homeDetailsPage__hero">
        <img src={heroImage} alt={home.adress1} />
      </section>

      <section className="homeDetailsPage__intro">
        <div>
          <h1>{home.adress1}</h1>
          <p>{home.postalcode} {home.city}</p>
        </div>
        <h2>{formatPrice(home.price)} kr.</h2>
      </section>

      <section className="homeDetailsPage__actions">
        <button type="button" onClick={() => setActiveOverlay("gallery")}>Galleri</button>
        <button type="button" onClick={() => setActiveOverlay("floor")}>Plantegning</button>
        <button type="button" onClick={() => setActiveOverlay("map")}>Kort</button>
        {isLoggedIn && (
          <button type="button" onClick={() => toggleFavorite(home.id)}>
            {isFavorite ? "Fjern fra favoritter" : "Tilføj til favoritter"}
          </button>
        )}
      </section>

      <section className="homeDetailsPage__facts">
        <div><h3>Type</h3><p>{home.type}</p></div>
        <div><h3>Boligareal</h3><p>{home.livingspace} m2</p></div>
        <div><h3>Grundareal</h3><p>{home.lotsize} m2</p></div>
        <div><h3>Rum</h3><p>{home.rooms}</p></div>
        <div><h3>Byggeår</h3><p>{home.built}</p></div>
        <div><h3>Energimærke</h3><p>{home.energylabel}</p></div>
      </section>

      <section className="homeDetailsPage__description">
        <h3>Beskrivelse</h3>
        <p>{home.description}</p>
      </section>

      <section className="homeDetailsPage__agent">
        <img src={home.agent?.image?.formats?.thumbnail?.url || home.agent?.image?.url} alt={home.agent?.name} />
        <div>
          <h3>Ansvarlig mægler</h3>
          <h4>{home.agent?.name}</h4>
          <p>{home.agent?.title}</p>
          <p>{home.agent?.phone}</p>
          <p>{home.agent?.email}</p>
          <Link to={`/maegler/${home.agent?.id}`}>Se mæglerprofil</Link>
        </div>
      </section>

      {activeOverlay && (
        <section className="homeDetailsPage__overlay" onClick={() => setActiveOverlay("")}>
          <div className="homeDetailsPage__overlay__content" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setActiveOverlay("")}>Luk</button>
            {activeOverlay === "gallery" && (
              <div className="homeDetailsPage__overlay__content__grid">
                {home.images?.map((image) => (
                  <img key={image.id} src={image.url} alt={home.adress1} />
                ))}
              </div>
            )}
            {activeOverlay === "floor" && (
              <img src={home.floorplan?.url} alt={`Plantegning ${home.adress1}`} />
            )}
            {activeOverlay === "map" && (
              <img
                src={`https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=900&height=520&center=lonlat:${home.long},${home.lat}&zoom=13.5&marker=lonlat:${home.long},${home.lat};color:%23162A41;size:large&apiKey=3d8448b6f09848bc9028816b8e9d8f85`}
                alt={`Kort over ${home.adress1}`}
              />
            )}
          </div>
        </section>
      )}
    </main>
  );
}
