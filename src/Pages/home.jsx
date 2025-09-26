// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../data/Products";
import OurStory from "./OurStory";
import api from "../lib/api";
import "./home.css";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  // Fetch the user's cart from backend on page load
  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const cartData = await api.getCart();
        if (!isActive) return;
        setCart(cartData.data || cartData);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        if (isActive) setLoadingCart(false);
      }
    })();
    return () => { isActive = false; };
  }, []);

  const addToCart = async (product) => {
    try {
      // Add to backend cart
      await api.addToCart({ product_id: product.id, quantity: 1 });
      // Fetch updated cart
      const cartData = await api.getCart();
      setCart(cartData.data || cartData);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to Kalungu Banana Fiber</h1>
            <p>Discover beautiful, sustainable products crafted from natural banana fiber. Supporting local communities while protecting our planet.</p>
            <div className="hero-buttons">
              <Link to="/shop" className="hero-btn primary">Explore Our Crafts</Link>
              <Link to="/our-story" className="hero-btn secondary">Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Kalungu?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>100% Sustainable</h3>
              <p>Made from natural banana fiber, completely biodegradable and eco-friendly.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Fair Trade</h3>
              <p>Supporting local artisans and communities in Uganda with fair wages.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Handcrafted</h3>
              <p>Each product is carefully handcrafted with attention to detail and quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => {
              const inCart = cart.some(item => item.product_id === product.id);

              return (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} />
                    {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
                    <div className="product-overlay">
                      <Link to={`/shop/${product.id}`} className="btn-details">View Details</Link>
                      <button 
                        className="btn-cart" 
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock || inCart || loadingCart}
                      >
                        {inCart ? "In Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating-text">({product.reviews})</span>
                    </div>
                    <div className="product-pricing">
                      <span className="current-price">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="products-cta">
            <Link to="/shop" className="cta-button">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <OurStory />
    </div>
  );
}
