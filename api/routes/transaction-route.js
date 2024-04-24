import express from "express";
const router = express.Router();

import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactions.js";
import { isAuthenticated } from "../controllers/users.js";

const checkIsAuthenticated = (req, res, next) => {
  try {
    isAuthenticated(req, res);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
router.get("/transactions", checkIsAuthenticated, getTransactions);
router.post("/transaction", checkIsAuthenticated, createTransaction);
router.patch("/update-transaction", checkIsAuthenticated, updateTransaction);
router.post("/delete-transaction", checkIsAuthenticated, deleteTransaction);

export { router as transactionRoutes };
