import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";

// ProtectedRoute to check authentication
export const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return token ? (
    React.createElement(element) // Using React.createElement to render the component
  ) : (
    React.createElement(Navigate, { to: "/login", replace: true, state: { from: location } })
  );
};

// AdminRoute to check if the user is an admin
export const AdminRoute = ({ element }) => {
  const location = useLocation();

  return ApiService.isAdmin() ? (
    React.createElement(element) // Using React.createElement to render the component
  ) : (
    React.createElement(Navigate, { to: "/login", replace: true, state: { from: location } })
  );
};
