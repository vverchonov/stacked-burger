'use client';

import Image from 'next/image';

const WeAreBlock = () => {
  return (
    <div id="we-are-block" className="bg-white py-32 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start">
          {/* Left Content */}
          <div className="md:w-6/12 px-4 space-y-12 lg:px-32">
            <h2 className="text-[#F06002] font-arial-black text-8xl lg:text-[140px] font-bold leading-none">
              WE ARE
            </h2>
            
            <p className="text-[#F06002] text-2xl leading-relaxed">
            Voted Best Burger at Burger Fest 2024, Stacked Burger & Chicken is committed to delivering exceptional taste and quality. Our passion for crafting delicious smash burgers and chicken sandwiches has made us a favourite among food enthusiasts. 
            </p>

            {/* Stick Figure Illustration */}
            <div className="flex mt-16 w-full justify-center items-center">
              <Image
                src="/we-are/guys.png"
                alt="Team illustration"
                width={300}
                height={150}
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-6/12 mt-12 md:mt-0 relative md:-right-20 lg:-right-32">
            <div className="relative w-full aspect-square overflow-hidden rounded-l-full">
              <Image
                src="/we-are/team.png"
                alt="Our team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeAreBlock; 