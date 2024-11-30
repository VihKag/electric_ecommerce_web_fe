import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { authJwtAsync, logout } from "../redux/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      try {
        // Check token expiration
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Token expired, logout user
          dispatch(logout());
        } else {
          // Validate token with backend
          dispatch(authJwtAsync(token));
        }
      } catch (error) {
        // Invalid token
        dispatch(logout());
      }
    }
  }, [token, dispatch]);

  // If authenticated, render child routes
  // If not authenticated, redirect to login
  return token && isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
