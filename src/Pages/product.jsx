// src/pages/product.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaTruck, FaUndo, FaLeaf } from "react-icons/fa";
import api from "../lib/api";
import "./product.css";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const load = async () => {
      try {
        const data = await api.getProduct(id);
        if (!isActive) return;
        setProduct(data?.data || data);
        setIsLoading(false);
      } catch (e) {
        if (!isActive) return;
        navigate('/shop');
      }
    };
    load();
    return () => { isActive = false };
  }, [id, navigate]);

  const handleAddToCart = async () => {
    try {
      await api.addToCart({ product_id: product.id, quantity });
      alert(`${product.name} (x${quantity}) added to cart!`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add to cart';
      alert(msg);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await api.addWishlist(product.id);
      alert(`${product.name} added to wishlist!`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add to wishlist';
      alert(msg);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (isLoading) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="product-loading">
            <div className="loading-spinner"></div>
            <p>Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="product-not-found">
            <h2>Product not found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/shop')} className="btn btn-primary">
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  const productImages = [product.image, product.image, product.image, product.image];

  return (
    <div className="product-page">
      <div className="container">
        <div className="breadcrumb">
          <button onClick={() => navigate('/shop')} className="breadcrumb-link">
            ← Back to Shop
          </button>
        </div>

        <div className="product-detail">
          <div className="product-gallery">
            <div className="main-image">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="product-main-image"
              />
              {!product.inStock && (
                <div className="out-of-stock-overlay">
                  <span>Out of Stock</span>
                </div>
              )}
            </div>
            <div className="thumbnail-gallery">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating">
                <div className="stars">{'★'.repeat(5)}</div>
                <span className="rating-text">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="product-pricing">
              <span className="current-price">${product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="original-price">${product.originalPrice}</span>
                  <span className="discount">Save ${product.originalPrice - product.price}</span>
                </>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-details">
              <h3>Product Details</h3>
              <ul>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Material:</strong> 100% Natural Banana Fiber</li>
                <li><strong>Origin:</strong> Handcrafted in Uganda</li>
                <li><strong>Eco-Friendly:</strong> Biodegradable and Sustainable</li>
                <li><strong>Care Instructions:</strong> Hand wash with mild soap</li>
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleQuantityChange(-1)} 
                    disabled={quantity <= 1} 
                    className="quantity-btn"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)} 
                    disabled={quantity >= 10} 
                    className="quantity-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn btn-primary add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <Link className="btn btn-secondary" to={`/customize/${product.id}`}>
                  Customize
                </Link>
                <button 
                  className="btn btn-secondary"
                  onClick={handleAddToWishlist}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>

            <div className="product-features">
              <div className="feature">
                <span className="feature-icon">
                  <FaTruck />
                </span>
                <div>
                  <h4>Free Shipping</h4>
                  <p>On orders over $50</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">
                  <FaUndo />
                </span>
                <div>
                  <h4>Easy Returns</h4>
                  <p>30-day return policy</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">
                  <FaLeaf />
                </span>
                <div>
                  <h4>Eco-Friendly</h4>
                  <p>100% sustainable materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;