import Navbar from "./navbar";
import Footer from "./footer";
import {getOneProduct} from "./db";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./home.css";

export default function ProductDetail() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams()
  
    async function fetchProduct() {
        setLoading(true);
        const data = await getOneProduct(id);
        if (data) setProduct(data[0]);
        setLoading(false);
    }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <div className="product-detail">
          <img
            src={product.image}
            alt={product.title}
          />

          <div className="details">
            <h1>{product.title}</h1>

            <h2>${product.price}</h2>

            <p>
              {product.description}
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}