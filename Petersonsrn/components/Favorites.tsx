import React from 'react';
import { Recipe } from '../types';
import { Tooltip } from './Tooltip';

interface FavoritesProps {
  favorites: Recipe[];
  onSelectFavorite: (recipe: Recipe) => void;
  onRemoveFavorite: (recipeTitle: string) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ favorites, onSelectFavorite, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return null;
  }
  
  const handleRemove = (e: React.MouseEvent, title: string) => {
    e.stopPropagation(); // Prevent onSelectFavorite from firing
    onRemoveFavorite(title);
  };

  return (
    <section id="favorites-section" className="mt-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-8 text-center font-display">Minhas Receitas Favoritas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((recipe) => (
            <div
              key={recipe.title}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
              onClick={() => onSelectFavorite(recipe)}
            >
              <div className="relative aspect-w-4 aspect-h-3">
                <img
                  src={recipe.userImageUrl || recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Tooltip tip="Remover dos Favoritos">
                  <button
                    onClick={(e) => handleRemove(e, recipe.title)}
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-red-500 rounded-full p-2 hover:bg-white transition-colors z-10 opacity-0 group-hover:opacity-100"
                    aria-label="Remover dos favoritos"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Tooltip>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 truncate">{recipe.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};