import React from "react";
import Transaction from "./Transaction";

export default function TransactionsContainer({ type, txs }) {
  return (
    <>
      <h2 className="text-xl font-bold text-stone-700 mt-4">Category: {type}</h2>

      <ul className="p-4 mt-0 mb-4 flex-1 rounded-md bg-stone-100 overflow-auto">
        <div className="w-full flex justify-around gap-1 px-4 py-2 my-1 text-sm md:text-base rounded-md bg-stone-700 text-stone-400">
          <p>Name</p>
          <p>Amount</p>
          <p>Date</p>
          <p>Subcategory</p>
          <p>Actions</p>
        </div>
        {React.Children.toArray(
          txs?.map((tx) => (
            <li className="flex justify-between my-4">
              <Transaction />
            </li>
          ))
        )}
      </ul>
    </>
  );
}
