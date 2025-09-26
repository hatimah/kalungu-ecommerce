import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../lib/api";

export default function RequireAdmin({ children }){
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    let isActive = true;
    (async () => {
      try {
        const profile = await api.profile();
        const user = profile?.data || profile;
        if (!isActive) return;
        setAllowed(Boolean(user?.is_admin || user?.role === 'admin' || user?.role === 'super_admin'));
      } catch {
        if (isActive) setAllowed(false);
      }
    })();
    return () => { isActive = false };
  }, []);

  if (allowed === null) return <div style={{ padding: 16 }}>Checking access...</div>;
  if (!allowed) return <Navigate to="/login" replace />;
  return children;
}


