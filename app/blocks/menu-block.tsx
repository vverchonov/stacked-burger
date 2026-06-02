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
    title: 'QUAD STACK',
    description: 'Pickles, red onions, stacked sauce, 4 patties',
    price: 18,
    comboPrice: 23,
    imageUrl: '/menu/burgers/quad_stack.webp'
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
  // {
  //   id: 8,
  //   title: 'CALIFORNIA',
  //   description: 'Avocado, tomato, cheddar, bacon, lettuce, stacked sauce',
  //   price: 19,
  //   comboPrice: 19,
  //   imageUrl: '/menu/burgers/california_chicken.webp'
  // },
  {
    id: 9,
    title: 'BACON JALAPENO',
    description: 'Jalapeno, bacon, cheddar, stacked sauce',
    price: 14,
    comboPrice: 19,
    imageUrl: '/menu/burgers/bacon_jalapeno.webp'
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
    title: 'KOREAN BBQ CHICKEN',
    description: 'Pickles, coleslaw, Korean BBQ glaze, crispy chicken',
    price: 14,
    comboPrice: 19,
    imageUrl: '/menu/burgers/korean_bbq_chicken.webp'
  },
  // {
  //   id: 14,
  //   title: 'CHEDDAR JALAPENO CHICKEN',
  //   description: 'Cheddar, jalapeno, mayo',
  //   price: 13,
  //   comboPrice: 18,
  //   imageUrl: '/menu/burgers/chedar_halapeno.webp'
  // },
  {
    id: 15,
    title: 'JUMBO TENDIES',
    description: 'Crispy chicken tenders',
    price: 9,
    comboPrice: 9,
    imageUrl: '/sides/jumbo_tendies.webp'
  }
];

const MenuBlock = () => {
  const loopedProducts = [products[products.length - 1], ...products, products[0]];
  const [currentProduct, setCurrentProduct] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [fromProduct, setFromProduct] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
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
        prevProduct(true);
      } else {
        // Swipe left - show next
        nextProduct(true);
      }
    }

    // Reset gesture points so each swipe only triggers once.
    touchStartX.current = 0;
    touchEndX.current = 0;
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

  const nextProduct = (pauseAutoPlay: boolean) => {
    if (isSliding) return;

    if (pauseAutoPlay) {
      setAutoPlay(false);
      setupAutoPlayResume();
    }
    setFromProduct(currentProduct);
    setIsSliding(true);
    setCurrentProduct((prev) => prev + 1);
  };

  const prevProduct = (pauseAutoPlay: boolean) => {
    if (isSliding) return;

    if (pauseAutoPlay) {
      setAutoPlay(false);
      setupAutoPlayResume();
    }
    setFromProduct(currentProduct);
    setIsSliding(true);
    setCurrentProduct((prev) => prev - 1);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (autoPlay) {
      intervalId = setInterval(() => {
        nextProduct(false);
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

  const handleTrackTransitionEnd = () => {
    if (currentProduct === 0) {
      setIsTransitionEnabled(false);
      setCurrentProduct(products.length);
      return;
    }

    if (currentProduct === loopedProducts.length - 1) {
      setIsTransitionEnabled(false);
      setCurrentProduct(1);
      return;
    }

    setIsSliding(false);
    setFromProduct(null);
  };

  useEffect(() => {
    if (!isTransitionEnabled) {
      const frame = requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
        setIsSliding(false);
        setFromProduct(null);
      });

      return () => cancelAnimationFrame(frame);
    }
  }, [isTransitionEnabled]);

  const isSlideVisible = (index: number) => {
    if (!isSliding || fromProduct === null) {
      return index === currentProduct;
    }

    return index === fromProduct || index === currentProduct;
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
        <h2
          id="our-menu"
          className="text-white text-right mb-[-10px] md:mb-[-30px] font-arial-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold scroll-mt-24"
        >
          OUR MENU
        </h2>
      </div>

      {/* Navigation Arrows - Moved outside */}
      <div className="relative w-full max-w-[1400px]">
        <button 
          onClick={() => prevProduct(true)}
          className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 text-white z-10"
        >
          <div className="flex items-center text-8xl font-bold hover:text-[#F06002] transition-colors">
            <span className="transform scale-y-150">«</span>
          </div>
        </button>
        <button 
          onClick={() => nextProduct(true)}
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
            onTouchCancel={handleTouchEnd}
          >
            {/* Product Carousel */}
            <div className="relative h-full w-full px-6 md:px-12 overflow-hidden">
              {/* Mobile Navigation Arrows */}
              <button
                onClick={() => prevProduct(true)}
                className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 text-white z-20 p-2 bg-black/20 rounded-full hover:bg-black/40"
              >
                <div className="flex items-center text-5xl font-bold hover:text-[#F06002] transition-colors">
                  <span className="transform scale-y-150">«</span>
                </div>
              </button>
              <button
                onClick={() => nextProduct(true)}
                className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 text-white z-20 p-2 bg-black/20 rounded-full hover:bg-black/40"
              >
                <div className="flex items-center text-5xl font-bold hover:text-[#F06002] transition-colors">
                  <span className="transform scale-y-150">»</span>
                </div>
              </button>

              <div
                className={`flex h-full ease-out ${isTransitionEnabled ? 'transition-transform duration-500' : ''}`}
                style={{
                  width: `${loopedProducts.length * 100}%`,
                  transform: `translateX(-${currentProduct * (100 / loopedProducts.length)}%)`,
                }}
                onTransitionEnd={handleTrackTransitionEnd}
              >
                {loopedProducts.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className={`h-full min-w-0 shrink-0 overflow-hidden ${
                      isSlideVisible(index) ? 'visible' : 'invisible'
                    }`}
                    style={{ width: `${100 / loopedProducts.length}%` }}
                  >
                    {/* Product Content Container */}
                    <div className="flex flex-col lg:flex-row h-full">
                      {/* Left Side - Product Info */}
                      <div className="w-full lg:w-5/12 lg:order-1 flex flex-col px-4 lg:px-0">
                        <div className="flex-1 flex flex-col lg:mt-24 h-full overflow-hidden">
                          <h3 className="text-white text-4xl font-arial-black sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6">
                            {product.title}
                          </h3>
                          <p className="text-white lg:ps-16 text-lg lg:mt-16 sm:text-xl lg:text-2xl xl:text-3xl max-w-lg mb-4 lg:mb-8">
                            {product.description}
                          </p>
                        </div>
                    </div>

                      {/* Product Image */}
                      <div className="w-full lg:w-7/12 lg:order-2 flex items-center justify-center mb-0 lg:mb-0">
                        <div className="relative w-full">
                          <div className="relative w-full aspect-square rounded-[32px] lg:rounded-[48px]">
                            <Image
                              src={product.imageUrl}
                              alt={product.title}
                              fill
                              priority
                              loading="eager"
                              className="object-contain bg-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Now Button */}
            {/* Order Now Button - stop touch propagation so carousel swipe doesn't steal taps on mobile */}
            <div className="relative lg:absolute bottom-0 lg:bottom-6 left-0 lg:left-12 w-full lg:w-auto px-6 lg:px-0 pb-6 lg:pb-0 mt-0">
              <button 
                onClick={() => setIsModalOpen(true)}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                className="w-full lg:w-auto font-bold bg-white text-[#1E1E1E] px-8 lg:px-16 py-4 lg:py-6 text-2xl lg:text-3xl rounded-full
                         border-2 border-white transition-transform duration-300 hover:scale-105 touch-manipulation"
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