'use client';

import Marquee from 'react-fast-marquee';
import DishItem from '../components/dish-item';
import { useState } from 'react';
import Modal from '../components/modal';

const dishes = [
  {
    id: 1,
    title: 'Tater Cheese Bombs',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,t',
    price: '$7',
    imageUrl: '/sides/Layer2.webp'
  },
  {
    id: 2,
    title: 'Halloumi Poutine',
    description: '',
    price: '$8 S / $12 L',
    imageUrl: '/sides/Layer3.webp'
  },
  {
    id: 3,
    title: 'Grilled Halloumi Cheese',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,t',
    price: '$8',
    imageUrl: '/sides/Layer4.webp'
  },
  {
    id: 4,
    title: 'Jalapeno Poppers',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,t',
    price: '$7',
    imageUrl: '/sides/Layer5.webp'
  },
  {
    id: 5,
    title: 'Mozzza Sticks',
    description: '',
    price: '$7',
    imageUrl: '/sides/Layer6.webp'
  },
  {
    id: 6,
    title: 'Crinkle Cut Fries',
    description: '',
    price: '$5 S / $8 L',
    imageUrl: '/sides/Layer8.webp'
  },
  {
    id: 7,
    title: 'Onion Rings',
    description: '',
    price: '$5 S / $8 L',
    imageUrl: '/sides/Layer7.webp'
  },
  {
    id: 8,
    title: 'Fries',
    description: '',
    price: '$4 S / $7 L',
    imageUrl: '/sides/Layer9.webp'
  },
  {
    id: 9,
    title: 'Chocolate milkshake',
    description: '',
    price: '$7',
    imageUrl: '/sides/1.webp'
  },
  {
    id: 10,
    title: 'Strawberry milkshake',
    description: '',
    price: '$7',
    imageUrl: '/sides/strawberry.webp'
  },
  {
    id: 11,
    title: 'Vanilla milkshake',
    description: '',
    price: '$7',
    imageUrl: '/sides/vanilla.webp'
  },
  {
    id: 12,
    title: 'Chocolate Peanut Butter milkshake',
    description: '',
    price: '$7',
    imageUrl: '/sides/Chocolate_peanut_butter.webp'
  }
];

const DishesBlock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <DishItem 
                key={dish.id} 
                {...dish} 
                onOrder={() => setIsModalOpen(true)} 
              />
            ))}
          </div>
        </Marquee>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default DishesBlock; 