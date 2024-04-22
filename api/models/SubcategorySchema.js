import mongoose from "mongoose";

export const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Subcategory", SubcategorySchema);
