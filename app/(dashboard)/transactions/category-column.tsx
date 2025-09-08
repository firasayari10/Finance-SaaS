import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { cn }  from "@/lib/utils"
import { TriangleAlert } from "lucide-react";

type Props = {
    id:string,
   
    category: string | null ,
    categoryId: string |null  ;
};

export const CategoryColumn = ({
    
    category,
    categoryId,
}: Props) => {
    const { onOpen: onOpenCategory } = useOpenCategory();
    const onClick = ( ) => {
        if(categoryId)
        {onOpenCategory(categoryId);}
    }
    return (
        
        <div 
        className={cn("flex item-center cursor-pointer hover:underline" , 
            !category &&"text-rose-500" ,
        )} 
        onClick={onClick}>
            {!category && <TriangleAlert className="mr-2 size-4 shrink-0"/>}
            {category || "uncategorized"}
        </div>

    )
}