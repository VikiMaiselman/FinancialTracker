import express from "express";
import { signUp, verify, logOut, getAuthenticationStatus, getBalance, isAuthenticated } from "../controllers/users.js";

const router = express.Router();

const checkIsAuthenticated = (req, res, next) => {
  try {
    isAuthenticated(req, res);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

router.post("/sign-up", signUp);
router.post("/verification", verify);
router.get("/logout", logOut);

router.get("/auth-status", getAuthenticationStatus);
router.get("/balance", checkIsAuthenticated, getBalance);
router.get("/balance", checkIsAuthenticated, getCategories);

export { router as verificationRoutes };
