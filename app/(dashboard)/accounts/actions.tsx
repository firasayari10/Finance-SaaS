"use client"
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
import { MoreHorizontal, Edit } from "lucide-react";
type Props = {
    id:string;
};
export const Actions = ( {id}: Props) =>
{
    const{onOpen} = useOpenAccount();
    return(
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-ù p-0">
                    <MoreHorizontal  className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                disabled={false}
                onClick={()=>onOpen(id)}>
                    <Edit className="size-4 mr-2"/>
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
    
    
};