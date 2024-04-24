import { db } from "../dbs/mongo-db.js";
import Transaction from "./TransactionSchema.js";
import User from "./UserSchema.js";
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
    return user.transactions.find((t) => t._id.toString() === transactionId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewTransaction = async (name, amount, category, subcategory, date, userId) => {
  const newTx = new Transaction({
    name: name,
    amount: amount,
    category: category,
    subcategory: subcategory,
    date: date || new Date(),
  });

  // make this a single atomic transaction
  const session = await db.startSession();
  try {
    await session.withTransaction(async () => {
      await User.findOneAndUpdate({ _id: userId }, { $push: { transactions: newTx } }, { session });
      await updateTotalUserBalance(+amount, category, userId, "add", session);
      await updateCategoryTotal(+amount, category, userId, "add", session);
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await session.endSession();
  }
};

export const deleteTransactionDB = async (userId, transactionId) => {
  let session;
  try {
    const transaction = await findTransactionById(userId, transactionId);
    if (!transaction) throw new Error("No such transaction. Nothing to delete");
    const amount = +transaction.amount;

    session = await db.startSession();
    await session.withTransaction(async () => {
      await User.findOneAndUpdate({ _id: userId }, { $pull: { transactions: { _id: transactionId } } }, { session });
      await updateTotalUserBalance(+amount, transaction.category, userId, "delete", session);
      await updateCategoryTotal(+amount, transaction.category, userId, "delete", session);
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await session.endSession();
  }
};

export const updateTransactionDB = async (userId, transactionId, updatedFields) => {
  let session;
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

      session = await db.startSession();
      await session.withTransaction(async () => {
        await updateTotalUserBalance(+delta, transaction.category, userId, "add", session);
        await updateCategoryTotal(+delta, transaction, userId, "add", session);
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await session.endSession();
  }
};

async function updateTotalUserBalance(amount, categoryName, userId, operation, session) {
  if (categoryName === "Expenses" && operation === "add") amount *= -1;
  if (["Savings", "Incomes"].includes(categoryName) && operation === "delete") amount *= -1;

  try {
    await User.findOneAndUpdate({ _id: userId }, { $inc: { balance: amount } }, { session });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCategoryTotal(amount, categoryName, userId, operation, session) {
  if (operation === "delete") amount *= -1;

  try {
    await User.findOneAndUpdate(
      { _id: userId, "categories.name": categoryName },
      { $inc: { "categories.$.total": amount } },
      { session }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
