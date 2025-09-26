// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">🌿</span>
            <span className="logo-text">Kalungu</span>
          </div>
          <p className="footer-description">Promoting sustainable living through beautiful, handcrafted banana fiber products. Supporting local communities while protecting our planet.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Facebook">
              <FaFacebookF className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Twitter">
              <FaTwitter className="social-icon" />
            </a>
            <a href="mailto:info@kalungu.com" className="social-link" aria-label="Email">
              <FaEnvelope className="social-icon" />
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/our-story">Our Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Categories</h4>
          <ul className="footer-links">
            <li><Link to="/shop?category=baskets">Baskets</Link></li>
            <li><Link to="/shop?category=tableware">Tableware</Link></li>
            <li><Link to="/shop?category=decor">Decor</Link></li>
            <li><Link to="/shop?category=storage">Storage</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <p className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>info@kalungu.com</span>
            </p>
            <p className="contact-item">
              <FaPhone className="contact-icon" />
              <span>+256 700 000 000</span>
            </p>
            <p className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>Kampala, Uganda</span>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2025 Kalungu Banana Fiber. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/shipping">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;