
import { z } from "zod"
import { insertCategorySchema } from "@/db/schema";
import {
    Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle
} from "@/components/ui/sheet"
import { useOpenCategory } from "../hooks/use-open-category";
import { CategoryForm } from "./category-form";
import { FormValue } from "hono/types";

import { useGetCategory } from "../api/user-get-category";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-category";
import  {useDeleteCategory } from "@/features/categories/api/use-delete-category"
import { useConfirm } from "@/hooks/use-confirm";

export const EditCategorySheet = () => {
const {isOpen, onClose , id} = useOpenCategory();
const [ConfirmDialog , confirm] = useConfirm(
    "Are you sure you ?", " you are going to delete this category "

)


const categoryQuery = useGetCategory(id)

const editMutation = useEditCategory(id);
const deleteMutation = useDeleteCategory(id!);

const isPending = editMutation.isPending || deleteMutation.isPending ;
const isLoading = categoryQuery.isLoading 

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
});

type FormValues = z.infer<typeof formSchema>;
const  onSubmit = (values :  FormValues) =>
        {
                editMutation.mutate(values,  {
                    onSuccess: () => {
                        onClose();
                    }
                });

            
        };

const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    deleteMutation.mutate();  
};

const defaultValues =  categoryQuery.data ? {
    name: categoryQuery.data.name
}:{
    name:"",
}
return (
    <>
    <ConfirmDialog />
<Sheet open={isOpen} onOpenChange ={ onClose } >

    <SheetContent 
    className="space-y-4" >

        <SheetHeader>
            <SheetTitle>
               Edit categories
            </SheetTitle>
            <SheetDescription >
                Modify this exisitng categories
            </SheetDescription>
        </SheetHeader>
        {isLoading ? (
            <div className="absolute inset-0 flex itemcs-center justify-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>

        ):(
            <CategoryForm
            id ={id}
            onSubmit={onSubmit} 
            disabled={isPending}  
            defaultValues={ defaultValues}
            onDelete={onDelete}/>
        )}
        
    </SheetContent>
</Sheet>
</>
);
};