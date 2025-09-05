import React, { useState } from 'react';
import { generateRecipe } from '../services/geminiService';
import { Recipe } from '../types';
import { LoadingSpinner } from './icons/LoadingSpinner';
import { Tooltip } from './Tooltip';

interface RecipeGeneratorProps {
  onRecipeGenerated: (recipe: Recipe | null, error?: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  isGenerating: boolean;
}

export const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({ onRecipeGenerated, setIsGenerating, isGenerating }) => {
  const [ingredients, setIngredients] = useState('');
  const [time, setTime] = useState('any');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      onRecipeGenerated(null, "Por favor, digite pelo menos um ingrediente.");
      return;
    }
    setIsGenerating(true);
    onRecipeGenerated(null); // Clear previous error/recipe
    try {
      const recipe = await generateRecipe(ingredients, time);
      onRecipeGenerated(recipe);
    } catch (error) {
        if (error instanceof Error) {
            onRecipeGenerated(null, error.message);
        } else {
            onRecipeGenerated(null, "Ocorreu um erro desconhecido.");
        }
    } finally {
      // setIsGenerating is handled in App.tsx
    }
  };

  return (
    <section id="generator-section" className="text-center py-12 md:py-20 bg-amber-100 rounded-3xl shadow-lg">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4 font-display">Receitas com o que você tem em casa!</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Digite os ingredientes que você tem na geladeira e deixe a mágica acontecer.</p>
        
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Ex: frango, tomate, arroz"
              className="w-full text-lg p-4 rounded-full border-4 bg-gray-900 text-white placeholder-amber-400 border-amber-400 focus:ring-4 focus:ring-red-400 focus:border-red-500 transition-all duration-300 font-semibold shadow-inner"
              disabled={isGenerating}
            />
            <Tooltip tip="Filtre pelo tempo máximo de preparo">
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full md:w-60 text-lg p-4 rounded-full border-4 bg-gray-900 text-white border-amber-400 focus:ring-4 focus:ring-red-400 focus:border-red-500 transition-all duration-300 appearance-none text-center font-semibold shadow-inner"
                disabled={isGenerating}
              >
                <option value="any">Qualquer tempo</option>
                <option value="15">Até 15 min</option>
                <option value="30">Até 30 min</option>
                <option value="60">Até 60 min</option>
              </select>
            </Tooltip>
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white font-bold text-xl py-4 px-12 rounded-full shadow-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:scale-100 flex items-center justify-center mx-auto"
            disabled={isGenerating}
          >
            {isGenerating ? (
                <>
                <LoadingSpinner className="h-6 w-6 mr-3"/>
                Gerando delícias...
                </>
            ) : (
                'Gerar Receita!'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};