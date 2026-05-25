import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function QualityChart({
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
        h-[380px]
      "
    >
      <div className="mb-6">
        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Listing Quality
        </h2>

        <p
          className="
            text-sm
            text-gray-500
            mt-1
          "
        >
          Product quality metrics
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="80%"
      >
        <BarChart
          data={data}
        >
          <XAxis
            dataKey="name"
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#4CBB17"
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

export default QualityChart;