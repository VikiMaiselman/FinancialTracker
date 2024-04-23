import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "./Button";
import Input from "./Input";
import { createTransaction, getAllTransactions, getBalance } from "../util/server-calls.js";

export default function CreateTransaction() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: "",
    categoryName: "",
    subcategoryName: "",
    date: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["categoryName", "subcategoryName"].includes(name)) e.target.blur();
    setNewTransaction((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleFocus = (e) => {
    e.target.value = "";
  };

  const handleCreateTransaction = async (e) => {
    e.preventDefault();
    await createTransaction(newTransaction);
    const txs = await getAllTransactions();
    const balance = await getBalance();
    dispatch({
      type: "SET_TXS",
      payload: txs,
    });
    dispatch({
      type: "SET_BALANCE",
      payload: balance,
    });
  };

  return (
    <>
      <h2 className="text-xl font-bold text-stone-700 mt-4">Create New Transaction</h2>

      <form className="w-full flex flex-col 2xl:flex-row justify-around items-center gap-3 px-4 py-2 my-1 text-sm md:text-base rounded-md bg-stone-700 text-stone-400">
        <Input name="name" value={newTransaction.name} placeholder="Name/purpose ..." onChange={handleChange} />
        <Input
          name="amount"
          type="number"
          value={newTransaction.amount}
          placeholder="Amount (in ILS) ..."
          onChange={handleChange}
        />
        <Input
          name="categoryName"
          value={newTransaction.categoryName}
          placeholder="Choose category ..."
          list="datalist-categories"
          options={categories}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <Input
          name="subcategoryName"
          value={newTransaction.subcategoryName}
          placeholder="Choose subcategory ..."
          list="datalist-subcategories"
          options={categories?.find((c) => c.name === newTransaction.categoryName)?.subcategories}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <Input
          name="date"
          type="date"
          value={newTransaction.date}
          placeholder="Set a date optionally"
          onChange={handleChange}
        />
        <p className="flex flex-col gap-1 my-2">
          <Button onClick={handleCreateTransaction}>Save</Button>
        </p>
      </form>
    </>
  );
}
