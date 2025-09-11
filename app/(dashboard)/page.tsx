import { DataGrid } from "@/components/DataGrid";
import { DataCharts } from "@/components/ui/data-charts";

export default function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 mt-6">
      <DataGrid />
      <DataCharts />
    </div>
  );
}
