'use client';

import Link from 'next/link';
import Image from 'next/image';

const WelcomeBlock = () => {
  return (
    <div className="relative h-[calc(100vh-5rem)] mt-[5rem] w-full overflow-hidden shadow-2xl">
      {/* Background Image */}
      <Image
        src="/welcome/background.webp"
        alt="Stacked Burger Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
        }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-24">
        <div className="text-center">
          {/* Hungry Button */}
          <Link href="/menu">
            <button 
              className="bg-[#1E1E1E] font-baloo text-white px-16 py-6 text-4xl rounded-full
                         transform transition-transform hover:scale-105
                         border-2 border-[#FF6B35] hover:bg-[#FF6B35] font-bold"
              style={{
                boxShadow: '0px 0px 17.6px 0px #F76302B5'
              }}
            >
              HUNGRY?
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBlock;
