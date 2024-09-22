import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';

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

// Mock function to refresh tokens (replace this with your actual refresh logic)
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await fetch('/api/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      const newAccessToken = data.accessToken;
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
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

  return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
