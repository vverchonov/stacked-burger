'use client';

import Marquee from 'react-fast-marquee';
import DishItem from '../components/dish-item';

const dishes = [
  {
    id: 1,
    title: 'CHICKEN BITES',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,t',
    price: 12.99,
    imageUrl: '/sides/Layer2.webp'
  },
  {
    id: 2,
    title: 'CHICKEN BITES',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,t',
    price: 12.99,
       imageUrl: '/sides/Layer3.webp'
  },
  {
    id: 3,
    title: 'CHICKEN BITES',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,t',
    price: 12.99,
    imageUrl: '/sides/Layer4.webp'
  },
  {
    id: 4,
    title: 'CHICKEN BITES',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,t',
    price: 12.99,
       imageUrl: '/sides/Layer5.webp'
  },
  {
    id: 5,
    title: 'CHICKEN BITES',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,t',
    price: 12.99,
       imageUrl: '/sides/Layer6.webp'
  },
  {
    id: 6,
    title: 'CHICKEN BITES',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,t',
    price: 12.99,
       imageUrl: '/sides/Layer7.webp'
  },
  {
    id: 7,
    title: 'CHICKEN BITES',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,t',
    price: 12.99,
       imageUrl: '/sides/Layer8.webp'
  },
  {
    id: 8,
    title: 'CHICKEN BITES',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,t',
    price: 12.99,
       imageUrl: '/sides/Layer9.webp'
  }
];

const DishesBlock = () => {
  return (
    <div className="bg-[#1C1C1C] py-12 overflow-hidden">
      <div className="">
        {/* Title */}
        <h2 className="text-white font-arial-black text-4xl font-bold text-right mb-[-5px]">
          SIDES, DRINKS, BITES, DESSERTS ...
        </h2>



          <Marquee className='flex w-full' autoFill direction='right' speed={100} pauseOnHover>
            <div className='ms-12 flex flex-row gap-12 py-12 bg-[#FFFFFF0A] w-full'>
            {dishes.map((dish) => (
              <DishItem key={dish.id} {...dish} onOrder={() => console.log(`Ordering ${dish.title}`)} />
            ))}
            </div>
           </Marquee>

      </div>
    </div>
  );
};

export default DishesBlock; 