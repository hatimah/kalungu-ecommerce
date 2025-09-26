import React, { useEffect, useState } from "react";
import api from "../lib/api";

export default function Products(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const data = await api.adminListProducts();
        if (!isActive) return;
        setList(Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []));
      } catch (e) {
        if (isActive) setError('Failed to load products');
      } finally {
        if (isActive) setLoading(false);
      }
    })();
    return () => { isActive = false };
  }, []);

  const remove = async (id) => {
    try {
      await api.adminDeleteProduct(id);
      setList(items => items.filter(p => p.id !== id));
    } catch {}
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <table style={{ width: '100%', marginTop: 12 }}>
        <thead>
          <tr>
            <th align="left">ID</th>
            <th align="left">Name</th>
            <th align="left">Price</th>
            <th align="left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${Number(p.price ?? 0).toFixed(2)}</td>
              <td>
                <button onClick={() => remove(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


