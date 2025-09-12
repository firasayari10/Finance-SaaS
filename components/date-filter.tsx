"use client"

import { Suspense } from "react";
import qs from "query-string";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";


import { useState } from "react";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";
import {  formatDateRange}  from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,PopoverContent,PopoverTrigger,PopoverClose
}from "@/components/ui/popover"
import { subDays ,format} from "date-fns";

const DateFilterContent=() => {
      const params = useSearchParams();
        const accountId = params.get("accountId") ;
        const from = params.get('from') ||"";
        const to = params.get("to") || "" ;
        const pathname=usePathname();
        const router = useRouter();
        const defaultTo = new Date();
        const defaultFrom=subDays(defaultTo,30);
        const paramState = {
            from: from ? new Date(from) : defaultFrom,
            to:to? new Date(to) : defaultTo,
        
        };
        const [date, setDate]= useState<DateRange | undefined>(paramState);
        const pushToUrl = (dateRange: DateRange | undefined) => {
            const query ={
                from:format(dateRange?.from || defaultFrom,"yyyy-MM-dd"),
                to:format(dateRange?.from || defaultTo,"yyyy-MM-dd"),
                accountId,
            };
            const url=qs.stringifyUrl({
                url:pathname,
                query,

            },{skipEmptyString:true, skipNull:true,})

            router.push(url);
        }

        const onReset= ()=> {
            setDate(undefined);
            pushToUrl(undefined);
        }
return ( 
                <div>
                    <Popover>
                        <PopoverTrigger asChild  >
                            <Button  disabled={false} size="sm" variant="outline" className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/30 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
                            <span>
                                {formatDateRange(paramState)}
                            </span>
                            <ChevronDown className="ml-2 size-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="lg:w-auto w-full p-0" align="start">
                          <div className="min-w-[300px] w-auto"> 
                                                    <Calendar
                                                        disabled={false}
                                                        initialFocus
                                                        mode="range"
                                                        defaultMonth={date?.from}
                                                        selected={date}
                                                        onSelect={setDate}
                                                        
                                                        className="w-[300px]"
                                                    />
                                                    </div>

                            <div className="p-4 w-full flex flex-col gap-2">
                                <PopoverClose asChild>
                                    <Button
                                    onClick={onReset}
                                    disabled={!date?.from || !date?.to}
                                    className="w-full"
                                    variant="outline"
                                    >
                                    Reset
                                    </Button>
                                </PopoverClose>
                                <PopoverClose asChild>
                                    <Button
                                    onClick={() => pushToUrl(date)}
                                    disabled={!date?.from || !date?.to}
                                    className="w-full"
                                    >
                                    Apply
                                    </Button>
                                </PopoverClose>
                                </div>

                        </PopoverContent>
                    </Popover>
                </div>

)
}

export const DateFilter = () => {
  return (
    <Suspense fallback={
      <Button disabled size="sm" variant="outline" className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/30 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
        <span>Loading...</span>
        <ChevronDown className="ml-2 size-4 opacity-50" />
      </Button>
    }>
      <DateFilterContent />
    </Suspense>
  );
}