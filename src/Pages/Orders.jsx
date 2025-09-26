import React, { useEffect, useState } from "react";
import api from "../lib/api";

export default function Orders(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const data = await api.listOrders();
        if (!isActive) return;
        setOrders(Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []));
      } catch (e) {
        if (isActive) setError('Please log in to view your orders');
      } finally {
        if (isActive) setLoading(false);
      }
    })();
    return () => { isActive = false };
  }, []);

  if (loading) {
    return (
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
        <h1>Orders</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
        <h1>Orders</h1>
        <p>You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
      <h1>Orders</h1>
      <div>
        {orders.map(order => (
          <div key={order.id} style={{ border: '1px solid #eee', borderRadius: 6, padding: 12, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>Order #{order.id}</strong>
                <div>Status: {order.status}</div>
              </div>
              <div>Total: ${Number(order.total_amount ?? order.total ?? 0).toFixed(2)}</div>
            </div>
            {Array.isArray(order.items) && order.items.length > 0 && (
              <ul style={{ marginTop: 8 }}>
                {order.items.map(item => (
                  <li key={item.id}>
                    {(item.product?.name) || `Product #${item.product_id}`} x {item.quantity}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


