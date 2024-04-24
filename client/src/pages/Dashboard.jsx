import { useSelector } from "react-redux";

import CreateTransaction from "../components/CreateTransaction";
import TransactionsContainer from "../components/TransactionsContainer";
import BreakLine from "../components/elements/BreakLine.jsx";
import CustomBarChart from "../components/charts/CustomBarChart";

export default function Dashboard() {
  const transactions = useSelector((state) => state.transactions);
  const balance = useSelector((state) => state.balance);

  const expenses = transactions?.filter((t) => t.category === "Expenses");
  const incomes = transactions?.filter((t) => t.category === "Incomes");
  const savings = transactions?.filter((t) => t.category === "Savings");

  return (
    <div className="w-full mx-10 px-8 flex flex-col gap-5">
      <h2 className="mb-6 font-bold uppercase md:text-4xl text-stone-900 tracking-wide">All Transactions</h2>
      <h3 className="mb-8 py-3 md:text-xl bg-stone-700 text-stone-200 tracking-wider">Total Balance: {balance} ₪</h3>
      <div className="flex items-center justify-center">
        <CustomBarChart />
      </div>
      <CreateTransaction />
      <BreakLine />
      <TransactionsContainer categoryName={"Expenses"} txs={expenses} />
      <TransactionsContainer categoryName={"Incomes"} txs={incomes} />
      <TransactionsContainer categoryName={"Savings"} txs={savings} />
    </div>
  );
}
