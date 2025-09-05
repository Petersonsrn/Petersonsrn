import React from 'react';
import { PotIcon } from './icons/PotIcon';

interface ImagePlaceholderProps {
  className?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ className }) => {
  return (
    <div className={`flex flex-col items-center justify-center bg-amber-100 text-amber-500 rounded-lg ${className}`}>
      <PotIcon className="w-16 h-16" />
      <span className="mt-2 text-sm font-semibold">Imagem da Receita</span>
    </div>
  );
};
