import { useState } from "react";

import solgt from "../assets/svg/boliger-solgt.svg";
import salg from "../assets/svg/boliger-til-salg.svg";

export default function Main() {
  const [boligerSolgt, setBoligerSolgt] = useState(1000);
  const [boligerTilSalg, setBoligerTilSalg] = useState(0);

  fetch("https://dinmaegler.onrender.com/homes/count", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      setBoligerTilSalg(data);
    });

  
  return (
    <main className="main">
      <section className="main__firstSection">
        <div className="main__firstSection__container">
          <img src="/38aars-maegler-erfaring.png" alt="38 års mæglererfaring" />
          <div className="main__firstSection__container__box">
            <h3>Vi har fulgt danskerne hjem i snart 4 årtier</h3>
            <h4>Det synes vi siger noget om os!</h4>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has normal distribution.
            </p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
            <div className="main__firstSection__container__box__images">
                <img className="blue" src={solgt} alt="Boliger solgt" />
              <div>
                <h5>{boligerSolgt}</h5>
                <p>Boliger solgt</p>
              </div>
                <img className="blue" src={salg} alt="Boliger til salg" />
              <div>
                <h5>{boligerTilSalg}</h5>
                <p>Boliger til salg</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
