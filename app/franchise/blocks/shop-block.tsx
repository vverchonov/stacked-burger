'use client';

import Image from 'next/image';

const ShopBlock = () => {
  return (
    <div className="bg-[#F06002] py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left Side - Image */}
          <div className="hidden sm:block md:w-1/2">
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
            {/* Main Title */}
            <h2 className="text-white font-arial-black text-4xl md:text-5xl font-bold mb-6">
              Own a Stacked Burger & Chicken Franchise!
            </h2>

            {/* Subtitle */}
            <p className="text-white text-2xl mb-12">
              Bring Stacked Burger & Chicken to your community and be part of our growing success.
            </p>

            {/* Why Choose Us Section */}
            <div className="mb-12">
              <h3 className="text-white font-arial-black text-3xl font-bold mb-4">
                Why Choose Us?
              </h3>
              <ul className="text-white text-xl space-y-2">
                <li>• Proven brand with a loyal customer base</li>
                <li>• Full training provided, no restaurant experience needed</li>
                <li>• Ongoing support from setup to daily operations</li>
              </ul>
            </div>

            {/* Who We're Looking For Section */}
            <div>
              <h3 className="text-white font-arial-black text-3xl font-bold mb-4">
                Who We are Looking For:
              </h3>
              <ul className="text-white text-xl space-y-2">
                <li>• Entrepreneurs ready to own and operate their business</li>
                <li>• Strong leaders who thrive in a fast-paced environment</li>
                <li>• Individuals passionate about great food and customer service</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBlock; 