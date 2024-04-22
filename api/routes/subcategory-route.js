import express from "express";
const router = express.Router();

import { createSubcategory, deleteSubcategory } from "../controllers/subcategories.js";
import { isAuthenticated } from "../controllers/users.js";

router.use("/transactions", (req, res, next) => {
  try {
    isAuthenticated(req, res);
    next();
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/subcat");
router.post("/subcat", createSubcategory);
router.post("/delete-subcat", deleteSubcategory);

export { router as subcategoryRoutes };
