import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { eachDayOfInterval, isSameDay, subDays , format } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};


export function converAmountFromMiliunits(amount:number ){
  return amount /1000;
}
export function converAmountToMiliunits (amount:number ){
  return Math.round(amount*1000)
}

export function formatCurrency(value:number){
  //const finalValue = converAmountToMiliunits(value);
  return Intl.NumberFormat("en-US"    ,{
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,

  }).format(value);
}
  
  export function caluclatePercentageChange ( current: number , previous: number ) 
  {
    if (previous === 0) 
    {
      return previous === current ? 0 : 100 ;
    }
    return ((current - previous) / previous) * 100;
  
  }


export function fillMissingDays( activedays: {
  date:Date , 
  income : number ;
  expenses: number ;
}[],
startDate:Date,
endDate:Date,) {

  if  (activedays.length === 0) 
  {
    return [];
  }
  const allDays = eachDayOfInterval ( {
    start:startDate,
    end:endDate,

  });
  const transactionByDay = allDays.map((day) => 
  {
    const found = activedays.find((d) => isSameDay(d.date, day));
    if(found)  {
      return found ;
    }else 
    {
      return {
        date: day ,
        income: 0 ,
        expenses: 0,
      };
    }

  });
return transactionByDay;
}
type Period = {
  from:string |Date|undefined ;
  to : string |Date|undefined;
}

export function formatDateRange(period? : Period) {
  const defaultTO=new Date();
  const defaultForm= subDays(defaultTO,30);

  if(!period?.from) {
    return `${format(defaultForm,"LLL dd")}-${format(defaultTO,"LL dd, y")}`;

  }
  if(period.to) {
    return `${format(period.from,"LLL dd")}-${format(period.to,"LL dd, y")}`;

  }

  return format(period.from, "LL dd, y");
}

export function formatPercentage( value:number,
  options:{addPrefix ?:boolean} = {
    addPrefix: false,
  },
) {
  const result=new Intl.NumberFormat("en-US" , {
    style:"percent",
  }).format(value/100);
  if(options.addPrefix && value >0) {
    return `+${result}`;
  }

  return result;
}