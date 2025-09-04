"use client"
import { useConfirm } from "@/hooks/use-confirm";
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger

} from "@/components/ui/dropdown-menu"
import { useOpenAccount } from "@/features/hooks/use-open-account"; 

import {
    Button
} from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
type Props = {
    id:string;
};
export const Actions = ( {id}: Props) =>
{   
    const [ConfirmDialog , confirm] = useConfirm(
        "Are you sure you ?", " you are going to delete this account "
    
    )
    const deleteMutation = useDeleteAccount(id) ;
    const{onOpen} = useOpenAccount();
    const handleDelete = async() => {
        const ok = await confirm();
    if (!ok) return;

    deleteMutation.mutate(); 


    }
    return(
        <>
        <ConfirmDialog/>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-ù p-0">
                    <MoreHorizontal  className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                disabled={deleteMutation.isPending}
                onClick={()=>onOpen(id)}>
                    <Edit className="size-4 mr-2"/>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                disabled={deleteMutation.isPending}
                onClick={handleDelete}>
                    <Trash className="size-4 mr-2"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
    
    
};