'use client';

import Image from 'next/image';

const InstagramBlock = () => {
  return (
    <div className="bg-[#1C1C1C] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Side - Square Image */}
          <div className="w-full md:w-2/3">
            <div className="max-w-[600px] mx-auto">
              <div className="aspect-square relative bg-[#1C1C1C] rounded-[48px] border-[13px] border-[#F06002] p-4"
                style={{
                  boxShadow: '0px 0px 36.9px 0px #00000066'
                }}
              >
                <Image
                  src="/instagram/ig.png"
                  alt="Instagram Feed"
                  fill
                  className="object-cover rounded-[32px]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Side - Text and QR */}
          <div className="w-full md:w-1/3 flex flex-col justify-center">
            <div className="space-y-4 mb-8 md:text-left text-center">
              <h2 className="text-5xl md:text-6xl font-bold">
                <span className="text-white">FOLLOW</span>
                <span className="text-[#F06002]">US</span>
              </h2>
              <h2 className="text-white text-5xl md:text-6xl font-bold">ON</h2>
              <h3 
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9747FF] to-[#FF3C8C] inline-block text-transparent bg-clip-text"
              >
                INSTAGRAM
              </h3>
            </div>
            
            {/* QR Code */}
            <div className="w-full max-w-[200px] mx-auto md:mx-0">
              <Image
                src="/instagram/qr_code.webp"
                alt="Instagram QR Code"
                width={200}
                height={200}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramBlock; 