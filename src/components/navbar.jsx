import { Link } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0); // This will be connected to cart state later

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">Kalungu</span>
          </Link>
        </div>
        
        <div className={`navbar-center ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/our-story" className="nav-link">Our Story</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/wishlist" className="nav-link">Wishlist</Link>
          <Link to="/orders" className="nav-link">Orders</Link>
        </div>
        
        <div className="navbar-right">
          <Link to="/login" className="nav-link auth-link">Login</Link>
          <Link to="/account" className="nav-link">Account</Link>
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
