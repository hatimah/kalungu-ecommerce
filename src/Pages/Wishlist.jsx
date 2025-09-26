// src/pages/Wishlist.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    const fetchWishlist = async () => {
      try {
        const data = await api.getWishlist();
        if (!isActive) return;
        const items = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        setWishlist(items);
      } catch (e) {
        if (isActive) setError("Failed to load wishlist");
      } finally {
        if (isActive) setLoading(false);
      }
    };
    fetchWishlist();
    return () => { isActive = false; };
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      await api.removeWishlist(productId);
      setWishlist(items => items.filter(p => (p.product_id ?? p.id) !== productId));
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  };

  const wishlistProducts = wishlist.map(item => item.product || item);

  if (loading) {
    return (
      <div className="container" style={{ padding: "2rem 0" }}>
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: "2rem 0" }}>
        <p>{error}</p>
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="container" style={{ padding: "2rem 0" }}>
        <h1>Wishlist</h1>
        <p>Saved items will appear here.</p>
        <Link to="/shop" className="btn btn-primary">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "2rem 0" }}>
      <h1>Wishlist</h1>
      <div>
        {wishlistProducts.map(product => (
          <div 
            key={product.id} 
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, borderBottom: '1px solid #eee' }}
          >
            <img 
              src={product.image || product.image_url || ''} 
              alt={product.name || ''} 
              style={{ width: 64, height: 64, objectFit: 'cover' }} 
            />
            <div style={{ flex: 1 }}>
              <div>{product.name}</div>
              <small style={{ color: '#666' }}>{product.category?.name || product.category || ''}</small>
            </div>
            <Link to={`/shop/${product.id}`} className="btn btn-secondary">View</Link>
            <button onClick={() => removeFromWishlist(product.id)} className="btn btn-danger">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
