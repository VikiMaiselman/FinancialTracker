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
    const result = isAuthenticated(req, res);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
router.get("/transactions", checkIsAuthenticated, getTransactions);
router.post("/transaction", checkIsAuthenticated, createTransaction);
router.patch("/update-transaction", checkIsAuthenticated, updateTransaction);
router.post("/delete-transaction", checkIsAuthenticated, deleteTransaction);

export { router as transactionRoutes };
