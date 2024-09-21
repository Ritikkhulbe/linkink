import Image from "next/image";
import { useRef, useState } from "react";
import axios from "axios";
import "@/app/globals.css";
export default function Popup({
  isvisible,
  onclose,
  data,
}: {
  isvisible: boolean;
  onclose: () => void;
  data: { image: string; link: string };
}) {
  if (!isvisible) return null;
  let url = useRef<HTMLInputElement>(null);
  const [wait, setwait] = useState<boolean>(false);

  const send = async () => {
    console.log(url.current?.value);

    setwait(true);
    if (url.current?.value) {
      try {
        const response = await axios.post(
          "/urlhere",
          { new_url: url.current },
          { withCredentials: true }
        );
        if (response.data.success) {
          onclose();
        } else {
          alert("try again later");
        }
      } catch {
        alert("try again later");
      }
    } else {
      alert("field is empty");
    }

    setwait(false);
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center  ">
        <div className="w-[400px] flex flex-col m-2">
          <button
            className="text-white text-xl place-self-end"
            onClick={() => onclose()}
            disabled={wait}
          >
            X
          </button>
          <div className="container rounded-lg h-[500px] aaa2">
            <div className="  text-black  ">
              <div className="h-[400px] flex justify-center items-center">
                <div className="w-[100%] h-[100%] p-4 rounded-lg ">
                  <Image
                    src={data.image}
                    alt={"unabke to load"}
                    height={100}
                    width={100}
                    layout="responsive"
                    className="object-cover "
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[100px] grid  ">
              <p className="h-[30px] ">Change Your Redirect Url:</p>
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  ref={url}
                  placeholder={` ${data.link}`}
                  className="text-black placeholder:text-black w-[80%] h-[50px] m-1 rounded-lg placeholder:ms-2"
                />

                <button
                  className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none m-1"
                  disabled={wait}
                  onClick={() => send()}
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
                    {wait ? "Processing" : "submit"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
