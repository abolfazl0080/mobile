import Navbar from "./navbar";
import ProductCard from "./productCard";
import Footer from "./footer";
import { getAllProducts } from "./db";
import { useState, useEffect } from "react";
import "./home.css"


export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  async function fetchProducts() {
    setLoading(true);
    const data = await getAllProducts();
    if (data) setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <h2>Products</h2>

        <div className="products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}