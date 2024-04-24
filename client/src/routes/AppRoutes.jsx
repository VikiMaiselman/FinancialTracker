import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import MainLayout from "../components/MainLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import CategoryTransactions from "../pages/CategoryTransactions.jsx";
import Authentication from "../pages/Authentication.jsx";
import Logout from "../pages/Logout.jsx";
import Verification from "../pages/Verification.jsx";

// import Logout from "../pages/Logout.jsx";

export default React.memo(function AppRoutes() {
  const user = useSelector((state) => state.user);

  if (user.isAuthenticated === null) {
    return (
      <MainLayout>
        <h4>Loading</h4>
      </MainLayout>
    );
  }
  return (
    <Routes>
      <Route
        path="/"
        index
        element={
          user.isAuthenticated ? (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        path="/expenses"
        index
        element={
          user.isAuthenticated ? (
            <MainLayout>
              <CategoryTransactions categoryName="Expenses" />
            </MainLayout>
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        path="/incomes"
        index
        element={
          user.isAuthenticated ? (
            <MainLayout>
              <CategoryTransactions categoryName="Incomes" />
            </MainLayout>
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route
        path="/savings"
        index
        element={
          user.isAuthenticated ? (
            <MainLayout>
              <CategoryTransactions categoryName="Savings" />
            </MainLayout>
          ) : (
            <Navigate to="/signup" />
          )
        }
      />
      <Route path="/signup" index element={<Authentication />} />
      <Route path="/verification" element={user.isBeingVerified ? <Verification /> : <Navigate to="/" />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
  //   );
});
