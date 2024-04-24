import React from "react";
import Transaction from "./Transaction";

export default function TransactionsContainer({ categoryName, txs, categoryFullObject = null }) {
  console.log(categoryFullObject);
  const categoryHeader = categoryFullObject
    ? `Total ${categoryName}: ${categoryFullObject.total} ₪`
    : `My ${categoryName}`;

  return (
    <>
      <h2 className="text-xl font-bold text-stone-700 mt-4">{categoryHeader}</h2>

      <ul className="p-4 mt-0 mb-4 flex-1 rounded-md bg-stone-200 overflow-auto">
        <div className="w-full flex justify-around gap-1 px-4 py-2 my-1 text-sm md:text-base rounded-md bg-stone-700 text-stone-300">
          <p className="w-full">Name of Transaction</p>
          <p className="w-full">Amount (in ILS)</p>
          <p className="w-full">Date of Transaction</p>
          <p className="w-full">Subcategory of Transaction</p>
          <p className="w-full">Actions</p>
        </div>
        {React.Children.toArray(
          txs?.map((tx) => (
            <li className="flex justify-between my-4">
              <Transaction tx={tx} />
            </li>
          ))
        )}
      </ul>
    </>
  );
}
