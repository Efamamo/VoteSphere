import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';
import axiosInstance from '../api/axiosInstance';

// Define the type for the props, which includes `children`
interface PrivateRouteProps {
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
    const response = await axiosInstance.get('auth/refresh-token', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
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
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
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

  if (auth) {
    return <>{children}</>;
  } else {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('groupID');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
