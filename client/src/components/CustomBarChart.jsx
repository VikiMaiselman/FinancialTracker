import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import React from "react";
import { useSelector } from "react-redux";

export default function CustomBarChart() {
  const transactions = useSelector((state) => state.transactions);
  const categories = useSelector((state) => state.categories);

  const renderLabel = function (entry) {
    return `${entry.name} (${entry.total}₪)`;
  };

  const colorTypes = ["#9A4444", "#D6D46D", "#DE8F5F"];
  const data = categories.map((category, idx) => {
    const subtotal = transactions.filter((tx) => tx.category === category.name).reduce((acc, tx) => acc + tx.amount, 0);
    return {
      name: category.name,
      subtotal: subtotal,
      fill: colorTypes[idx],
    };
  });

  return (
    <BarChart width={730} height={250} data={data} label={renderLabel}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="subtotal" fill="fill" />
    </BarChart>
  );
}
