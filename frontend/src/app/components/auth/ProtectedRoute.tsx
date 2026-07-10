import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth, Role } from '../../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('influencer' | 'brand')[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is authenticated but doesn't have the right role
    if (user.role === 'influencer') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/brand" replace />;
    }
  }

  return <>{children}</>;
};
