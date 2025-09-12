import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type TooltipItem = {
  value: number;
  name?: string;
  payload?: Record<string, unknown>;
};

type Props = {
  active: boolean;
  payload?: TooltipItem[];
};

export const CustomToolTip = ({ active, payload }: Props) => {
  if (!active || !payload || payload.length < 2) return null;

  const income = payload[0]?.value ?? 0;
  const expenses = payload[1]?.value ?? 0;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div>
        <Separator />
        <div className="p-2 px-3 space-y-1">
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex items-center gap-x-2">
              <div className="size-1.5 bg-blue-500 rounded-full" />
              <p className="text-sm text-muted-foreground">Income</p>
            </div>
            <p className="text-sm text-right font-medium">
              {formatCurrency(income)}
            </p>
          </div>
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex items-center gap-x-2">
              <div className="size-1.5 bg-rose-500 rounded-full" />
              <p className="text-sm text-muted-foreground">Expense</p>
            </div>
            <p className="text-sm text-right font-medium">
              {formatCurrency(expenses)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
