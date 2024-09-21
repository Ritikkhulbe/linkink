"use client";
import Popup from "@/components/Popup";
import Image from "next/image";
import "@/app/globals.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
export default function Page() {

  const { data: session } = useSession();

  const [user, setuser] = useState({
    name: "sahil",
    email: "trendingvideosbonds007@gmail.com",
    image: "/buyer-image.jpg",
    productList: [],
    role: "user",
  });
  const product = {
    image: "/buyer-image.jpg",
    name: "a new tshirt",
    link: "https://ezsell.vercel.app",
  };
  const proddata = useRef(null);
  const [visible, setvisible] = useState(false);
  const details = (products: any) => {
    proddata.current = products;
    setvisible(true);
  };

  const [productList, setproductList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: productList } = await axios.post("/api/user/getproducts", { email : session?.user?.email}); 
      return productList;
    }

    fetchData().then((productList) => {
      setproductList(productList);
    });

  }, [session]);


  return (
    <>
      <Fragment>
        <div className="container grid grid-cols-12 pt-[100px] ">
          <div className=" rounded col-span-12 min-h-[200px] grid grid-cols-12">
            <div className=" col-span-12 sm:col-span-2 flex items-center justify-center ">
              <div className="basis-1/2 sm:basis-full  m-2 ">
                <Image
                  src={session?.user?.image || "/defaultUser.jpg"}
                  alt={"User profile image"}
                  layout="responsive"
                  height={200}
                  width={200}
                  className="object-cover rounded-[20px]"
                />
              </div>
            </div>

            <div className="col-span-12 sm:col-span-3 flex items-end bg-teal-00 m-2">
              {session?.user?.name}
              <br />
              {session?.user?.email}
            </div>
          </div>
          <div className="border-2 rounded  col-span-12 grid griid-cols-12 flex-wrap mt-[50px]">
            <div className="col-span-12 flex justify-center items-center m-2">
              <div className="text-2xl">products</div>
            </div>
            <div className="col-span-12 bg-teal-00 flex justify-center items-center flex-wrap">
              {/*put this div below in map function*/}

              {/* COMPONENTS MESE BHI POPUP LE LENA        !!!!!!!!!!*/}

              <div
                className="rounded m-2 w-[300px] h-[400px]  hover:scale-[1.05] duration-100 aaa2 hover:aaa1"
                onClick={() => details(product)}
              >
                <div className="w-[100%] h-[90%]  ">
                  <Image
                    src={product.image}
                    height={100}
                    width={100}
                    layout="responsive"
                    className="object-cover rounded-[20px]"
                    alt="unable to load"
                  />
                </div>
                <div className="w-[100%] h-[10%]  flex justify-center items-center ">
                  {product.name}
                </div>
              </div>

              {/*put this div above in map function*/}
            </div>
          </div>
        </div>
        <Popup
          isvisible={visible}
          onclose={() => setvisible(false)}
          data={proddata.current}
        />
      </Fragment>
    </>
  );
}
