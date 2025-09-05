import React from 'react';
import { PotIcon } from './icons/PotIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-amber-600">
          <PotIcon className="h-8 w-8 md:h-10 md:w-10" />
          <span className="font-display">Receita na Hora</span>
        </a>
        <nav className="hidden md:flex items-center space-x-6 text-lg">
          <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">Home</a>
          <a href="#generator-section" className="text-gray-600 hover:text-amber-600 transition-colors">Gerar Receita</a>
          <a href="#favorites-section" className="text-gray-600 hover:text-amber-600 transition-colors">Favoritos</a>
        </nav>
      </div>
    </header>
  );
};
