"use client";
import {  ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export const Providers = ({children}: {children: ReactNode}) => {
    return (
    <>
        <SessionProvider>
            <Toaster 
                position="bottom-right"
                reverseOrder={false}                
            />
            {children}
        </SessionProvider>
    </>
    )
}