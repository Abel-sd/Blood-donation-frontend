// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Custom hook to check authentication status

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Assuming you have a custom hook for auth

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
