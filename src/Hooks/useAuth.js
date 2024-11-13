// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext

// Custom hook for authentication
export const useAuth = () => {
  const { currentUser } = useContext(AuthContext); // Get the current user from context
  return {
    isAuthenticated: !!currentUser, // Return true if currentUser exists, false otherwise
    currentUser, // Optionally return the currentUser object
  };
};
