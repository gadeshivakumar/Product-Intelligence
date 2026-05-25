import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#4CBB17",
  "#48872B",
  "#39542C",
];

function IssueChart({
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
          Issue Severity
        </h2>

        <p
          className="
            text-sm
            text-gray-500
            mt-1
          "
        >
          Product issue distribution
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="80%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
          >
            {data.map(
              (
                item,
                index
              ) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IssueChart;