import mongoose from "mongoose";

import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

let Transaction, User, Subcategory, Category, db;

/* ************ C O N F I G U R E   D A T A B A S E ************ */
async function initDb() {
  try {
    db = await mongoose.connect(process.env.DB_ATLAS_URL);
    // db = await mongoose.connect("mongodb://localhost:27017/FinTrack");
  } catch (error) {
    console.error("Connection with database could not be established", error);
  }

  /* create mongodb schemas */
  // const SubcategorySchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   color: {
  //     type: String,
  //     required: true,
  //   },
  // });

  // const CategorySchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     enum: ["Expenses", "Incomes", "Savings"],
  //   },
  //   subtypes: [SubcategorySchema],
  //   total: Number,
  // });

  // const TransactionSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   amount: {
  //     type: Number,
  //     required: true,
  //   },
  //   category: {
  //     type: String,
  //     required: true,
  //   },
  //   subcategory: {
  //     // type: mongoose.Schema.Types.ObjectId,
  //     // ref: "Subcategory",
  //     type: String,
  //     required: true,
  //   },
  //   date: {
  //     type: Date,
  //     required: true,
  //   },
  // });

  // const UserSchema = new mongoose.Schema({
  //   username: String,
  //   password: String,
  //   phone: String,
  //   balance: Number,
  //   transactions: [TransactionSchema],
  //   categories: [CategorySchema],
  // });

  /* create mongodb models */
  // Subcategory = mongoose.model("Subcategory", SubcategorySchema);
  // Category = mongoose.model("Category", CategorySchema);
  // Transaction = mongoose.model("Transaction", TransactionSchema);

  // UserSchema.plugin(passportLocalMongoose);
  // User = mongoose.model("User", UserSchema);
  // passport.use(User.createStrategy()); // creates local login strategy
  // passport.serializeUser(User.serializeUser()); // creates session cookie
  // passport.deserializeUser(User.deserializeUser()); // cracks session cookie to obtain info
}

export { initDb, db };
