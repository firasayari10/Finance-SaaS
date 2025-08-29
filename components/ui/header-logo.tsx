import Link from  "next/link";
import Image from "next/image";

export const HeaderLogo = () =>{
    return(

        <Link href={"/"} className="flex items-center gap-x-3">
        <div className="items-center hidden lg:flex">
            <Image src="/logo.svg" alt="logo" width={28} height={28}/>
            <p padding-left={8} className="text-white font-semibold text-lg">
                    FinanceSaaS
            </p>
         
            
        </div>
        </Link>
    );
};

