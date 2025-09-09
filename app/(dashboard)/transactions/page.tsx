"use client" ;

import { Card , CardContent , CardHeader , CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { DataTable } from "@/components/ui/data-table";

import  { columns}  from "./columns"
import { useGetTransactions } from "@/features/transactions/api/user-get-transactions";

import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useState } from "react";
import  {ImportCard } from "@/app/(dashboard)/transactions/ImportCard"
import { UploadButton } from "@/app/(dashboard)/transactions/UploadButton"
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
    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsquery = useGetTransactions()
    const transactions = transactionsquery.data  ||[];
    const isdisabled = transactionsquery.isLoading || deleteTransactions.isPending ;

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
            <ImportCard data={importResults.data} onCancel={onCancelImoport} onSubmit={()=>{}}/>
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
                <div className="flex items-center gap-x-2">
                    <Button size="sm" onClick={newTransaction.onOpen}>
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