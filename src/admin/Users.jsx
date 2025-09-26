import React, { useEffect, useState } from "react";
import api from "../lib/api";

export default function AdminUsers(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const data = await api.adminListUsers();
        if (!isActive) return;
        setList(Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []));
      } catch (e) {
        if (isActive) setError('Failed to load users');
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
      <h1>Users</h1>
      <table style={{ width: '100%', marginTop: 12 }}>
        <thead>
          <tr>
            <th align="left">ID</th>
            <th align="left">Name</th>
            <th align="left">Email</th>
            <th align="left">Role</th>
          </tr>
        </thead>
        <tbody>
          {list.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role || (u.is_admin ? 'admin' : 'user')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


