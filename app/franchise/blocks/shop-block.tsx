'use client';

import Image from 'next/image';

const ShopBlock = () => {
  return (
    <div className="bg-[#F06002] py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left Side - Image */}
          <div className="md:w-1/2">
            <div className="relative w-full">
              <Image
                src="/franchise/shop.webp"
                alt="Shop Illustration"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Right Side - Text */}
          <div className="md:w-1/2">
            <p className="text-white text-2xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
              do eiusmod tempor incididunt Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit, sed do eiusmod tempor incididunt 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
              do eiusmod tempor incididunt Lorem ipsum dolor sit amet, 
              consectetur adipiscing elit, sed do eiusmod tempor 
              incididunLorem ipsum dolor sit amet, consectetur adipiscing 
              elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit 
              amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunLorem ipsum dolor sit amet, consectetur adipiscing 
              elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit 
              amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididun
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBlock; 