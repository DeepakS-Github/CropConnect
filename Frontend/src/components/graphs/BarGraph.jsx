import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { captializeFirstLetter } from "../../utils/helper/captializeFirstLetter";

const BarGraph = ({ data, color, xKey, yKey, title = "Graph Title" }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <h2 className={`text-center font-semibold mb-4`}>{title}</h2>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xKey}
          axisLine={{ stroke: color, strokeWidth: 2 }}
          tick={{ fill: color, fontSize: "12px" }}
          tickFormatter={(tick) => captializeFirstLetter(tick)}
        />
        <YAxis
          axisLine={{ stroke: color, strokeWidth: 2 }}
          tick={{ fill: color, fontSize: "12px" }}
          tickFormatter={(tick) => `Rs.${tick}`}
        />
        <Bar
          dataKey={yKey}
          fill={color}
          //   activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
