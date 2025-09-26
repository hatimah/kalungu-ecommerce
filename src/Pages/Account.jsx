import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Set up Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Laravel backend URL
  withCredentials: true,           // important for Sanctum cookies
});

// ✅ Helper to get CSRF cookie (required for POST/PUT/DELETE)
const getCsrf = async () => {
  await api.get("/sanctum/csrf-cookie");
};

export default function Account() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        // ✅ GET profile from backend
        const res = await api.get("/api/user/profile");
        if (!isActive) return;
        setProfile(res.data?.data || res.data);
      } catch (e) {
        if (isActive) setError("Please log in to view your profile");
      } finally {
        if (isActive) setLoading(false);
      }
    })();

    return () => { isActive = false; };
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return (
    <div>
      <h1>My Account</h1>
      <p>{error}</p>
    </div>
  );

  return (
    <div>
      <h1>My Account</h1>
      {profile && (
        <div style={{ marginTop: 12 }}>
          <div><strong>Name:</strong> {profile.name}</div>
          <div><strong>Email:</strong> {profile.email}</div>
        </div>
      )}
    </div>
  );
}
