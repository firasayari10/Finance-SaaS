
import { z } from "zod"
import { insertAccountSchema } from "@/db/schema";
import {
    Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle
} from "@/components/ui/sheet"
import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";
import { AccountForm } from "@/features/accounts/components/account-form";
import { FormValue } from "hono/types";
import { useCreateAccount } from "@/features/accounts/api/user-create-account";

export const NewAccountSheet = () => {
const {isOpen, onClose} = useNewAccount();
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
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending}  defaultValues={{ name : ""}}/>
    </SheetContent>
</Sheet>
);
};