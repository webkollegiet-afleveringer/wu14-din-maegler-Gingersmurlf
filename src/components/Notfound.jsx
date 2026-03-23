import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="notfound">
            <h1>
                Hvad laver du her, kom tilbage til forsiden!
            </h1>
            <Link to="/"><button>Til forsiden</button></Link>
        </div>
    )
}