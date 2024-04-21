import CreateTransaction from "../components/CreateTransaction";
import TransactionsContainer from "../components/TransactionsContainer";

export default function Dashboard() {
  return (
    <div className="w-full mx-10 px-8 flex flex-col gap-5">
      <h2 className="mb-8 font-bold uppercase md:text-4xl text-stone-900">All Transactions</h2>
      <TransactionsContainer />
      <TransactionsContainer />
      <TransactionsContainer />
      <CreateTransaction />
    </div>
  );
}
