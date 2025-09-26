import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./cart.css";

// ✅ Set your Laravel backend URL
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Laravel backend
  withCredentials: true,           // Important for Sanctum cookies
});

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Get CSRF cookie before any write operation
  const getCsrf = async () => {
    await api.get("/sanctum/csrf-cookie");
  };

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        const res = await api.get("/api/cart");
        const data = res.data;
        const items = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
        if (isActive) setCartItems(items);
      } catch (e) {
        if (isActive) setError("Failed to load cart");
      } finally {
        if (isActive) setLoading(false);
      }
    })();

    return () => { isActive = false; };
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) return removeItem(itemId);
    try {
      await getCsrf();
      await api.put(`/api/cart/${itemId}`, { quantity: newQuantity });
      setCartItems(items => items.map(it => it.id === itemId ? { ...it, quantity: newQuantity } : it));
    } catch {}
  };

  const removeItem = async (itemId) => {
    try {
      await getCsrf();
      await api.delete(`/api/cart/${itemId}`);
      setCartItems(items => items.filter(it => it.id !== itemId));
    } catch {}
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price ?? item.price ?? 0;
      const quantity = item.quantity ?? 1;
      return total + price * quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity ?? 1), 0);
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;
  if (cartItems.length === 0) return (
    <div className="empty-cart">
      <h1>Your Cart is Empty</h1>
      <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        <p>{getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in your cart</p>

        <div className="cart-items">
          {cartItems.map(item => {
            const product = item.product || {};
            return (
              <div key={item.id} className="cart-item">
                <img src={product.image || product.image_url || ''} alt={product.name || ''} />
                <h3>{product.name || `Product #${item.product_id}`}</h3>
                <p>{product.category?.name || product.category || ''}</p>
                <span>${(product.price ?? item.price ?? 0).toFixed(2)}</span>

                <div>
                  <button onClick={() => updateQuantity(item.id, (item.quantity ?? 1) - 1)}>-</button>
                  <span>{item.quantity ?? 1}</span>
                  <button onClick={() => updateQuantity(item.id, (item.quantity ?? 1) + 1)}>+</button>
                </div>

                <span>${(((product.price ?? item.price ?? 0) * (item.quantity ?? 1))).toFixed(2)}</span>
                <button onClick={() => removeItem(item.id)}>✕</button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p>Subtotal ({getTotalItems()} items): ${getTotalPrice().toFixed(2)}</p>
          <p>Shipping: {getTotalPrice() >= 50 ? 'Free' : '$9.99'}</p>
          <p>Tax: ${(getTotalPrice() * 0.08).toFixed(2)}</p>
          <p>Total: ${(getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 9.99) + (getTotalPrice() * 0.08)).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
