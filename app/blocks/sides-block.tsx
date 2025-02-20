'use client';

import { useState } from 'react';
import DishItem from '../components/dish-item';
import Modal from '../components/modal';

const sides = [
  {
    id: 1,
    title: 'Tater Cheese Bombs',
    description: '',
    price: '7',
    imageUrl: '/sides/Layer2.webp'
  },
  {
    id: 2,
    title: 'Halloumi Poutine',
    description: '',
    price: '8 S / 12 L',
    imageUrl: '/sides/Layer3.webp'
  },
  {
    id: 3,
    title: 'Grilled Halloumi Cheese',
    description: '',
    price: '8',
    imageUrl: '/sides/Layer4.webp'
  },
  {
    id: 4,
    title: 'Jalapeno Poppers',
    description: '',
    price: '7',
    imageUrl: '/sides/Layer5.webp'
  },
  {
    id: 5,
    title: 'Mozzza Sticks',
    description: '',
    price: '7',
    imageUrl: '/sides/Layer6.webp'
  },
  {
    id: 6,
    title: 'Crinkle Cut Fries',
    description: '',
    price: '5 S / 8 L',
    imageUrl: '/sides/Layer8.webp'
  },
  {
    id: 7,
    title: 'Onion Rings',
    description: '',
    price: '5 S / 8 L',
    imageUrl: '/sides/Layer7.webp'
  },
  {
    id: 8,
    title: 'Fries',
    description: '',
    price: '4 S / 7 L',
    imageUrl: '/sides/Layer9.webp'
  },
  {
    id: 9,
    title: 'Chocolate milkshake',
    description: '',
    price: '7',
    imageUrl: '/sides/1.webp'
  },
  {
    id: 10,
    title: 'Strawberry milkshake',
    description: '',
    price: '7',
    imageUrl: '/sides/strawberry.webp'
  },
  {
    id: 11,
    title: 'Vanilla milkshake',
    description: '',
    price: '7',
    imageUrl: '/sides/vanilla.webp'
  },
  {
    id: 12,
    title: 'Chocolate Peanut Butter milkshake',
    description: '',
    price: '7',
    imageUrl: '/sides/Chocolate_peanut_butter.webp'
  }
];

const SidesBlock = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#1C1C1C] pt-12">
      {/* Title - Fixed position */}
      <div className="container mx-auto px-4 mb-[-10px]">
        <h2 className="text-white font-arial-black text-xl sm:text-2xl md:text-3xl font-bold text-right">
          SIDES, DRINKS, BITES, DESSERTS ...
        </h2>
      </div>

      {/* Scrollable Container with background */}
      <div className="bg-[#FFFFFF0A] py-12">
        <div className="overflow-x-auto">
          <div className="flex flex-row gap-12 px-4 min-w-max">
            {sides.map((side) => (
              <div key={side.id} className="flex-none w-[600px] first:ml-0">
                <DishItem
                  {...side}
                  onOrder={() => setIsModalOpen(true)}
                />
              </div>
            ))}
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

export default SidesBlock; 