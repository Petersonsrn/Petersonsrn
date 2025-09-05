import React, { useRef } from 'react';
import { Recipe } from '../types';
import { ClockIcon } from './icons/ClockIcon';
import { ServingsIcon } from './icons/ServingsIcon';
import { StarIcon } from './icons/StarIcon';
import { PrintIcon } from './icons/PrintIcon';
import { CameraIcon } from './icons/CameraIcon';
import { ImagePlaceholder } from './ImagePlaceholder';
import { Tooltip } from './Tooltip';

interface RecipeDisplayProps {
  recipe: Recipe;
  onClose: () => void;
  onAddToFavorites: (recipe: Recipe) => void;
  onRemoveFromFavorites: (recipeTitle: string) => void;
  isFavorite: boolean;
  onUpdateImage: (recipeTitle: string, imageUrl: string) => void;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  recipe,
  onClose,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavorite,
  onUpdateImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateImage(recipe.title, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto p-4 print:p-0 print:bg-white print:static">
      <article className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 relative animate-fade-in-up print:shadow-none print:my-0">
        
        {/* Header */}
        <header className="p-6 md:p-8 border-b border-gray-200 flex justify-between items-start print:hidden">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-800 font-display">{recipe.title}</h1>
            <p className="mt-2 text-gray-600">{recipe.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Main Content */}
        <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image & Meta */}
                <div className="flex flex-col gap-6">
                    <div className="relative group aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-md">
                        {recipe.userImageUrl || recipe.imageUrl ? (
                             <img src={recipe.userImageUrl || recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
                        ) : (
                            <ImagePlaceholder className="w-full h-full" />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center print:hidden">
                             <button
                                onClick={triggerImageUpload}
                                className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100"
                            >
                                <CameraIcon className="h-5 w-5"/>
                                Alterar Foto
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>
                    <div className="flex justify-around items-center bg-amber-50 p-4 rounded-xl text-center">
                        <div className="flex flex-col items-center gap-1 text-amber-800">
                            <ClockIcon className="h-7 w-7"/>
                            <span className="font-bold text-lg">{recipe.prepTime}</span>
                            <span className="text-sm text-gray-600">Preparo</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-amber-800">
                            <ServingsIcon className="h-7 w-7"/>
                            <span className="font-bold text-lg">{recipe.servings}</span>
                            <span className="text-sm text-gray-600">Porções</span>
                        </div>
                    </div>
                </div>

                {/* Ingredients */}
                <div className="bg-amber-50 p-6 rounded-xl">
                    <h2 className="text-2xl font-bold text-amber-800 font-display mb-4">Ingredientes</h2>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Instructions & Tips */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-amber-800 font-display mb-4">Modo de Preparo</h2>
                <ol className="space-y-4 text-gray-700 list-decimal list-inside">
                    {recipe.instructions.map((step, index) => (
                        <li key={index} className="pl-2">
                           <span className="font-semibold">Passo {index + 1}:</span> {step}
                        </li>
                    ))}
                </ol>
            </div>

            {recipe.tips && recipe.tips.length > 0 && (
                <div className="mt-8 bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400">
                    <h2 className="text-2xl font-bold text-blue-800 font-display mb-4">Dicas do Chef</h2>
                    <ul className="space-y-2 list-disc list-inside text-blue-700">
                        {recipe.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <footer className="p-6 md:p-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
            <Tooltip tip={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}>
                <button
                    onClick={() => isFavorite ? onRemoveFromFavorites(recipe.title) : onAddToFavorites(recipe)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                        isFavorite
                        ? 'bg-amber-400 text-white hover:bg-amber-500'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    <StarIcon className={`h-6 w-6 ${isFavorite ? 'text-white' : 'text-gray-400'}`} />
                    {isFavorite ? 'Favoritado' : 'Adicionar aos Favoritos'}
                </button>
            </Tooltip>
            <Tooltip tip="Imprimir ou salvar como PDF">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-gray-700 text-white hover:bg-gray-800 transition-colors"
                >
                    <PrintIcon className="h-6 w-6" />
                    Imprimir Receita
                </button>
            </Tooltip>
        </footer>
      </article>
    </div>
  );
};