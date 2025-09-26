// src/pages/Shop.jsx
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import api from "../lib/api";
import "./shop.css";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await api.listProducts();
        if (!isActive) return;
        setProducts(Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []));
      } catch (err) {
        if (!isActive) return;
        setError('Failed to load products');
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadProducts();
    return () => { isActive = false; };
  }, []);

  // Unique categories
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min)) filtered = filtered.filter(p => p.price >= min);
    if (!isNaN(max)) filtered = filtered.filter(p => p.price <= max);

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, selectedCategory, sortBy, searchTerm, minPrice, maxPrice]);

  const handleAddToCart = async (product) => {
    try {
      await api.addToCart({ product_id: product.id, quantity: 1 });
      alert(`${product.name} added to cart!`);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add to cart';
      alert(msg);
    }
  };

  if (loading) {
    return <div className="container" style={{ paddingTop: '2rem' }}>Loading products...</div>;
  }

  if (error) {
    return <div className="container" style={{ paddingTop: '2rem', color: 'red' }}>{error}</div>;
  }

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <h1>Our Products</h1>
          <p>Discover our collection of handcrafted banana fiber products</p>
        </div>

        <div className="shop-toolbar">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="shop-layout">
          <aside className={`shop-sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-section">
              <h3>Categories</h3>
              <ul className="sidebar-list">
                {categories.map(category => (
                  <li key={category}>
                    <button
                      className={`sidebar-link ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === 'all' ? 'All' : category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-section">
              <h3>Price</h3>
              <div className="price-inputs">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="price-input"
                />
                <span className="price-sep">-</span>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="price-input"
                />
              </div>
              <button className="btn btn-secondary sidebar-apply" onClick={() => setSidebarOpen(false)}>Apply</button>
            </div>

            <div className="sidebar-section">
              <h3>Sort by</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </aside>

          <div className="shop-content">
            <div className="products-count">
              <p>Showing {filteredProducts.length} products</p>
            </div>

            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-container">
                      <Link to={`/shop/${product.id}`}>
                        <img src={product.image} alt={product.name} className="product-image" />
                      </Link>
                      {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
                      <div className="product-overlay">
                        <Link to={`/shop/${product.id}`} className="btn-details">View Details</Link>
                        <button 
                          className="btn-cart"
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="product-info">
                      <Link to={`/shop/${product.id}`} className="product-name">{product.name}</Link>
                      <div className="product-category">{product.category}</div>
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
                ))
              ) : (
                <div className="no-products">
                  <h3>No products found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
