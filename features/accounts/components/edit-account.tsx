
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

export const EditAccountSheet = () => {
const {isOpen, onClose , id} = useOpenAccount();


const accoutnQuery = useGetAccount(id)
const mutation = useCreateAccount();
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
                New account
            </SheetTitle>
            <SheetDescription >
                create a new account to track your transactions 
            </SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending}  defaultValues={ defaultValues}/>
    </SheetContent>
</Sheet>
);
};