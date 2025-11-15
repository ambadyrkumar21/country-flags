// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  return accessToken ? <Navigate to="/home" replace /> : children;
};

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  return accessToken ? children : <Navigate to="/home" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};