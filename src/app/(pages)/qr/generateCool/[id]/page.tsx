"use client";

import { useQRCode } from 'next-qrcode';
import { useParams } from 'next/navigation';
const Page = () => {
  const { Canvas } = useQRCode();
  const params = useParams();


  return (
    <div className='flex flex-col justify-center items-center'>
      <Canvas
          text={`linkink.in/link/${params.id}`}
          options={{
            type: 'image/jpeg',
            quality: 0.3,
            errorCorrectionLevel: 'M',
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: '#b5262a',
              light: '',
            },
          }}
        />
        <p>linkink.in/link/{params.id}</p>
      </div>
  );
};

export default Page;
