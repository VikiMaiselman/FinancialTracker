import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import { CategorySchema } from "./CategorySchema";
import { TransactionSchema } from "./TransactionSchema";

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  phone: String,
  balance: Number,
  transactions: [TransactionSchema],
  categories: [CategorySchema],
});

UserSchema.plugin(passportLocalMongoose);
User = mongoose.model("User", UserSchema);
passport.use(User.createStrategy()); // creates local login strategy
passport.serializeUser(User.serializeUser()); // creates session cookie
passport.deserializeUser(User.deserializeUser()); // cracks session cookie to obtain info

export default User;
