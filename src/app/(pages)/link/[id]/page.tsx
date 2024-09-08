"use client";

import useLink from "@/hooks/useLink";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';


const page = () => {
    const params = useParams();
    const [link, setLink] = useState("")


    useEffect(() => { 
      const fetchLink = async () => {
        const data = await getLink();
        setLink(data.link);
      };
    
      const getLink = async () => {
        const res = await axios.post('/api/link', { qrlink: params.id });
        const resData = res.data;
        return resData;
      };
    
      fetchLink();

    }, []);


    useEffect(() => {
      if(link!==""){
        const formattedLink = link.startsWith('http') ? link : `http://${link}`;
        window.location.assign(formattedLink);
      }
    }, [link])
    


  return (
    <>
    {params.id}<br />
    </>
  )
}

export default page