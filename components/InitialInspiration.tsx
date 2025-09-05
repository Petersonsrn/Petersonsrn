import React from 'react';
import { BreakfastIcon } from './icons/BreakfastIcon';
import { LunchIcon } from './icons/LunchIcon';
import { DinnerIcon } from './icons/DinnerIcon';
import { DessertIcon } from './icons/DessertIcon';

const categories = [
  { name: 'Café da Manhã', icon: BreakfastIcon, color: 'bg-blue-200', hover: 'hover:bg-blue-300' },
  { name: 'Almoço', icon: LunchIcon, color: 'bg-green-200', hover: 'hover:bg-green-300' },
  { name: 'Jantar', icon: DinnerIcon, color: 'bg-purple-200', hover: 'hover:bg-purple-300' },
  { name: 'Sobremesas', icon: DessertIcon, color: 'bg-pink-200', hover: 'hover:bg-pink-300' },
];

export const InitialInspiration: React.FC = () => {
  return (
    <div className="my-16 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4 font-display">Procurando inspiração?</h2>
      <p className="text-lg text-gray-600 mb-12">Comece por uma categoria ou simplesmente digite seus ingredientes acima.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 ${category.color} ${category.hover}`}
          >
            <category.icon className="h-16 w-16 mb-4 text-gray-700" />
            <span className="text-xl font-semibold text-gray-800">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
