import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PricingChart({
  data,
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        border
        border-gray-100
        shadow-sm
        h-[420px]
      "
    >
      <div className="mb-6">
        <h2
          className="
            text-2xl
            font-semibold
          "
        >
          Competitor Pricing
        </h2>

        <p
          className="
            text-sm
            text-gray-500
            mt-1
          "
        >
          Compare market pricing
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="80%"
      >
        <BarChart data={data}>
          <XAxis
            dataKey="name"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="ourPrice"
            fill="#4CBB17"
            radius={[
              8,
              8,
              0,
              0,
            ]}
          />

          <Bar
            dataKey="competitorPrice"
            fill="#39542C"
            radius={[
              8,
              8,
              0,
              0,
            ]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PricingChart;