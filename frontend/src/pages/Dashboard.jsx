import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';
import { checkAdminStatus } from '../services/adminApi';
import { useAuth } from '../context/AuthContext';
import ProductList from '../components/ProductList';
import AddProductModal from '../components/AddProductModal';
import UpdateQuantityModal from '../components/UpdateQuantityModal';
import { Button, Box } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Dashboard = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await fetchProducts();
        // Check if user is admin
        try {
          console.log('Checking admin status with token:', token);
          const isAdminUser = await checkAdminStatus();
          console.log('Admin status result:', isAdminUser);
          setIsAdmin(isAdminUser);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      }
    };
    
    fetchData();
  }, [fetchProducts, token]);

  const handleOpenUpdateModal = (product) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
  };

  return (
    <div className="container p-4 mx-auto md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Inventory Dashboard</h1>
        <div className="flex gap-4">
          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center px-4 py-2 font-semibold text-white bg-purple-600 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <AdminPanelSettingsIcon className="mr-2" />
              Admin Dashboard
            </button>
          )}
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add New Product
          </button>
        </div>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <ProductList products={products} onUpdateQuantity={handleOpenUpdateModal} />
      )}

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onProductAdded={fetchProducts}
      />

      {selectedProduct && (
        <UpdateQuantityModal
          isOpen={isUpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          product={selectedProduct}
          onQuantityUpdated={fetchProducts} 
        />
      )}
    </div>
  );
};

export default Dashboard;
