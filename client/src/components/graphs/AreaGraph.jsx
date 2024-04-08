import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

//   const CustomTooltip = ({ active, payload, yAxisUnit }) => {
//     console.log(payload);
//     if (active && payload && payload.length) {
//       return (
//         <Flex bgColor="#312c2c" gap={"4px"} flexDir={"column"} textColor="#d1d5db" px={"16px"} py={"8px"} borderRadius={"4px"} boxShadow={"sm"}>
//           <Text textColor={"#837971"} fontWeight={500}>{`${payload[0].payload.date} ${payload[0].payload.time}`}</Text>
//           <Flex fontSize={"14px"} gap={"2px"} textColor={"#decfc3"}>
//             <Text>{payload[0].dataKey}: </Text>
//             <Text fontWeight={500}>{payload[0].value} {yAxisUnit}</Text>
//           </Flex>
//         </Flex>
//       );
//     }

//     return null;
//   };

const AreaGraph = ({ lineData, color, xKey, yKey, title = "Graph Title" }) => {
  const gradientId = `gradient-1`;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <h2 className={`text-center font-semibold mb-4`}>{title}</h2>
      <AreaChart data={lineData}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={color} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#666666" />
        <XAxis
          dataKey={xKey}
          axisLine={{ stroke: color, strokeWidth: 2 }}
          tick={{ fill: color, fontSize: "12px" }}
        />
        <YAxis
          axisLine={{ stroke: color, strokeWidth: 2 }}
          tick={{ fill: color, fontSize: "12px" }}
          tickFormatter={(tick) => `Rs.${tick}`}
        />
        {/* <Tooltip
            // content={<CustomTooltip yAxisUnit={yAxisUnit}/>}
            // cursor={{ stroke: "#666666", strokeWidth: 1 }}
            cursor={{ strokeDasharray: "3 3" }}
          /> */}
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaGraph;
