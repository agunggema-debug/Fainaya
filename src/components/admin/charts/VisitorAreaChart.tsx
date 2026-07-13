import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { DailyStats } from "../../../data/visitorTracker";

type Props = {
  data: DailyStats[];
};

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
              year: "numeric",
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

export default function VisitorAreaChart({ data }: Props) {
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

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: -16, bottom: 4 }}
        >
          <defs>
            <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="pageviewGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
            </linearGradient>
          </defs>
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
            formatter={(value: string) => (
              <span className="text-gray-600 dark:text-gray-400">{value}</span>
            )}
          />
          <Area
            type="monotone"
            dataKey="visitors"
            name="Visitors"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#visitorGradient)"
            dot={false}
            activeDot={{
              r: 5,
              fill: "#6366f1",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
          <Area
            type="monotone"
            dataKey="pageviews"
            name="Pageviews"
            stroke="#f97316"
            strokeWidth={2.5}
            fill="url(#pageviewGradient)"
            dot={false}
            activeDot={{
              r: 5,
              fill: "#f97316",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}