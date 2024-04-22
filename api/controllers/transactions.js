import { createNewTransaction, getAllUserTransactions } from "../models/Transaction.js";

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
  const { name, amount, categoryName, subcategoryName, date } = req.body;
  try {
    await createNewTransaction(name, amount, categoryName, subcategoryName, date, req.user._id);
    return res.send("Transaction successfully created.");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Transaction creation was not successful. " + error);
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await deleteTransaction(req.user._id, req.body.transactionId);
    return res.send("Transaction successfully deleted.");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Transaction deletion was not successful. " + error);
  }
};

export const updateTransaction = async (req, res) => {
  const updatedFields = req.body;
  try {
    await updateTransaction(req.user._id, transactionId, updatedFields);
    return res.send("Transaction successfully updated.");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Transaction update was not successful. " + error);
  }
};
