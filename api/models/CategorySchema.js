import mongoose from "mongoose";
import { SubcategorySchema } from "./SubcategorySchema";

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Expenses", "Incomes", "Savings"],
  },
  subcategories: [SubcategorySchema],
  total: Number,
});

export default mongoose.model("Category", CategorySchema);
