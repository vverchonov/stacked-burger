'use client';

import Image from 'next/image';

const WelcomeBlock = () => {
  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const menuBlock = document.getElementById('menu-block');
    if (menuBlock) {
      menuBlock.scrollIntoView({ behavior: 'smooth' });
    }
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
      <div className="absolute hidden sm:flex inset-0 flex-col items-center justify-end pb-24">
        <div className="text-center">
          {/* Hungry Button */}
          <a href="#menu-block" onClick={scrollToMenu}>
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
          </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBlock;
