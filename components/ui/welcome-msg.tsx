"use client";
import { useUser } from "@clerk/nextjs";        
export const WelcomeMsg= () => {

        const {user , isLoaded} = useUser();
        return (
            <div className=" text-left space-y-2 ">
                <h1 className="text-4xl font-bold text-white">
                    Welcome Back {isLoaded? "," : " "}{user?.firstName}
                </h1>
                 <p className="text-slate-200 text-lg">
                    This is your Financial Overview Report
                </p>
            </div>
        )


    ;
}

export default WelcomeMsg;