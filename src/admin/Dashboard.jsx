import React, { useEffect, useState } from "react";
import api from "../lib/api";

export default function Dashboard(){
  const [summary, setSummary] = useState({ products: 0, orders: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const [products, orders, users] = await Promise.all([
          api.adminListProducts(),
          api.adminListOrders(),
          api.adminListUsers(),
        ]);
        if (!isActive) return;
        setSummary({
          products: (products?.data || products || []).length,
          orders: (orders?.data || orders || []).length,
          users: (users?.data || users || []).length,
        });
      } finally {
        if (isActive) setLoading(false);
      }
    })();
    return () => { isActive = false };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 6 }}>Products: {summary.products}</div>
        <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 6 }}>Orders: {summary.orders}</div>
        <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 6 }}>Users: {summary.users}</div>
      </div>
    </div>
  );
}


