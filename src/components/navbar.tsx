"use client";
/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { signIn, signOut, useSession } from "next-auth/react";

export function Navbar() {

  const { data: session}  = useSession();

  console.log(session);
  console.log(session?.user);

 return (

    <header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2 w-[20vw]" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Linkink</span>
      </Link>
      <div className="flex items-center gap-2 md:hidden">
        {session?.user ? (
          <><Button variant="outline" onClick={()=>signOut()}>{session?.user?.name}</Button></>
        ): (
        <Button onClick={()=>signIn('google')}>Log In</Button>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="md:hidden">
            <div className="grid gap-4 p-4">
              <Link href="#" className="font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                Link
              </Link>
              <Link href="#" className="font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                Origin
              </Link>
              <Link href="#" className="font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                Contact
              </Link>
              <div className="flex flex-col gap-2">
                <Button >Shop Now</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <nav className="hidden items-center justify-center gap-6 text-sm font-medium md:flex ">
      <Link
          href="#"
          className="relative before:absolute before:-bottom-1 before:h-[2px] before:w-0 before:bg-primary before:transition-all hover:before:w-full"
          prefetch={false}
        >
          Shop
        </Link>
        <Link
          href="#"
          className="relative before:absolute before:-bottom-1 before:h-[2px] before:w-0 before:bg-primary before:transition-all hover:before:w-full"
          prefetch={false}
        >
          Link
        </Link>
        <Link
          href="#"
          className="relative before:absolute before:-bottom-1 before:h-[2px] before:w-0 before:bg-primary before:transition-all hover:before:w-full"
          prefetch={false}
        >
          Origin
        </Link>
        <Link
          href="#"
          className="relative before:absolute before:-bottom-1 before:h-[2px] before:w-0 before:bg-primary before:transition-all hover:before:w-full"
          prefetch={false}
        >
          Contact
        </Link>
      </nav>
      <div className="hidden gap-2 md:flex w-[20vw] flex-row-reverse">
        {session?.user ? (
          <><Button variant="outline" onClick={()=>signOut()}>{session?.user?.name}</Button></>
        ): (
        <Button onClick={()=>signIn('google')}>Log In</Button>
        )}
      </div>
    </header>
  )
}

function MenuIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
