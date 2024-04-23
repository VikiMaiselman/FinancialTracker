import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "@mui/icons-material/Edit";
import TransactionInputsGroup from "./TransactionInputsGroup.jsx";
import DialogCustom from "./DialogCustom";

import { checkAuthStatus, updateTransaction } from "../util/server-calls";
import { setBalanceState, setTransactionsState } from "../util/helpers";

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

  const handleUpdateTransaction = async (e) => {
    e.preventDefault();
    await updateTransaction(updTransaction);
    const { user } = await checkAuthStatus();
    setBalanceState(dispatch, user);
    setTransactionsState(dispatch, user);
  };

  return (
    <DialogCustom onClick={handleUpdateTransaction} icon={<EditIcon />}>
      <TransactionInputsGroup
        transaction={updTransaction}
        categories={categories}
        setState={setUpdTransaction}
        isUpdate={true}
      />
    </DialogCustom>
  );
}
