import CurrencyInput from "react-currency-input-field"


import {
    Info , MinusCircle , PlusCircle
} from "lucide-react"


import { cn } from "@/lib/utils"


import {

    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"
import { placeholder } from "drizzle-orm"


type Props = {
    value: string; 
    onChange : (value : string | undefined) => void ;
    placeholder?: string;
    disabled?:boolean;
}



export const AmountInput = ({
    value, onChange , placeholder,disabled
}:Props) => {
    const parsedValue = parseFloat(value);
    const isIncome = parsedValue>0 ;
    const isExpense = parsedValue<0 ;
    const onReverseValue = () => {
        if (!value ) return ;
        
        onChange((parseFloat(value)* -1).toString());
    }

    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild >

                        <button type="button" onClick={onReverseValue} className={cn(
                            "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 roudner-md p-2 flex items-center justify-center transition" ,
                            isIncome && "bg-emerald-500 hover:bg-emerald-600" , 
                            isExpense && "bg-rose-600 hover:bg-rose-500",
                        )}>
                            {!parsedValue && <Info className="size-3 text-white " />}
                            {isIncome && <PlusCircle className="size-3 text-white " />}
                            {isExpense && <MinusCircle className="size-3 text-white " />}
                        </button>
        


                        
                    </TooltipTrigger>
                    <TooltipContent>
                        Use [+] for income and [-] for Expense
                    </TooltipContent>

                </Tooltip>
            </TooltipProvider>
            <CurrencyInput  
    prefix="$"
    className="flex h-9 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
    placeholder={placeholder}
    value={value}
    decimalsLimit={2}
    decimalScale={2}
    onValueChange={onChange}
    disabled={disabled}
/>
            <p className="text-xd text-muted-foreground mt-2">
                {isIncome && "this will count as income "}
                {isExpense && "this will count as expense "}
            </p>
            
        </div>
    )
}