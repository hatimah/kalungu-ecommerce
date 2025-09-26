import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import "./navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(3); // This will be connected to cart state later

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-icon">🌿</span>
            <span className="logo-text">Kalungu</span>
          </Link>
        </div>
        
        <div className={`navbar-center ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/shop" className="nav-link" onClick={closeMenu}>Shop</Link>
          <Link to="/our-story" className="nav-link" onClick={closeMenu}>Our Story</Link>
          <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
          <Link to="/wishlist" className="nav-link" onClick={closeMenu}>Wishlist</Link>
          <Link to="/orders" className="nav-link" onClick={closeMenu}>Orders</Link>
        </div>
        
        <div className="navbar-right">
          <Link to="/login" className="nav-link auth-link" onClick={closeMenu}>Login</Link>
          <Link to="/account" className="nav-link account-link" onClick={closeMenu}>
            <FaUser className="account-icon" />
            <span className="account-text">Account</span>
          </Link>
          <Link to="/cart" className="cart-link" onClick={closeMenu}>
            <FaShoppingCart className="cart-icon" />
            <span className="cart-text">Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button 
            className="menu-toggle" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
}