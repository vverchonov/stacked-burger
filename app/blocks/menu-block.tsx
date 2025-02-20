'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import PreloadImages from '../components/preload-images';
import Modal from '../components/modal';

const products = [
  {
    id: 1,
    title: 'SINGLE STACK',
    description: 'Pickles, red onions, stacked sauce, 1 patty',
    price: 9,
    comboPrice: 14,
    imageUrl: '/menu/burgers/single_stack.webp'
  },
  {
    id: 2,
    title: 'DOUBLE STACK',
    description: 'Pickles, red onions, stacked sauce, 2 patties',
    price: 11,
    comboPrice: 16,
    imageUrl: '/menu/burgers/double_stacked.webp'
  },
  {
    id: 3,
    title: 'TRIPLE STACK',
    description: 'Pickles, red onions, stacked sauce, 3 patties',
    price: 13,
    comboPrice: 18,
    imageUrl: '/menu/burgers/triple_st.webp'
  },
  {
    id: 4,
    title: 'BIG STACK',
    description: 'Pickles, white onions, lettuce, cheddar, middle bun, stacked sauce, 4 patties',
    price: 18,
    comboPrice: 23,
    imageUrl: '/menu/burgers/big_stack.webp'
  },
  {
    id: 5,
    title: 'OKLAHOMA',
    description: 'Grilled onion, bacon, pickles, cheddar, stacked sauce',
    price: 14,
    comboPrice: 19,
    imageUrl: '/menu/burgers/oklahoma_burger.webp'
  },
  {
    id: 6,
    title: 'EAST WEST',
    description: 'Pickles, red onions, grilled halloumi, bacon, stacked sauce',
    price: 14,
    comboPrice: 19,
    imageUrl: '/menu/burgers/east_west.webp'
  },
  {
    id: 7,
    title: 'CYPRUS',
    description: 'Grilled halloumi, grilled red onions, honey garlic',
    price: 13,
    comboPrice: 18,
    imageUrl: '/menu/burgers/cyprus_burger.webp'
  },
  {
    id: 8,
    title: 'CALIFORNIA',
    description: 'Avocado, tomato, cheddar, bacon, lettuce, stacked sauce',
    price: 19,
    comboPrice: 19,
    imageUrl: '/menu/burgers/california_chicken.webp'
  },
  {
    id: 9,
    title: 'CHEDDAR JALAPENO',
    description: 'Jalapeno, cheddar, bacon, stacked sauce',
    price: 14,
    comboPrice: 19,
    imageUrl: '/menu/burgers/chedar_halapeno.webp'
  },
  {
    id: 10,
    title: 'CRUNCHY STACK',
    description: 'Pickles, white onions, lettuce, cheddar, stacked sauce',
    price: 14,
    comboPrice: 19,
    imageUrl: '/menu/burgers/crispy_stacked.webp' /// ??? 
  },
  {
    id: 11,
    title: 'BUFFALO',
    description: 'Pickles, mayo',
    price: 12,
    comboPrice: 17,
    imageUrl: '/menu/burgers/buffalo_chicken.webp'
  },
  {
    id: 12,
    title: 'ORIGINAL CHICKEN',
    description: 'Pickles, mayo',
    price: 12,
    comboPrice: 17,
    imageUrl: '/menu/burgers/original_chicken.webp'
  },
  {
    id: 13,
    title: 'CALIFORNIA CHICKEN',
    description: 'Bacon, avocado, lettuce, tomato, mayo',
    price: 14,
    comboPrice: 19,
    imageUrl: '/menu/burgers/california_chicken.webp'
  },
  {
    id: 14,
    title: 'CHEDDAR JALAPENO CHICKEN',
    description: 'Cheddar, jalapeno, mayo',
    price: 13,
    comboPrice: 18,
    imageUrl: '/menu/burgers/chedar_halapeno.webp'
  }
];

const MenuBlock = () => {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [, setSlideDirection] = useState('next'); // 'next' or 'prev'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  // Handle touch end
  const handleTouchEnd = () => {
    const swipeThreshold = 50; // minimum distance for a swipe
    const swipeDistance = touchEndX.current - touchStartX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe right - show previous
        prevProduct();
      } else {
        // Swipe left - show next
        nextProduct();
      }
    }
  };

  // Clear the auto-play resume timeout
  const clearAutoPlayTimeout = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
  };

  // Set up a new timeout to resume auto-play
  const setupAutoPlayResume = () => {
    clearAutoPlayTimeout();
    autoPlayTimeoutRef.current = setTimeout(() => {
      setAutoPlay(true);
    }, 5000); // 5 seconds
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (autoPlay) {
      intervalId = setInterval(() => {
        setSlideDirection('next');
        setCurrentProduct((prev) => (prev + 1) % products.length);
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoPlay]);

  // Clean up the timeout when component unmounts
  useEffect(() => {
    return () => {
      clearAutoPlayTimeout();
    };
  }, []);

  const nextProduct = () => {
    setAutoPlay(false);
    setSlideDirection('next');
    setCurrentProduct((prev) => (prev + 1) % products.length);
    setupAutoPlayResume();
  };

  const prevProduct = () => {
    setAutoPlay(false);
    setSlideDirection('prev');
    setCurrentProduct((prev) => (prev - 1 + products.length) % products.length);
    setupAutoPlayResume();
  };

  return (
    <div id="menu-block" className="bg-[#1C1C1C] min-h-screen flex flex-col items-center relative py-12">
      <PreloadImages />
      {/* Top Image */}
      <div className="w-full">
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
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-white text-right mb-[-10px] md:mb-[-30px] font-arial-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold">
          OUR MENU
        </h2>
      </div>

      {/* Navigation Arrows - Moved outside */}
      <div className="relative w-full max-w-[1400px]">
        <button 
          onClick={prevProduct}
          className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 text-white z-10"
        >
          <div className="flex items-center text-8xl font-bold hover:text-[#F06002] transition-colors">
            <span className="transform scale-y-150">«</span>
          </div>
        </button>
        <button 
          onClick={nextProduct}
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 text-white z-10"
        >
          <div className="flex items-center text-8xl font-bold hover:text-[#F06002] transition-colors">
            <span className="transform scale-y-150">»</span>
          </div>
        </button>

        {/* Middle Section with Gradient */}
        <div className="relative w-[95%] md:w-[90%] max-w-7xl h-auto md:h-[700px] rounded-[32px] md:rounded-[48px] overflow-hidden mx-auto">
          <div
            className="w-full h-full py-8 md:py-0"
            style={{
              background: 'linear-gradient(112.65deg, #F06002 53.4%, #1C1C1C 53.41%)'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Product Carousel */}
            <div className="relative h-full w-full px-6 md:px-12 overflow-hidden">
              {/* Product Content Container */}
              <div className="flex flex-col lg:flex-row h-full">
                {/* Left Side - Product Info */}
                <div className="w-full lg:w-5/12 lg:order-1 flex flex-col px-4 lg:px-0">
                  <div className="flex-1 flex flex-col lg:mt-24 h-full overflow-hidden">
                    <div 
                      key={currentProduct}
                      className="animate-textFadeIn"
                    >
                      <h3 className="text-white text-4xl font-arial-black sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6">
                        {products[currentProduct].title}
                      </h3>
                      <p className="text-white lg:ps-16 text-lg lg:mt-16 sm:text-xl lg:text-2xl xl:text-3xl max-w-lg mb-4 lg:mb-8">
                        {products[currentProduct].description}
                      </p>
                      <p className="text-white lg:ps-16 font-arial-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4">
                        ${products[currentProduct].price}
                        <span className="text-xl sm:text-2xl font-arial-black lg:text-3xl xl:text-4xl ml-2 lg:ml-4">
                          (Combo ${products[currentProduct].comboPrice})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Image */}
                <div className="w-full lg:w-7/12 lg:order-2 flex items-center justify-center mb-0 lg:mb-0">
                  <div 
                    key={`img-${currentProduct}`}
                    className="relative w-full aspect-square rounded-[32px] lg:rounded-[48px] 
                              animate-textFadeIn"
                  >
                    <Image
                      src={products[currentProduct].imageUrl}
                      alt={products[currentProduct].title}
                      fill
                      priority
                      loading="eager"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Now Button */}
            <div className="relative lg:absolute bottom-0 lg:bottom-6 left-0 lg:left-12 w-full lg:w-auto px-6 lg:px-0 pb-6 lg:pb-0 mt-8 lg:mt-0">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full lg:w-auto font-bold bg-white text-[#1E1E1E] px-8 lg:px-16 py-4 lg:py-6 text-2xl lg:text-3xl rounded-full
                         border-2 border-white transition-transform duration-300 hover:scale-105"
              >
                ORDER NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MenuBlock; 