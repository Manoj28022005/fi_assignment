import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkAdminStatus } from '../services/adminApi';

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const status = await checkAdminStatus();
        setIsAdmin(status);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;
