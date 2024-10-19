"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const Page = () => {

  const { data: session } = useSession();
  const [qrToBeAdded, setQrToBeAdded] = useState<string>('');

  const HandleSubmit = async () => {
    const res = await axios.put('/api/user/addQR', {
      qrlink: qrToBeAdded,
      email: session?.user?.email,
    })
    console.log(res);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className="mt-4 text-2xl font-bold">Order ID or Given QR Link</h2>
      <br />
      <br />
    <div className='flex'>
      <Input 
        placeholder="Paste it here"
        onChange={(e) => setQrToBeAdded(e.target.value)}
        value={qrToBeAdded}      
      />
      <Button onClick={HandleSubmit}>Submit</Button>
    </div>
    </div>
  )
}

export default Page