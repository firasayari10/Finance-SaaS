"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { AreaChart, FileSearch } from "lucide-react";
import { LineVariant } from "@/components/ui/line-variant"
import { useState } from "react";
type Props = {
  data?: {
    date: string;
    income: number;
    expense: number;
  }[];
};
import {
 Select,
 SelectTrigger,
 SelectContent,
 SelectValue,
 SelectItem
}from"@/components/ui/select"

import { AreaVariant } from "@/components/AreaVariant"
import { BarVariant } from "@/components/ui/bar-variant";

export const Chart = ({ data = [] }: Props) => {
  const [chartType , setChartType] =useState("area") ;
  const onTypeChange=(type:string) => {
    setChartType(type);
  }
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">
          Transactions
        </CardTitle>
        <Select defaultValue={chartType}  onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="chart type" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="area" >
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1" />
                Area chart

              </div>
            </SelectItem>
            <SelectItem value="line" >
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1" />
               Line chart

              </div>
            </SelectItem>
            <SelectItem value="bar" >
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1" />
               Bar chart

              </div>
            </SelectItem>

          </SelectContent>

        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              no data for this period 
            </p>
          </div>
        ) : (
          <>
            {chartType ==="line" && <LineVariant data={data} />}
            {chartType ==="area" && <AreaVariant data={data} />}
            {chartType ==="bar" && <BarVariant data={data} />}
           
          </>
        )}
      </CardContent>
    </Card>
  );
};
