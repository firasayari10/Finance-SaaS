import {
    Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle
} from "@/components/ui/sheet"
import { Short_Stack } from "next/font/google"



export const NewAccountSheet = () => {

return (
<Sheet open >
    <SheetContent 
    className="space-y-4" >

        <SheetHeader>
            <SheetTitle>
                New account
            </SheetTitle>
            <SheetDescription >
                create a new account to tracvk your transactions 
            </SheetDescription>
        </SheetHeader>
    </SheetContent>
</Sheet>
);
};