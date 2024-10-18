"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';


const Page = () => {
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

    }, [params.id, setLink]);


    useEffect(() => {
      if(link){
        console.log("link is ",link);
        const formattedLink = link.startsWith('http') ? link : `http://${link}`;
        window.location.assign(formattedLink);
      }
    }, [link])
    


  return (
    <>
    <div className="flex justify-center items-center h-[70vh] flex-col">
        <div className="loader"></div>
        <br />
        <div>Loading...</div>
    </div>
    </>
  )
}

export default Page