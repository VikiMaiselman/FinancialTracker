import { useSelector } from "react-redux";

import CreateTransaction from "../components/CreateTransaction";
import TransactionsContainer from "../components/TransactionsContainer";
import BreakLine from "../components/elements/BreakLine";
import CustomPieChart from "../components/charts/CustomPieChart";
import { filterTransactionsPerSubcategory } from "../util/helpers";

export default function CategoryTransactions({ categoryName }) {
  const transactions = useSelector((state) => state.transactions);
  const categories = useSelector((state) => state.categories);

  const currentCategory = categories.find((c) => c.name === categoryName);
  const currentTransactions = transactions?.filter((t) => t.category === categoryName);
  const transactionsPerSubcategory = filterTransactionsPerSubcategory(currentCategory, currentTransactions);

  return (
    <div className="w-full mx-10 px-8 flex flex-col gap-5 overflow-auto">
      <h2 className="mb-8 font-bold uppercase md:text-4xl text-stone-900">My {categoryName}</h2>
      <div className="flex items-center justify-center">
        <CustomPieChart data={transactionsPerSubcategory} />
      </div>
      <CreateTransaction />
      <BreakLine />
      <TransactionsContainer
        categoryName={categoryName}
        txs={currentTransactions}
        categoryFullObject={currentCategory}
      />
    </div>
  );
}
