'use client';

import Image from 'next/image';

const RenderBlock = () => {
  return (
    <div className="bg-white">
      {/* Title */}
      <div className="container mx-auto px-4 py-8 pt-16">
        <div className="text-center mb-2">
          <h2 className="text-black text-7xl font-bold mb-2">
            BECOME A PART OF
          </h2>
          <h2 className="text-[#F06002] text-7xl font-bold">
            STACKED FAMILY
          </h2>
        </div>
      </div>

      {/* Render Image */}
      <div className="w-full">
        <Image
          src="/franchise/render.webp"
          alt="Stacked Burger Restaurant Render"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
};

export default RenderBlock; 