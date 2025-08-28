'use client'
import { Loader2 } from 'lucide-react'
import  Image  from 'next/image'
import { SignIn, useUser,ClerkLoaded,ClerkLoading} from '@clerk/nextjs'

export default function Home() {
  const { isSignedIn } = useUser()

  if (!isSignedIn) {
    return (<div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className='text-center space-y-4 pt-16 '>
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome back</h1>
          <p className="text-base text-[#7E8CA0]">
            Login or create account to get back to your dashboard 
          </p>

        </div>
        <ClerkLoaded>
        <div className='flex items-center justify-center  mt-8'><SignIn /></div>
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className='animate-spin text-muted-foreground'></Loader2>
        </ClerkLoading>
      </div>
      <div className='h-full bg-blue-600 hidden lg:flex  items-center justify-center'>
        <Image src="/logo.svg" alt="Logo" height={100} width={100} /> 
      </div>
    </div>
    
    
  )
  }

  return <div>Welcome!</div>
}