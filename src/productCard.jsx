import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />

      <div className="content">
        <h3>{product.title}</h3>
        <p>{product.price}</p>

        <button>
          <Link style={{textDecoration:"none", color:"white"}} to={`/product/${product.id}`}>Detail</Link>
        </button>
      </div>
    </div>
  );
}