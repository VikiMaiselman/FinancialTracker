import { useDispatch } from "react-redux";

import Button from "./Button";
// import DialogCustom from "./DialogCustom";

import { setBalanceState, setTransactionsState } from "../util/helpers";
import { checkAuthStatus, deleteTransaction } from "../util/server-calls";
import UpdateTransaction from "./UpdateTransaction";

export default function Transaction({ tx }) {
  const dispatch = useDispatch();
  const formattedDate = new Date(tx.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDeleteTransaction = async (e) => {
    await deleteTransaction(tx._id);
    const { user } = await checkAuthStatus();
    setBalanceState(dispatch, user);
    setTransactionsState(dispatch, user);
  };
  return (
    <>
      <div className="w-full flex justify-around items-center gap-1 px-4 py-0 my-0 text-sm md:text-base rounded-md bg-stone-300 text-stone-700">
        <p className="w-full min-w-max overflow-scroll">{tx?.name}</p>
        <p className="w-full overflow-scroll">{tx?.amount} ₪</p>
        <p className="w-full overflow-scroll">{formattedDate}</p>
        <p className="w-full min-w-12 overflow-scroll">{tx?.subcategory}</p>
        <menu className="w-full flex items-center justify-end gap-4 my-4">
          <li>
            <Button onClick={handleDeleteTransaction}>X</Button>
          </li>
          <li>
            <UpdateTransaction transaction={tx} />
          </li>
        </menu>
      </div>
    </>
  );
}
