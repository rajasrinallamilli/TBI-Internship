import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import About from "./pages/About";
import Availability from "./pages/Availability";
import Booking from "./pages/Booking";
import ComponentDemo from "./pages/ComponentDemo";

// Week 6 Authentication Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import OAuthSuccess from "./pages/OAuthSuccess";

// Week 6 Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>

    {/* Toast notifications */}
    <Toaster position="top-right" />

    <Routes>

      {/* ========================= */}
      {/* PUBLIC ROUTES */}
      {/* ========================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/availability"
        element={<Availability />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/components"
        element={<ComponentDemo />}
      />
<Route
  path="/oauth-success"
  element={<OAuthSuccess />}
/>

      {/* ========================= */}
      {/* PROTECTED ROUTES */}
      {/* ========================= */}

      {/* Protected Route 1 */}
      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />

      {/* Protected Route 2 */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

    </Routes>

  </BrowserRouter>
);