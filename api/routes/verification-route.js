import express from "express";
import {
  signUp,
  verify,
  logOut,
  getAuthenticationStatus,
  getBalance,
  isAuthenticated,
  getCategories,
} from "../controllers/users.js";

const router = express.Router();

const checkIsAuthenticated = (req, res, next) => {
  try {
    isAuthenticated(req, res);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

router.post("/sign-up", signUp);
router.post("/verification", verify);
router.get("/logout", logOut);

router.get("/auth-status", getAuthenticationStatus);
router.get("/balance", checkIsAuthenticated, getBalance);
router.get("/categories", checkIsAuthenticated, getCategories);

export { router as verificationRoutes };
