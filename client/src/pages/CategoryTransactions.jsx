import CreateTransaction from "../components/CreateTransaction";
import TransactionsContainer from "../components/TransactionsContainer";

export default function CategoryTransactions({ type }) {
  return (
    <div className="w-full mx-10 px-8 flex flex-col gap-5 overflow-auto">
      <h2 className="mb-8 font-bold uppercase md:text-4xl text-stone-900">{type}</h2>
      <TransactionsContainer />
      <CreateTransaction />
    </div>
  );
}
