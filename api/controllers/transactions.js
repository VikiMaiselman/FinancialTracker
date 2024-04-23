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
    return res.status(400).send(error);
  }
};

export const createTransaction = async (req, res) => {
  const { name, amount, category, subcategory, date } = req.body;
  try {
    await createNewTransaction(name, amount, category, subcategory, date, req.user._id);
    return res.send("Transaction successfully created.");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Transaction creation was not successful. " + error);
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await deleteTransactionDB(req.user._id, req.body.transactionId);
    return res.send("Transaction successfully deleted.");
  } catch (error) {
    console.error(error);
    return res.status(400).json("Transaction deletion was not successful. " + error);
  }
};

export const updateTransaction = async (req, res) => {
  const updatedFields = req.body;
  try {
    await updateTransactionDB(req.user._id, updatedFields._id, updatedFields);
    return res.send("Transaction successfully updated.");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Transaction update was not successful. " + error);
  }
};
