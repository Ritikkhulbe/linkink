"use client";

import useLink from "@/hooks/useLink";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const page = () => {
    const params = useParams();
    const [array,setArray] = useState([{hello: "null"}]);

    const link = useLink(params.id);

    useEffect(() => { 
      
      fetch("/api/helloworld")
        .then((res) => res.json())
        .then((data) => setArray(data))
        .catch((err) => console.error(err));


    }, []);

    useEffect(()=>{
      
    },[array])


  return (
    {array.map((item:any) => (
      <div key={item.hello}>{item.hello}</div>
    ))
    }
  )
}

export default page