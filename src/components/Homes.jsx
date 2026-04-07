import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useAuth } from "../context/useAuth.jsx";

export default function Homes() {
  const [homes, setHomes] = useState([]);
  const [typeFilter, setTypeFilter] = useState("alle");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(12000000);
  const [searchParams] = useSearchParams();
  const { isLoggedIn, favoriteIds, toggleFavorite } = useAuth();

  useEffect(() => {
    fetch("https://dinmaegler.onrender.com/homes")
      .then((response) => response.json())
      .then((data) => {
        setHomes(data);
      });
  }, []);

  const searchQuery = searchParams.get("search")?.toLowerCase().trim() || "";

  const types = useMemo(() => {
    const uniqueTypes = [...new Set(homes.map((home) => home.type))];
    return ["alle", ...uniqueTypes];
  }, [homes]);

  const filteredHomes = homes.filter((home) => {
    const matchesType = typeFilter === "alle" ? true : home.type === typeFilter;
    const matchesPrice = home.price >= minPrice && home.price <= maxPrice;
    const text = `${home.adress1} ${home.city} ${home.type} ${home.description}`.toLowerCase();
    const matchesSearch = searchQuery ? text.includes(searchQuery) : true;
    return matchesType && matchesPrice && matchesSearch;
  });

  const formatPrice = (price) => new Intl.NumberFormat("da-DK").format(price);

  return (
    <main className="homesPage">
      <section className="pageBanner">
        <h1>Boliger til salg</h1>
        {searchQuery && <p>Resultat for: "{searchQuery}"</p>}
      </section>

      <section className="homesPage__filters">
        <div>
          <label htmlFor="typeFilter">Boligtype</label>
          <select id="typeFilter" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="minPrice">Minimum pris</label>
          <input id="minPrice" type="range" min="0" max="12000000" step="50000" value={minPrice} onChange={(event) => setMinPrice(Number(event.target.value))} />
          <p>{formatPrice(minPrice)} kr.</p>
        </div>

        <div>
          <label htmlFor="maxPrice">Maksimum pris</label>
          <input id="maxPrice" type="range" min="0" max="12000000" step="50000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} />
          <p>{formatPrice(maxPrice)} kr.</p>
        </div>
      </section>

      <section className="homesPage__list">
        {filteredHomes.map((home) => {
          const image = home.images?.[0]?.formats?.thumbnail?.url || home.images?.[0]?.url;
          const isFavorite = favoriteIds.includes(home.id);
          return (
            <article key={home.id} className="homesPage__list__card">
              <div className="homesPage__list__card__imageWrap">
                <img src={image} alt={home.adress1} />
                {isLoggedIn && (
                  <button
                    type="button"
                    className="homesPage__list__card__imageWrap__favorite"
                    onClick={() => toggleFavorite(home.id)}
                  >
                    {isFavorite ? "♥" : "♡"}
                  </button>
                )}
              </div>
              <div className="homesPage__list__card__body">
                <h2>{home.adress1}</h2>
                <p>{home.postalcode} {home.city}</p>
                <p>{home.type} | {home.livingspace} m2 | {home.rooms} værelser</p>
                <h3>{formatPrice(home.price)} kr.</h3>
                <Link to={`/bolig/${home.id}`}>Se detaljer</Link>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
