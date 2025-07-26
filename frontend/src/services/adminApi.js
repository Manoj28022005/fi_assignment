import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
const ADMIN_URL = `${BASE_URL}/api/admin`;

// Add authorization header
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMostAddedProducts = async () => {
  try {
    const response = await axios.get(`${ADMIN_URL}/analytics/most-added`);
    return response;
  } catch (error) {
    console.error('Error fetching most added products:', error.response || error);
    throw error;
  }
};

export const getProductHistory = async (productId) => {
  try {
    const response = await axios.get(`${ADMIN_URL}/analytics/product/${productId}/history`);
    return response;
  } catch (error) {
    console.error('Error fetching product history:', error.response || error);
    throw error;
  }
};

export const getProductStats = async () => {
  try {
    const response = await axios.get(`${ADMIN_URL}/analytics/stats`);
    return response;
  } catch (error) {
    console.error('Error fetching product stats:', error.response || error);
    throw error;
  }
};

export const checkAdminStatus = async () => {
  try {
    console.log('Making admin check request to:', `${BASE_URL}/check-admin`);
    console.log('Token:', localStorage.getItem('authToken'));
    const response = await axios.get(`${BASE_URL}/check-admin`);
    console.log('Admin check response:', response.data);
    return response.data.isAdmin;
  } catch (error) {
    console.error('Error checking admin status:', error.response || error);
    return false;
  }
};
