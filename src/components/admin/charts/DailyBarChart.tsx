import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";
import type { DailyStats } from "../../../data/visitorTracker";

type Props = {
  data: DailyStats[];
};

type Metric = "visitors" | "pageviews";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 px-4 py-3 shadow-lg ring-1 ring-gray-200/60 dark:ring-gray-700">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
        {label
          ? new Date(label + "T00:00:00").toLocaleDateString("en", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })
          : ""}
      </p>
      {payload.map((entry, idx) => (
        <div key={idx} className="flex items-center gap-2 text-sm">
          <span
            className="h-2.5 w-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600 dark:text-gray-300">
            {entry.name}:
          </span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function DailyBarChart({ data }: Props) {
  const [metric, setMetric] = useState<Metric>("visitors");

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-gray-300 dark:text-gray-600">
        <svg className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
        <p className="text-sm font-medium">No chart data available</p>
        <p className="text-xs mt-1">Start browsing to see analytics</p>
      </div>
    );
  }

  const barColor = metric === "visitors" ? "#6366f1" : "#f97316";

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-end mb-4">
        <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-800 p-0.5 ring-1 ring-gray-200/50 dark:ring-gray-700">
          {(["visitors", "pageviews"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                metric === m
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {m === "visitors" ? "Visitors" : "Pageviews"}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 4 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="stroke-gray-200 dark:stroke-gray-800"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={(val: string) =>
                new Date(val + "T00:00:00").toLocaleDateString("en", {
                  month: "short",
                  day: "numeric",
                })
              }
              tick={{ fontSize: 11, fill: "currentColor" }}
              className="text-gray-400 dark:text-gray-500"
              axisLine={false}
              tickLine={false}
              minTickGap={20}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "currentColor" }}
              className="text-gray-400 dark:text-gray-500"
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
              formatter={() => (
                <span className="text-gray-600 dark:text-gray-400">
                  {metric === "visitors" ? "Visitors" : "Pageviews"}
                </span>
              )}
            />
            <Bar
              dataKey={metric}
              name={metric === "visitors" ? "Visitors" : "Pageviews"}
              fill={barColor}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
              animationDuration={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}