'use client';

import Image from 'next/image';

const MenuBlock = () => {
  return (
    <div id="menu-block" className="bg-[#1C1C1C] h-screen relative">
      {/* Top Image */}
      <div className="absolute top-12 left-0 w-full">
        <Image
          src="/menu/texts.webp"
          alt="Menu texts"
          width={1920}
          height={300}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Menu Title */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2">
        <h2 className="text-white text-7xl md:text-8xl font-bold">
          OUR MENU
        </h2>
      </div>

      {/* Middle Section with Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-7xl h-[700px] rounded-[48px] overflow-hidden"
        style={{
          background: 'linear-gradient(112.65deg, #F06002 53.4%, #1C1C1C 53.41%)'
        }}
      >
        {/* Order Now Button */}
        <div className="absolute bottom-12 left-12">
          <button 
            className="bg-[#1E1E1E] text-white px-12 py-4 text-2xl rounded-full
                     transform transition-transform hover:scale-105
                     border-2 border-white hover:bg-white hover:text-[#F06002] font-bold"
          >
            ORDER NOW
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Content will go here */}
      </div>
    </div>
  );
};

export default MenuBlock; 