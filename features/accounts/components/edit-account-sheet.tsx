
import { z } from "zod"
import { insertAccountSchema } from "@/db/schema";
import {
    Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle
} from "@/components/ui/sheet"
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { FormValue } from "hono/types";
//import { useCreateAccount } from "@/features/accounts/api/user-create-account";
import { useGetAccount } from "../api/user-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import  {useDeleteAccount } from "@/features/accounts/api/use-delete-account"
import { useConfirm } from "@/hooks/use-confirm";

export const EditAccountSheet = () => {
const {isOpen, onClose , id} = useOpenAccount();
const [ConfirmDialog , confirm] = useConfirm(
    "Are you sure you ?", " you are going to delete this account "

)



const accoutnQuery = useGetAccount(id)
//const mutation = useCreateAccount();
const editMutation = useEditAccount(id);
const deleteMutation = useDeleteAccount(id!);

const isPending = editMutation.isPending || deleteMutation.isPending ;
const isLoading = accoutnQuery.isLoading 

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

const defaultValues =  accoutnQuery.data ? {
    name: accoutnQuery.data.name
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
            disabled={isPending}  
            defaultValues={ defaultValues}
            onDelete={onDelete}/>
        )}
        
    </SheetContent>
</Sheet>
</>
);
};