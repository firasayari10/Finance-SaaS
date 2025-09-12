import {
  Cell,
  Legend,
  LegendPayload,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatPercentage } from "@/lib/utils";
import { CategoryToolTip } from "./category-tool-tip";

const COLORS = ["#0062ff", "#12C6FF", "#ff647f", "#FF9354"];

type Props = {
  data?: {
    name: string;
    value: string;
  }[];
};

export const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={(props) => {
            const { payload } = props;
            if (!payload) return null;

            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entry: LegendPayload, index: number) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.value}
                      </span>
                      <span className="text-sm">
  {formatPercentage(((entry.payload as { percent?: number } | undefined)?.percent ?? 0) * 100)}
</span>

                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />

        <Tooltip content={(props) => <CategoryToolTip {...props} />} />

        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
        >
          {data?.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
