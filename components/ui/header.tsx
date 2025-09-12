import { HeaderLogo } from "@/components/ui/header-logo";
import { Navigation } from "@/components/ui/navigation";
import { ClerkRequest } from "@clerk/backend/internal";
import { UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { ClerkLoaded,ClerkLoading } from "@clerk/nextjs";   
import { WelcomeMsg } from "@/components/ui/welcome-msg";
import { Filters } from "../filters";

export const Header = ()=>{
    return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-10 lg:px-14">
  <div className="max-w-screen-2xl mx-auto flex flex-col gap-y-10">
    
    {/* Row 1: Logo + Navigation + User Button */}
    <div className="flex items-center justify-between">
      <div className="flex items-center lg:gap-x-16">
        <HeaderLogo />
        <Navigation />
      </div>

      <div className="flex items-center gap-x-4">
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="size-8 animate-spin text-slate-400" />
        </ClerkLoading>
      </div>
    </div>

    
    <WelcomeMsg />
    <Filters />
  </div>
</header>

    )
}