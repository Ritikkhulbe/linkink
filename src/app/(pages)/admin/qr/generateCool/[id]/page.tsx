"use client";

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useQRCode } from 'next-qrcode';

const Page = () => {
  const { Canvas } = useQRCode();
  const params = useParams();

  return (
    <div className="flex flex-col justify-center items-center">
      <Canvas 
        text={`https://linkink.in/link/${params.id}`}
        options={{
          errorCorrectionLevel: 'H',  // High error correction for scannability
          margin: 0,                  // No margin for a more compact QR
          scale: 6,                   // Larger scale for better scannability
          width: 400,                 // Fixed width
          color: {
            dark: '#000000',          // Initial color will be overwritten by the gradient
            light: '#ffffff',         // Light background for contrast
          },
        }}
      />
      <p>{`https://linkink.in/link/${params.id}`}</p>
    </div>
  );
};

export default Page;
