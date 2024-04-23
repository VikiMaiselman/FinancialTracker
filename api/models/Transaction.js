import Transaction from "./TransactionSchema.js";
import User from "./UserSchema.js";
import { findUserById } from "./User.js";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

// export const getTransactionsFromMongoDB = async (relevantUser) => {
//   try {
//     const txs = await Transaction.find({ $or: [{ to: relevantUser }, { from: relevantUser }] })
//       .populate("to")
//       .populate("from");
//     return txs;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const findUserbyUsername = async (relevantUser) => {
//   try {
//     const user = await User.findOne({ username: relevantUser });
//     return user;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const getAllUserTransactions = async (userId) => {
  try {
    const user = await findUserById(userId);
    return user.transactions;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findTransactionById = async (userId, transactionId) => {
  try {
    const user = await findUserById(userId);
    return user.transactions.find((t) => t._id.toString() === transactionId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewTransaction = async (name, amount, category, subcategory, date, userId) => {
  try {
    const newTx = new Transaction({
      name: name,
      amount: amount,
      category: category,
      subcategory: subcategory,
      date: date || new Date(),
    });
    // make this a single atomic transaction
    await User.findOneAndUpdate({ _id: userId }, { $push: { transactions: newTx } });
    await updateTotalUserBalance(+amount, category, userId, "add");
    await updateCategoryTotal(+amount, category, userId, "add");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTransactionDB = async (userId, transactionId) => {
  try {
    const transaction = await findTransactionById(userId, transactionId);
    if (!transaction) throw new Error("No such transaction. Nothing to delete");

    const amount = +transaction.amount;
    // should be atomic
    await User.findOneAndUpdate({ _id: userId }, { $pull: { transactions: { _id: transactionId } } });
    await updateTotalUserBalance(+amount, transaction.category, userId, "delete");
    await updateCategoryTotal(+amount, transaction.category, userId, "delete");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTransactionDB = async (userId, transactionId, updatedFields) => {
  try {
    const transaction = await findTransactionById(userId, transactionId);
    if (!transaction) throw new Error("No such transaction. Nothing to delete");

    const result = await User.findOneAndUpdate(
      { _id: userId, "transactions._id": transactionId },
      {
        $set: {
          "transactions.$": updatedFields,
        },
      }
    );

    if (updatedFields.amount) {
      const prevAmount = transaction.amount;
      const newAmount = updatedFields.amount;
      const delta = +newAmount - +prevAmount;
      await updateTotalUserBalance(+delta, transaction.category, userId, "add");
      await updateCategoryTotal(+delta, transaction, userId, "add");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function updateTotalUserBalance(amount, categoryName, userId, operation) {
  if (categoryName === "Expenses" && operation === "add") amount *= -1;
  if (["Savings", "Incomes"].includes(categoryName) && operation === "delete") amount *= -1;

  try {
    await User.findOneAndUpdate({ _id: userId }, { $inc: { balance: amount } });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCategoryTotal(amount, categoryName, userId, operation) {
  if (operation === "delete") amount *= -1;

  try {
    await User.findOneAndUpdate(
      { _id: userId, "categories.name": categoryName },
      { $inc: { "categories.$.total": amount } }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
