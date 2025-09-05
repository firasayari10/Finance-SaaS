"use client" ;

import { Card , CardContent , CardHeader , CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import { useNewCategory } from "@/features/categories/hooks/use-new-cactegory";
import { DataTable } from "@/components/ui/data-table";

// to be removed later because i'm just experimienting with mock data for the sake of testing the front end 
import  { columns}  from "./columns"
import { useGetCategories } from "@/features/categories/api/user-get-categories";

import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";


const CategoriesPage = () => {


    const newCategory = useNewCategory();
    const deleteCategories = useBulkDeleteCategories();
    const categoriesquery = useGetCategories();
    const categories = categoriesquery.data  ||[];
    const isdisabled = categoriesquery.isLoading || deleteCategories.isPending ;
    if (categoriesquery.isLoading)
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
                    Categories page
                </CardTitle>
                <Button size="sm" onClick={newCategory.onOpen}>
                    Add new 
                </Button>
     
            </CardHeader>
            <CardContent>
                <DataTable filterKey="name" columns={columns} data={categories} onDelete={(row)=>{
                    const  ids = row.map((r)=> r.original.id);
                    deleteCategories.mutate({ids});
                }}  disabled={isdisabled}/>
            </CardContent>
            </Card>
            
        </div>
    );

};

export default CategoriesPage ;