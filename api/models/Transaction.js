import { Transaction, User } from "../dbs/mongo-db.js";
import { findUserById } from "./User.js";

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
    return user.transactions.find((t) => t._id === transactionId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewTransaction = async (name, amount, categoryName, subcategoryName, date, userId) => {
  try {
    const newTx = new Transaction({
      name: name,
      amount: amount,
      category: categoryName,
      subcategory: subcategoryName,
      date: date || new Date(),
    });
    // make this a single atomic transaction
    await User.findOneAndUpdate({ _id: userId }, { $push: { transactions: newTx } });
    await updateTotalUserBalance(+amount, categoryName, userId, "add");
    await updateCategoryTotal(+amount, categoryName, userId, "add");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTransaction = async (userId, transactionId) => {
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

export const updateTransaction = async (userId, transactionId, updatedFields) => {
  try {
    const transaction = await findTransactionById(userId, transactionId);
    if (!transaction) throw new Error("No such transaction. Nothing to delete");

    await User.findOneAndUpdate(
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

const updateTotalUserBalance = async (amount, categoryName, userId, operation) => {
  if (categoryName === "Expenses" && operation === "add") amount *= -1;
  if (["Savings", "Incomes"].includes(categoryName) && operation === "delete") amount *= -1;

  try {
    await User.findOneAndUpdate({ _id: userId }, { $inc: { balance: amount } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateCategoryTotal = async (amount, categoryName, userId, operation) => {
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
};

// export const updateUserBalance = async (relevantUser, newBalance) => {
//   try {
//     await User.findOneAndUpdate({ username: relevantUser }, { balance: newBalance });
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
