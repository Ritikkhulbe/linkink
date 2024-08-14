"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/router";


const Navbar = () => {
    const session = useSession();
    console.log(session.data?.user);
  return (
    <div className="border-b border-purple-500 py-2 px-10 flex justify-between items-center dark:bg-black dark:text-white">
        <div className="w-[15vw] flex justify-center items-center font-mono font-normal text-4xl bg-gradient-to-br from-purple-600 to-blue-500 logo-text hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-800 hover:text-5xl transition-all cursor-pointer">
            Linkink
        </div>
        <div>
            <ul className="navlinks flex justify-between w-[25vw]">
                <li>Shop Now</li>
                <li>Link</li>
                <li>Origin</li>
                <li>Contact Us</li>
            </ul>
        </div>
        <div className="pt-2">
            {session.data?.user ? <><PrimaryButton onClick={() => {signOut(); console.log(session.data)}}>Username </PrimaryButton></> : <><PrimaryButton onClick={()=>signIn("google")}>Login</PrimaryButton></>}
        </div>
    </div>
  )
}

export default Navbar;