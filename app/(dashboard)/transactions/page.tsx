"use client" ;

import { Card , CardContent , CardHeader , CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { DataTable } from "@/components/ui/data-table";
import  {transactions as transactionsSchema } from "@/db/schema"
import  { columns}  from "./columns"
import { useGetTransactions } from "@/features/transactions/api/user-get-transactions";

import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useState } from "react";
import  {ImportCard } from "@/app/(dashboard)/transactions/ImportCard"
import { UploadButton } from "@/app/(dashboard)/transactions/UploadButton"
import { useSelectAacount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions} from "@/features/transactions/api/use-bulk-createtransactions"
enum VARIANTS {
    LIST="LIST",
    IMPORT="IMPORT",

};
const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors: [],
    meta: {},
}

const TransationsPage = () => {
    const [AccountDialog , confirm] = useSelectAacount();
    const [variant , setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults , setImportResults] = useState(INITIAL_IMPORT_RESULTS);

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS)=> {
        console.log({results});
        setImportResults(results);
        setVariant(VARIANTS.IMPORT);

    };
    const onCancelImoport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS);
        setVariant(VARIANTS.LIST)
    }

    const newTransaction = useNewTransaction();
    const createTransactions = useBulkCreateTransactions();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsquery = useGetTransactions()
    const transactions = transactionsquery.data  ||[];
    const isdisabled = transactionsquery.isLoading || deleteTransactions.isPending ;
    const onSubmitImport = async (values: typeof transactionsSchema.$inferInsert[], ) => {

        const accountId = await confirm() ;
        if(!accountId) {
            return toast.error("please select an account to continue ")
        }
        const data = values.map((value) => ({
            ...value,
            accountId: accountId  as string ,
        }));
        createTransactions.mutate(data,{
            onSuccess:() => {
                onCancelImoport();
            },
        })

        
        

    }

    if (transactionsquery.isLoading)
    {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 mb-24 ">
            <Card className=" border-none drop-shadow-sm"> 
            <CardHeader className=" gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <Skeleton className="h-8 w-48"  />
                <CardContent>
                    <div className="h-[500]  w-full flex items-center justify-center">
                        <Loader2 className="size-6 text-slate-300 animate-spin"/>

                    </div>
                </CardContent>
            </CardHeader>
            </Card>



            </div>
            
        
        )
    }
    if (variant === VARIANTS.IMPORT)
    {
        return(
        <>
        <div>
            <AccountDialog />
            <ImportCard data={importResults.data} onCancel={onCancelImoport} onSubmit={onSubmitImport}/>
        </div>
            
            </>)
    }
    
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 mb-24 ">
            <Card className=" border-none drop-shadow-sm">
            <CardHeader className=" gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1" >
                    Transactions Hisotry
                </CardTitle>
                <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                    <Button size="sm" onClick={newTransaction.onOpen} className="w-full lg:w-auto">
                    Add new 
                </Button>
                
                        <UploadButton  onUplaod={onUpload}/>
                
                </div>
     
            </CardHeader>
            <CardContent>
                <DataTable filterKey="payee" columns={columns} data={transactions} onDelete={(row)=>{
                    const  ids = row.map((r)=> r.original.id);
                    deleteTransactions.mutate({ids});
                }}  disabled={isdisabled}/>
            </CardContent>
            </Card>
            
        </div>
    );

};

export default TransationsPage ;