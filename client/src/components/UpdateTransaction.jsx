import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "@mui/icons-material/Edit";
import TransactionInputsGroup from "./TransactionInputsGroup.jsx";
import DialogCustom from "./elements/DialogCustom.jsx";

import { checkAuthStatus, updateTransaction } from "../util/server-calls";
import { setAllMoneyState } from "../util/helpers";

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
  const [error, setError] = useState("");

  const handleUpdateTransaction = async (e) => {
    e.preventDefault();

    const wasSuccess = await updateTransaction(updTransaction);
    if (!wasSuccess) return;

    const { user } = await checkAuthStatus();
    setAllMoneyState(dispatch, user);
  };

  return (
    <DialogCustom onClick={handleUpdateTransaction} icon={<EditIcon />} isError={error}>
      <TransactionInputsGroup
        transaction={updTransaction}
        categories={categories}
        setState={setUpdTransaction}
        setErrorState={setError}
        isUpdate={true}
      />
      <p>* - required</p>
    </DialogCustom>
  );
}
