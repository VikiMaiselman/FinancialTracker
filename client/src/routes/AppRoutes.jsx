import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import CircularProgress from "@mui/material/CircularProgress";
import MainLayout from "../components/MainLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import CategoryTransactions from "../pages/CategoryTransactions.jsx";
import Authentication from "../pages/Authentication.jsx";
import Logout from "../pages/Logout.jsx";

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
      {/* <Route
        path="/create-transaction"
        index
        element={
          user.isAuthenticated ? (
            <LayoutMain>
              <TransactionForm />
            </LayoutMain>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/sign-up"
        element={
          <Layout>
            <Auth />
          </Layout>
        }
      /> */}
      {/* <Route
        path="/verification"
        element={
          user.isBeingVerified ? (
            <Layout>
              <Verification />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />*/}
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
  //   );
});
