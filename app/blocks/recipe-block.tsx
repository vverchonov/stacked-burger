'use client';

import Image from 'next/image';

const RecipeBlock = () => {
  return (
    <div className="relative bg-[#F06002] py-12">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/orange.webp"
          alt="Orange background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content with relative positioning */}
      <div className="relative">
        {/* First Row */}
        <div className="flex flex-col md:flex-row">
          {/* Text Section - 2/3 */}
          <div className="w-full md:w-2/3 p-4 py-12 md:p-24">
            <div className="max-w-3xl">
              <h2 className="text-white font-arial-black text-3xl md:text-6xl font-bold mb-8">
                RECIPE
                <span className="text-black font-arial-black">&</span>
                TRADITIONS
              </h2>
              <p className="text-white text-xl leading-relaxed">
              Our culinary philosophy blends time-honoured traditions with innovative recipes. We take pride in using fresh, locally sourced ingredients to create dishes that honour classic flavours while introducing unique twists. From our signature stacked sauce to our carefully crafted burger combinations, every element is designed to delight your taste buds.
              </p>
            </div>
          </div>
          
          {/* Image Section - 1/3 */}
          {/* <div className="w-full md:w-1/3 bg-white flex md:rounded-l-full items-end justify-center p-12"> */}
            <Image
              src="/recipe/stick_1.webp"
              alt="Chef illustration"
              width={300}
              height={300}
              className="w-auto h-auto object-contain md:w-1/3"
            />
          {/* </div> */}
        </div>

        {/* Second Row */}
        <div className="flex flex-col-reverse md:flex-row">
          {/* Image Section - 1/3 */}
          {/* <div className="w-full md:w-1/3 bg-white md:rounded-r-full flex items-end justify-center p-12 order-2 md:order-1"> */}
            <Image
              src="/recipe/stick_2.webp"
              alt="Chef cooking illustration"
              width={300}
              height={300}
              className="w-auto h-auto object-contain md:w-1/3"
            />
          {/* </div> */}

          {/* Text Section - 2/3 */}
          <div className="w-full md:w-2/3 p-4 py-12 md:p-24 order-1 md:order-2">
            <div className="max-w-3xl ml-auto text-left md:text-right">
              <h2 className="text-white text-3xl md:text-6xl font-arial-black font-bold mb-8">
                SECRET
                <span className="text-black">STACKED</span>
                SAUCE
              </h2>
              <p className="text-white text-xl leading-relaxed">
              Our secret stacked sauce is the cornerstone of our flavour profile. A harmonious blend of savoury and tangy notes, it perfectly complements our burgers and chicken sandwiches, adding an extra layer of deliciousness that keeps our customers coming back for more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeBlock; 