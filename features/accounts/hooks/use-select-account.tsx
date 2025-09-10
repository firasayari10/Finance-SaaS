import { JSX, useState , useRef} from "react"
import { Button} from "@/components/ui/button"
import { useGetAccounts } from "../api/user-get-accounts";
import { useCreateAccount } from "../api/user-create-account";
import  {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Select } from "@/components/select";


export const useSelectAacount = (): [()=>JSX.Element, ()=>Promise<unknown>] =>
{
    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name:string)=>  accountMutation.mutate ({
        name
    });
    const accountOptions = (accountQuery.data ?? []).map((account)=> ({
        label:account.name,
        value:account.id,
    }))
    const [promise ,setPromise ]=useState<{resolve : (value : string | undefined ) => void }| null>( null ) ;
    const selectValue = useRef<string | undefined>(undefined);

    const confirm =()  =>new Promise ((resolve , reject ) =>{
        setPromise({resolve });

    });
    const handleClose = () =>{
        setPromise(null);
    };
    const handleConfirm = () => 
    {
        promise?.resolve(selectValue.current);
        handleClose();
    };
    const handleCancel = () =>
    {
        promise?.resolve(undefined);
        handleClose();

    };
    const ConfirmationDialog = ( ) => 
    (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Select Account 
                    </DialogTitle>
                    <DialogDescription>pelase select an acount to continue  </DialogDescription>
                </DialogHeader>
                <Select
                
                placeholder="select an account"
                options={accountOptions }
                onCreate={onCreateAccount}
                onChange={(value) => selectValue.current = value}
                disabled={accountQuery.isLoading || accountMutation.isPending} />

                
                
                <DialogFooter>
                    <Button
                     onClick={handleCancel} 
                     variant ="outline">
                        cancel
                    </Button>
                    <Button
                     onClick={handleConfirm} 
                     >
                        confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
   

 return[ConfirmationDialog ,confirm] ;};