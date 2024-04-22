import express from "express";
const router = express.Router();

import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactions.js";
import { isAuthenticated } from "../controllers/users.js";

router.use("/transactions", (req, res, next) => {
  try {
    isAuthenticated(req, res);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/transactions", getTransactions);
router.post("/transaction", createTransaction);
router.patch("/update-transaction", updateTransaction);
router.post("/delete-transaction", deleteTransaction);

export { router as transactionRoutes };
