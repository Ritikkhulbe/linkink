"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const Page = () => {
    const { data: session, status } = useSession();
    console.log(session);
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push("/api/auth/signin");
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

  return (
    <div>this is a user route</div>
  )
}

export default Page