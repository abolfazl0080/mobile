import { useState, useEffect } from "react";
import { createProduct, getAllProducts, updateProduct, deleteProduct } from './db';
import "./Dashboard.css";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState(null);

  async function fetchProducts() {
    setLoading(true);
    const data = await getAllProducts();
    if (data) setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setDescription(product.description || "");
    setPrice(product.price.toString());
    setImage(product.image || "");
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setImage("");
  };

  async function handleDelete(id, productTitle) {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${productTitle}"?`);
    if (!confirmDelete) return;

    await deleteProduct(id);
    if (editingId === id) resetForm();
    fetchProducts();
  }

  async function handleSaveProduct(e) {
    e.preventDefault();
    if (!title || !price) return alert("Title and Price are required!");

    if (editingId) {
      await updateProduct(editingId, title, description, parseFloat(price), image);
    } else {
      await createProduct(title, description, parseFloat(price), image);
    }
    
    resetForm();
    fetchProducts();
  }

  return (
    <main className="app-container">
      <header className="store-header">
        <h1>🏪 Store Dashboard</h1>
        <p>Natively managing your SQLite database inventory.</p>
      </header>

      <div className="store-layout">
        {/* Creation & Modification Form */}
        <section className="form-section">
          <h2>{editingId ? "✏️ Edit Product" : "✨ Add New Product"}</h2>
          <form onSubmit={handleSaveProduct} className="product-form">
            <div className="input-group">
              <label>Product Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Wireless Mouse" />
            </div>

            <div className="input-group">
              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Item details..." />
            </div>

            <div className="input-group">
              <label>Price ($)</label>
              <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
            </div>

            <div className="input-group">
              <label>Product Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {image && <img src={image} alt="Preview" className="form-image-preview" />}
            </div>

            <button type="submit" className="btn-primary">
              {editingId ? "Update Changes" : "Save Product"}
            </button>
            
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel Edit
              </button>
            )}
          </form>
        </section>

        {/* Product Catalog Grid */}
        <section className="catalog-section">
          <h2>Current Inventory ({products.length})</h2>
          
          {loading ? (
<p className="status-msg">Loading catalog...</p>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  {product.image && (
                    <div className="product-card-image-wrapper">
                      <img src={product.image} alt={product.title} className="product-card-image" />
                    </div>
                  )}
                  <div className="card-header">
                    <h3>{product.title}</h3>
                    <span className="price-tag">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="card-desc">{product.description || "No description."}</p>
                  
                  <div className="card-actions">
                    <button onClick={() => startEdit(product)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id, product.title)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Dashboard; 