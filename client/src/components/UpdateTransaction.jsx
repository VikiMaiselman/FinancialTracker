import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditIcon from "@mui/icons-material/Edit";
import TransactionInputsGroup from "./TransactionInputsGroup.jsx";
import DialogCustom from "./DialogCustom";

import { checkAuthStatus, updateTransaction } from "../util/server-calls";
import { setBalanceState, setTransactionsState } from "../util/helpers";
import Swal from "sweetalert2";

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

  const validate = () => {
    for (const val of Object.values(updTransaction)) {
      if (val.toString().trim() === "") return false;
    }
    return true;
  };

  const handleUpdateTransaction = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      setError("You shouldn't leave empty fields.");
      return Swal.fire({
        title: "Ooops...",
        text: error,
        icon: "error",
        confirmButtonText: "Please, try again.",
        confirmButtonColor: "rgb(68 64 60)",
        color: "color: rgb(168 162 158)",
        iconColor: "red",
      });
    }
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
