import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "./elements/Button";
import { checkAuthStatus, createTransaction } from "../util/server-calls.js";
import { setAllMoneyState, setTransactionsState } from "../util/helpers";
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
  const [error, setError] = useState(true);

  const validate = () => {
    for (const val of Object.values(newTransaction)) {
      if (val.toString().trim() === "") return true;
    }
    return false;
  };

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    const wasSuccess = await createTransaction(newTransaction);
    if (!wasSuccess) return;

    const { user } = await checkAuthStatus();
    setAllMoneyState(dispatch, user);
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
        <TransactionInputsGroup
          transaction={newTransaction}
          categories={categories}
          setState={setNewTransaction}
          setErrorState={setError}
        />
        <p className="flex flex-col gap-1 my-2">
          <label className="font-bold text-stone-500 text-sm uppercase">Actions</label>
          <Button onClick={handleCreateTransaction} disabled={error || validate()}>
            Save
          </Button>
        </p>
      </form>
    </>
  );
}
