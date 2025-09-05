
import { z } from "zod"
import { insertCategorySchema } from "@/db/schema";
import {
    Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle
} from "@/components/ui/sheet"
import { useNewCategory } from "@/features/categories/hooks/use-new-cactegory";
import { CategoryForm } from "./category-form"; 
import { FormValue } from "hono/types";
import { useCreateCategory } from "../api/user-create-category";

export const NewCategorySheet = () => {
const {isOpen, onClose} = useNewCategory();
const mutation = useCreateCategory();
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
});

type FormValues = z.infer<typeof formSchema>;
const  onSubmit = (values :  FormValues) =>
        {
                mutation.mutate(values, {
                    onSuccess: () => {
                        onClose();
                    }
                });

            
        }
return (
<Sheet open={isOpen} onOpenChange ={ onClose } >

    <SheetContent 
    className="space-y-4" >

        <SheetHeader>
            <SheetTitle>
                New Category
            </SheetTitle>
            <SheetDescription >
                create a new category
            </SheetDescription>
        </SheetHeader>
        <CategoryForm onSubmit={onSubmit} disabled={mutation.isPending}  defaultValues={{ name : ""}}/>
    </SheetContent>
</Sheet>
);
};