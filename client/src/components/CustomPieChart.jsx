import { PieChart, Pie } from "recharts";
import React from "react";

export default function CustomPieChart({ data }) {
  const renderLabel = function (entry) {
    return `${entry?.name} (${entry?.subcategoryTotal}₪)`;
  };
  return (
    <PieChart width={760} height={250}>
      <Pie
        data={data}
        dataKey="subcategoryTotal"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={90}
        fill={data.fill}
        textAnchor="middle"
        dominantBaseline="central"
        paddingAngle={15}
        label={renderLabel}
      />
    </PieChart>
  );
}
