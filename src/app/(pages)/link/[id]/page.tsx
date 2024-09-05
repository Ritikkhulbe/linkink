"use client";

import useLink from "@/hooks/useLink";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const page = () => {
    const params = useParams();
    const [array,setArray] = useState([{hello: "null",hey:"hey"}]);

    const link = useLink(params.id);

    useEffect(() => { 
      
      fetch("/api/helloworld")
        .then((res) => res.json())
        .then((data) => setArray(data))
        .catch((err) => console.error(err));


    }, []);

    useEffect(()=>{
      console.log(array)
    },[array])


  return (
    <>
    {params.id}<br />
    {array.map(temp => (<>
      Hello {temp.hello}
    </>))}</>
  )
}

export default page