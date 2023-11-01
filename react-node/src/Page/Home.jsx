import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="button-container">
      <Link to="/firebase">Fierbase</Link>
      <Link to="/auth">Mongo</Link>
    </div>
  );
}
