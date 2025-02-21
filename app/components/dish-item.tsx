'use client';

import Image from 'next/image';

interface DishItemProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  onOrder: () => void;
}

const DishItem = ({ title, price, imageUrl, onOrder }: DishItemProps) => {
  return (
    <div 
      className="flex bg-[#1E1E1E] rounded-[16px] sm:rounded-[32px] overflow-hidden w-full h-[150px] sm:h-[300px]"
      style={{
        boxShadow: '0px 0px 16.6px 0px #000000B0'
      }}
    >
      {/* Image Section */}
      <div className="relative w-1/2 h-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-1/2 p-4 sm:p-8 flex flex-col justify-between h-full">
        {/* Title and Description */}
        <div>
          <h3 className="text-[#F06002] font-arial-black text-lg sm:text-4xl font-bold mb-2 sm:mb-4 line-clamp-2">
            {title}
          </h3>
          <p className="text-white text-base sm:text-2xl font-bold">
            {price}
          </p>
        </div>
        {/* Price and Button */}
        <div>
          <button
            onClick={onOrder}
            className="bg-white text-black px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-bold
                     hover:bg-[#F06002] hover:text-white transition-colors duration-300
                     w-full"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishItem; 