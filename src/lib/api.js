import axios from "axios";

// ✅ Base URL of your Laravel backend
const API_BASE = "http://127.0.0.1:8000"; // Laravel runs on php artisan serve

// ✅ Create Axios instance
const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Important for Sanctum cookies
});

// ✅ Helper to fetch CSRF cookie before POST requests
async function getCsrfCookie() {
  await apiClient.get("/sanctum/csrf-cookie");
}

export const api = {
  // Public
  listProducts: (params) => apiClient.get(`/api/products`, { params }),
  getProduct: (id) => apiClient.get(`/api/products/${id}`),
  searchProducts: (q) => apiClient.get(`/api/products/search`, { params: { q } }),
  productReviews: (productId) => apiClient.get(`/api/products/${productId}/reviews`),

  // Auth
  async login(email, password) {
    await getCsrfCookie();
    return apiClient.post("/login", { email, password });
  },
  async register(name, email, password, password_confirmation) {
    await getCsrfCookie();
    return apiClient.post("/register", {
      name,
      email,
      password,
      password_confirmation,
    });
  },
  logout: () => apiClient.post("/logout"),
  profile: () => apiClient.get("/api/user/profile"),

  // Cart
  getCart: () => apiClient.get("/api/cart"),
  addToCart: (payload) => apiClient.post("/api/cart/add", payload),
  updateCartItem: (id, payload) => apiClient.put(`/api/cart/${id}`, payload),
  removeCartItem: (id) => apiClient.delete(`/api/cart/${id}`),

  // Wishlist
  getWishlist: () => apiClient.get("/api/wishlist"),
  addWishlist: (productId) => apiClient.post(`/api/wishlist/add/${productId}`),
  removeWishlist: (productId) => apiClient.delete(`/api/wishlist/remove/${productId}`),
  checkWishlist: (productId) => apiClient.get(`/api/wishlist/check/${productId}`),

  // Orders
  listOrders: () => apiClient.get("/api/orders"),
  createOrder: (payload) => apiClient.post("/api/orders", payload),
  getOrder: (id) => apiClient.get(`/api/orders/${id}`),
  cancelOrder: (id) => apiClient.post(`/api/orders/${id}/cancel`),
  trackOrder: (id) => apiClient.get(`/api/orders/${id}/track`),

  // Admin
  adminListProducts: () => apiClient.get("/api/admin/products"),
  adminGetProduct: (id) => apiClient.get(`/api/admin/products/${id}`),
  adminCreateProduct: (payload) => apiClient.post("/api/admin/products", payload),
  adminUpdateProduct: (id, payload) => apiClient.put(`/api/admin/products/${id}`, payload),
  adminDeleteProduct: (id) => apiClient.delete(`/api/admin/products/${id}`),

  adminListOrders: () => apiClient.get("/api/admin/orders"),
  adminGetOrder: (id) => apiClient.get(`/api/admin/orders/${id}`),
  adminUpdateOrderStatus: (id, status) =>
    apiClient.post(`/api/admin/orders/${id}/update-status`, { status }),

  adminListUsers: () => apiClient.get("/api/admin/users"),
  adminGetUser: (id) => apiClient.get(`/api/admin/users/${id}`),
  adminUpdateUser: (id, payload) => apiClient.put(`/api/admin/users/${id}`, payload),
  adminDeleteUser: (id) => apiClient.delete(`/api/admin/users/${id}`),
};

export default api;
