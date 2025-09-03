"use client" ;

import { Card , CardContent , CardHeader , CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import { useNewAccount } from "@/features/hooks/use-new-accounts";
import { DataTable } from "@/components/ui/data-table";

// to be removed later because i'm just experimienting with mock data for the sake of testing the front end 
import  { columns}  from "./columns"
import { useGetAccounts } from "@/features/accounts/api/user-get-accounts";

import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete";


const AccountPage = () => {


    const newAccount = useNewAccount();
    const deleteAccounts = useBulkDeleteAccounts();
    const accountsquery = useGetAccounts();
    const accounts = accountsquery.data  ||[];
    const isdisabled = accountsquery.isLoading || deleteAccounts.isPending ;
    if (accountsquery.isLoading)
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
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 mb-24 ">
            <Card className=" border-none drop-shadow-sm">
            <CardHeader className=" gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1" >
                    Accounts page
                </CardTitle>
                <Button size="sm" onClick={newAccount.onOpen}>
                    Add new 
                </Button>
     
            </CardHeader>
            <CardContent>
                <DataTable filterKey="email" columns={columns} data={accounts} onDelete={(row)=>{
                    const  ids = row.map((r)=> r.original.id);
                    deleteAccounts.mutate({ids});
                }}  disabled={isdisabled}/>
            </CardContent>
            </Card>
            
        </div>
    );

};

export default AccountPage ;