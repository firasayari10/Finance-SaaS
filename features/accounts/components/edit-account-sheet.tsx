
import { z } from "zod"
import { insertAccountSchema } from "@/db/schema";
import {
    Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle
} from "@/components/ui/sheet"
import { useOpenAccount } from "@/features/hooks/use-open-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { FormValue } from "hono/types";
import { useCreateAccount } from "@/features/accounts/api/user-create-account";
import { useGetAccount } from "../api/user-get-account";
import { Loader2 } from "lucide-react";

export const EditAccountSheet = () => {
const {isOpen, onClose , id} = useOpenAccount();


const accoutnQuery = useGetAccount(id)
const mutation = useCreateAccount();

const isLoading = accoutnQuery.isLoading;

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

            
        };
const defaultValues =  accoutnQuery.data ? {
    name: accoutnQuery.data.name
}:{
    name:"",
}
return (
<Sheet open={isOpen} onOpenChange ={ onClose } >

    <SheetContent 
    className="space-y-4" >

        <SheetHeader>
            <SheetTitle>
               Edit accounts
            </SheetTitle>
            <SheetDescription >
                Modify this exisitng account 
            </SheetDescription>
        </SheetHeader>
        {isLoading ? (
            <div className="absolute inset-0 flex itemcs-center justify-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>

        ):(
            <AccountForm 
            id ={id}
            onSubmit={onSubmit} 
            disabled={mutation.isPending}  
            defaultValues={ defaultValues}/>
        )}
        
    </SheetContent>
</Sheet>
);
};