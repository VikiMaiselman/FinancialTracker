import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import CircularProgress from "@mui/material/CircularProgress";
import MainLayout from "../components/MainLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import CategoryTransactions from "../pages/CategoryTransactions.jsx";
// import Logout from "../pages/Logout.jsx";

export default React.memo(function AppRoutes() {
  const user = useSelector((state) => state.user);

  return (
    //   user.isAuthenticated === null ? (
    //     <MainLayout>
    //       <h4>Loading</h4>
    //       {/* <CircularProgress /> */}
    //     </MainLayout>
    //   ) : (
    <Routes>
      {/* <Route path="/" index element={user.isAuthenticated ? <MainLayout></MainLayout> : <Navigate to="/sign-up" />} /> */}
      <Route
        path="/"
        index
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/incomes"
        index
        element={
          <MainLayout>
            <CategoryTransactions type="Incomes" />
          </MainLayout>
        }
      />
      <Route
        path="/savings"
        index
        element={
          <MainLayout>
            <CategoryTransactions type="Savings" />
          </MainLayout>
        }
      />
      <Route
        path="/expenses"
        index
        element={
          <MainLayout>
            <CategoryTransactions type="Expenses" />
          </MainLayout>
        }
      />
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
      />
      <Route
        path="/logout"
        element={
          <Layout>
            <Logout />
          </Layout>
        }
      /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
  //   );
});
