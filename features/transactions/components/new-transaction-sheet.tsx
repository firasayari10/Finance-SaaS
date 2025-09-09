
import { z } from "zod"
import { insertTransactionSchema } from "@/db/schema";
import {
    Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle
} from "@/components/ui/sheet"

import { useCreateTransation } from "@/features/transactions/api/user-create-transaction";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useCreateCategory } from "@/features/categories/api/user-create-category";
import { useGetCategories } from "@/features/categories/api/user-get-categories";
import { useGetAccounts } from "@/features/accounts/api/user-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/user-create-account";
import { NewTransactionForm} from "@/features/transactions/components/transaction-form"
import { useBulkDeleteTransactions } from "../api/use-bulk-create-transactions copy";
import { Loader2 } from "lucide-react";
import { string } from "zod/v3";
import { id } from "zod/v4/locales";

export const NewTransactionSheet = () => {
const {isOpen, onClose} = useNewTransaction();
const CreateMutation = useCreateTransation();
const deleteMutation = useBulkDeleteTransactions();
const categoryQuery = useGetCategories();
const categoryMutation = useCreateCategory();
const onCreateCategory = (name: string) => categoryMutation.mutate({
    name
});

const categoryOptions = (categoryQuery.data ?? [] ).map((category)=>({
    label: category.name , 
    value: category.id
}))


const accountQuery = useGetAccounts();
const accountMutation = useCreateAccount();
const onCreateAccount = (name: string) => accountMutation.mutate({
    name
});

const accountOptions = (accountQuery.data ?? [] ).map((account)=>({
    label: account.name , 
    value: account.id
}))
const isPending = CreateMutation.isPending || categoryMutation.isPending || accountMutation.isPending ;
const isLoading = categoryQuery.isLoading || accountQuery.isLoading ;




const apiSchema = insertTransactionSchema.omit({
    id: true,
});

type apiFormValues = z.input<typeof apiSchema>;

const  onSubmit = (values :  apiFormValues) =>
        {
                CreateMutation.mutate(values, {
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
                New Transaction
            </SheetTitle>
            <SheetDescription >
                create a new Transaction
            </SheetDescription>
        </SheetHeader>
        {isLoading 
        ? (
            <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className=" size-4 text-muted animate-spin"  />
            </div>
        ) : 
        (

        
        <NewTransactionForm
        onSubmit={onSubmit}
        disabled={isPending}
        categoryOptions={categoryOptions}
        onCreateCategory={onCreateCategory}
        accountOptions={accountOptions}
        onCreateAccount={onCreateAccount}
        />
        )
        }
        
    </SheetContent>

</Sheet>
);
};