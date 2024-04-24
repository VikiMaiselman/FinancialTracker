import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import Button from "./Button";
import Input from "./Input";
import { checkAuthStatus, createTransaction, getAllTransactions, getBalance } from "../util/server-calls.js";
import { setBalanceState, setTransactionsState } from "../util/helpers";
import TransactionInputsGroup from "./TransactionInputsGroup";

export default function CreateTransaction() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: "",
    category: "",
    subcategory: "",
    date: new Date(),
  });
  const [error, setError] = useState("");

  const validate = () => {
    for (const val of Object.values(newTransaction)) {
      if (val.toString().trim() === "") return false;
    }
    return true;
  };

  const handleCreateTransaction = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      setError("Fill in all the fields.");
      return Swal.fire({
        title: "Ooops...",
        text: "Fill in all the fields.",
        icon: "error",
        confirmButtonText: "Please, try again.",
        confirmButtonColor: "rgb(68 64 60)",
        color: "color: rgb(168 162 158)",
        iconColor: "red",
      });
    }

    await createTransaction(newTransaction);
    const { user } = await checkAuthStatus();
    setBalanceState(dispatch, user);
    setTransactionsState(dispatch, user);
    setNewTransaction({
      name: "",
      amount: "",
      category: "",
      subcategory: "",
      date: new Date(),
    });
  };

  return (
    <>
      <h2 className="text-xl font-bold text-stone-700 mt-4">Create New Transaction</h2>
      <form className="w-full flex flex-col 2xl:flex-row justify-around items-center gap-3 px-4 py-2 my-1 text-sm md:text-base rounded-md bg-stone-700 text-stone-400">
        <TransactionInputsGroup transaction={newTransaction} categories={categories} setState={setNewTransaction} />
        <p className="flex flex-col gap-1 my-2">
          <Button onClick={handleCreateTransaction}>Save</Button>
        </p>
      </form>
    </>
  );
}
