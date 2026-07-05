import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Mini Shop</h2>
      <div>
        <button style={{marginRight:"5px"}}>
          <Link to="/">Home</Link>
        </button>
        <button>
          <Link to="/dashboard">Dashboard</Link>
        </button>
      </div>
    </nav>
  );
}