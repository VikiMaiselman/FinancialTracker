import passport from "passport";
import { User } from "../dbs/mongo-db.js";
import { createDefaultCategoriesForUser } from "./Category.js";

export const registerUser = (req, res, username, phone, password, verification, useTwilio) => {
  User.register(
    { username: username, phone: phone, balance: 0, transactions: [], categories: createDefaultCategoriesForUser() },
    password,
    async function (err, user) {
      if (err) {
        console.error(err);
        return res.status(401).send(err);
      }

      if (useTwilio) return res.send(verification.status);

      passport.authenticate("local")(req, res, function () {
        console.log("sending approved");
        return res.send("approved");
      });
    }
  );
};

export const authenticateUser = async (username, password) => {
  try {
    return await User.authenticate()(username, password);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authAndStoreSession = (req, res, verificationCheck) => {
  passport.authenticate("local")(req, res, function () {
    res.send(verificationCheck.status);
  });
};

export const findUserById = async (userId) => {
  try {
    return await User.find({ _id: userId });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
