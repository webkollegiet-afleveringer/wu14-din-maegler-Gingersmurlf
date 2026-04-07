import { Link } from "react-router";

export default function NotFound() {
    return (
        <main className="notfound">
            <h1>Hov!</h1>
            <p>Du er havnet på en side som ikke findes.</p>
            <p>Tryk på knappen nedenfor for at komme tilbage.</p>
            <Link to="/"><button>Til forsiden</button></Link>
        </main>
    )
}