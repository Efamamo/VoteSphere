import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';
import axiosInstance from '../api/axiosInstance';

// Define the type for the props, which includes `children`
interface PublicRouteProp {
  children: ReactNode;
}

// Mock token expiration checker (replace with real logic)
const isTokenExpired = (token: string): boolean => {
  const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
  const expiration = payload.exp * 1000; // `exp` is in seconds
  return Date.now() > expiration;
};

// Function to refresh tokens using axios
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await axiosInstance.post('/auth/refresh-token', {
      refreshToken,
    });

    if (response.status === 200) {
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      return accessToken;
    }

    return null;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
};

// Authentication function using both accessToken and refreshToken
const isAuthenticated = async (): Promise<boolean> => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return false;
  }

  if (isTokenExpired(accessToken)) {
    const newAccessToken = await refreshAccessToken();
    if (!newAccessToken) {
      return false; // Failed to refresh token, not authenticated
    }
  }

  return true;
};

// PrivateRoute component
const PublicRoute: React.FC<PublicRouteProp> = ({ children }) => {
  const [auth, setAuth] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticatedUser = await isAuthenticated();
      setAuth(isAuthenticatedUser);
    };

    checkAuth();
  }, []);

  if (auth === null) {
    // Optionally render a loading spinner while authentication is being checked
    return <div>Loading...</div>;
  }

  if (!auth) {
    return <>{children}</>;
  } else {
    return <Navigate to="/dashboard" />;
  }
};

export default PublicRoute;
