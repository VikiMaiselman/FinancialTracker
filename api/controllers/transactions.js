import {
  createNewTransaction,
  getAllUserTransactions,
  deleteTransactionDB,
  updateTransactionDB,
} from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const txs = await getAllUserTransactions(req.user._id);
    return res.json(txs);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Could not fetch the transactoins." });
  }
};

export const createTransaction = async (req, res) => {
  const { name, amount, category, subcategory, date } = req.body;
  try {
    await createNewTransaction(name, amount, category, subcategory, date, req.user._id);
    return res.send("Transaction successfully created.");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Transaction creation was not successful." });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await deleteTransactionDB(req.user._id, req.body.transactionId);
    return res.send("Transaction successfully deleted.");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Transaction deletion was not successful." });
  }
};

export const updateTransaction = async (req, res) => {
  const updatedFields = req.body;
  try {
    await updateTransactionDB(req.user._id, updatedFields._id, updatedFields);
    return res.send("Transaction successfully updated.");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Transaction update was not successful." });
  }
};
