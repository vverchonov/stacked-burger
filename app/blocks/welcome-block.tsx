'use client';

import Image from 'next/image';
import { useState } from 'react';
import Modal from '../components/modal';

const WelcomeBlock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHungryClick = () => {
    const ourMenu = document.getElementById('our-menu');
    if (ourMenu) {
      ourMenu.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="relative h-auto sm:h-[calc(100vh-5rem)] mt-[5rem] w-full overflow-hidden shadow-2xl">
      {/* Background Image */}
      <Image
        src="/welcome/background.webp"
        alt="Stacked Burger Background"
        width={1080}
        height={1920}
        priority
        className="w-full h-auto sm:hidden"
        quality={100}
      />
      
      <div className="hidden sm:block relative h-full w-full">
        <Image
          src="/welcome/background.webp"
          alt="Stacked Burger Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={100}
        />
      </div>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
        }}
      />

      {/* Content Overlay */}
      <div className="absolute flex inset-0 flex-col items-center justify-end pb-12 sm:pb-24">
        <div className="text-center px-4">
          <h1 className="font-arial-black font-bold text-white leading-none mb-6 sm:mb-10">
            <span className="text-3xl sm:text-5xl lg:text-6xl">SMASH. </span>
            <span className="text-5xl sm:text-7xl lg:text-[120px] text-[#F06002]">STACK.</span>
            <span className="text-3xl sm:text-5xl lg:text-6xl"> SERVE.</span>
          </h1>

          {/* Hungry Button */}
          <button
            type="button"
            onClick={handleHungryClick}
            className="hidden sm:inline-block bg-[#1E1E1E] font-baloo text-white px-16 py-6 text-4xl rounded-full
                       transform transition-transform hover:scale-105
                       border-2 border-[#FF6B35] hover:bg-[#FF6B35] font-bold"
            style={{
              boxShadow: '0px 0px 17.6px 0px #F76302B5',
            }}
          >
            HUNGRY?
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default WelcomeBlock;
