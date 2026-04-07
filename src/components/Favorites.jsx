import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/useAuth.jsx";

export default function Favorites() {
  const [homes, setHomes] = useState([]);
  const { isLoggedIn, favoriteIds, toggleFavorite } = useAuth();

  useEffect(() => {
    fetch("https://dinmaegler.onrender.com/homes")
      .then((response) => response.json())
      .then((data) => setHomes(data));
  }, []);

  const favorites = useMemo(() => {
    return homes.filter((home) => favoriteIds.includes(home.id));
  }, [homes, favoriteIds]);

  const formatPrice = (price) => new Intl.NumberFormat("da-DK").format(price);

  if (!isLoggedIn) {
    return (
      <main className="favoritesPage">
        <section className="pageBanner">
          <h1>Mine favoritboliger</h1>
        </section>
        <p>Du skal være logget ind for at se favoritter.</p>
        <Link to="/login">Gå til login</Link>
      </main>
    );
  }

  return (
    <main className="favoritesPage">
      <section className="pageBanner">
        <h1>Mine favoritboliger</h1>
      </section>
      {favorites.length === 0 && (
        <p>
          Du har ingen favoritboliger endnu. <Link to="/boliger">Se alle boliger</Link>
        </p>
      )}

      <section className="favoritesPage__list">
        {favorites.map((home) => {
          const image = home.images?.[0]?.formats?.thumbnail?.url || home.images?.[0]?.url;
          return (
            <article key={home.id} className="favoritesPage__list__card">
              <img src={image} alt={home.adress1} />
              <div>
                <h2>{home.adress1}</h2>
                <p>{home.postalcode} {home.city}</p>
                <h3>{formatPrice(home.price)} kr.</h3>
                <div className="favoritesPage__list__card__actions">
                  <Link to={`/bolig/${home.id}`}>Se bolig</Link>
                  <button type="button" onClick={() => toggleFavorite(home.id)}>Fjern fra favoritter</button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
