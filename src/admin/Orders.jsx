import React, { useEffect, useState } from "react";
import api from "../lib/api";

export default function AdminOrders(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const data = await api.adminListOrders();
        if (!isActive) return;
        setList(Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []));
      } catch (e) {
        if (isActive) setError('Failed to load orders');
      } finally {
        if (isActive) setLoading(false);
      }
    })();
    return () => { isActive = false };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Orders</h1>
      <table style={{ width: '100%', marginTop: 12 }}>
        <thead>
          <tr>
            <th align="left">ID</th>
            <th align="left">User</th>
            <th align="left">Status</th>
            <th align="left">Total</th>
          </tr>
        </thead>
        <tbody>
          {list.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.user?.email || o.user_id}</td>
              <td>{o.status}</td>
              <td>${Number(o.total_amount ?? o.total ?? 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


