import mongoose from "mongoose";

export const TransactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Subcategory",
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Transaction", TransactionSchema);
