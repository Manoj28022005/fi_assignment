import axios from 'axios';

// Create an axios instance with a base URL for the backend
const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Base URL without /api prefix
});

// Use an interceptor to add the JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API calls (now at root level)
export const loginUser = (credentials) => apiClient.post('/login', credentials);
export const registerUser = (userData) => apiClient.post('/register', userData);
export const checkAdminStatus = () => apiClient.get('/check-admin');

// Product API calls (under /api prefix)
export const getProducts = (page = 1, limit = 10) => apiClient.get(`/api/products?page=${page}&limit=${limit}`);
export const addProduct = (productData) => apiClient.post('/api/products', productData);
export const updateProductQuantity = (id, quantity) => apiClient.put(`/api/products/${id}/quantity`, { quantity });

// Admin Analytics API calls (under /api prefix)
export const getMostAddedProducts = () => apiClient.get('/api/admin/analytics/most-added');
export const getProductHistory = (productId) => apiClient.get(`/api/admin/analytics/product/${productId}/history`);
export const getProductStats = () => apiClient.get('/api/admin/analytics/stats');

export default apiClient;