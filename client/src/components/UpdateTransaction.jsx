import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import DialogCustom from "./DialogCustom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "./Button";
import Input from "./Input";

import { checkAuthStatus, updateTransaction } from "../util/server-calls";
import { setBalanceState, setTransactionsState } from "../util/helpers";
import TransactionInputsGroup from "./TransactionInputsGroup.jsx";
import DialogCustom from "./DialogCustom";

export default function UpdateTransaction({ transaction }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const [updTransaction, setUpdTransaction] = useState({
    name: transaction.name,
    amount: transaction.amount,
    category: transaction.category,
    subcategory: transaction.subcategory,
    date: transaction.date,
    _id: transaction._id,
  });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     if (["categoryName", "subcategoryName"].includes(name)) e.target.blur();
  //     setUpdTransaction((prevState) => ({ ...prevState, [name]: value }));
  //   };
  //   const handleFocus = (e) => {
  //     e.target.value = "";
  //   };

  const handleUpdateTransaction = async (e) => {
    e.preventDefault();
    await updateTransaction(updTransaction);
    const { user } = await checkAuthStatus();
    setBalanceState(dispatch, user);
    setTransactionsState(dispatch, user);
  };

  return (
    <DialogCustom onClick={handleUpdateTransaction}>
      <TransactionInputsGroup
        transaction={updTransaction}
        categories={categories}
        setState={setUpdTransaction}
        isUpdate={true}
      />
    </DialogCustom>
  );
}
