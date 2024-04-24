import express from "express";
const router = express.Router();

import { createSubcategory, deleteSubcategory } from "../controllers/subcategories.js";
import { isAuthenticated } from "../controllers/users.js";

const checkIsAuthenticated = (req, res, next) => {
  try {
    isAuthenticated(req, res);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
router.post("/subcat", checkIsAuthenticated, createSubcategory);
router.post("/delete-subcat", checkIsAuthenticated, deleteSubcategory);

export { router as subcategoryRoutes };
