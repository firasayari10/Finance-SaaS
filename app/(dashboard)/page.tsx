"use client";                                                  
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/user-get-accounts";
import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";
import { UserButton } from "@clerk/nextjs";
export default function Home() {

    const {onOpen} = useNewAccount();



    return (
      <div>
        <Button onClick={ onOpen}> add accounts </Button>
      </div>
    )
  //const {data: accounts , isLoading} = useGetAccounts();
/*

  if ( isLoading) {
    return (
      <div>
        Loading ....
      </div>
    )
  }
  return (
    <div>
    {accounts?.map((account)=>(
      <div key = {account.id} >{account.name}</div>
    ))} 
  
    </div>
  );*/
}
