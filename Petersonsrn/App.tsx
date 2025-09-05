import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RecipeGenerator } from './components/RecipeGenerator';
import { RecipeDisplay } from './components/RecipeDisplay';
import { Favorites } from './components/Favorites';
import { Footer } from './components/Footer';
import { Recipe } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LoadingState } from './components/LoadingState';
import { InitialInspiration } from './components/InitialInspiration';

const App: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useLocalStorage<Recipe[]>('favoriteRecipes', []);

  const handleRecipeGenerated = (recipe: Recipe | null, errorMessage?: string) => {
    if (recipe) {
      setGeneratedRecipe(recipe);
      setError(null);
    }
    if (errorMessage) {
      setError(errorMessage);
      setGeneratedRecipe(null);
    }
    setIsGenerating(false);
  };

  const handleCloseRecipe = () => {
    setGeneratedRecipe(null);
  };

  const isRecipeFavorite = (recipeTitle: string) => {
    return favorites.some(fav => fav.title === recipeTitle);
  };

  const handleAddToFavorites = (recipe: Recipe) => {
    if (!isRecipeFavorite(recipe.title)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const handleRemoveFromFavorites = (recipeTitle: string) => {
    setFavorites(favorites.filter(fav => fav.title !== recipeTitle));
  };
  
  const handleSelectFavorite = (recipe: Recipe) => {
    setGeneratedRecipe(recipe);
  };

  const handleUpdateRecipeImage = (recipeTitle: string, imageUrl: string) => {
    // Update the currently displayed recipe
    if (generatedRecipe && generatedRecipe.title === recipeTitle) {
      setGeneratedRecipe({ ...generatedRecipe, userImageUrl: imageUrl });
    }

    // Update the recipe in favorites list
    setFavorites(favorites.map(fav => 
      fav.title === recipeTitle ? { ...fav, userImageUrl: imageUrl } : fav
    ));
  };

  // Effect to clear error message after some time
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <RecipeGenerator 
          onRecipeGenerated={handleRecipeGenerated} 
          setIsGenerating={setIsGenerating}
          isGenerating={isGenerating} 
        />
        
        {error && (
            <div className="mt-8 max-w-4xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md" role="alert">
                <p className="font-bold">Oops!</p>
                <p>{error}</p>
            </div>
        )}

        {isGenerating ? (
          <div className="mt-12">
            <LoadingState />
          </div>
        ) : !generatedRecipe && (
          <InitialInspiration />
        )}
        
        {generatedRecipe && (
          <RecipeDisplay 
            recipe={generatedRecipe} 
            onClose={handleCloseRecipe}
            onAddToFavorites={handleAddToFavorites}
            onRemoveFromFavorites={handleRemoveFromFavorites}
            isFavorite={isRecipeFavorite(generatedRecipe.title)}
            onUpdateImage={handleUpdateRecipeImage}
          />
        )}
        
        <Favorites 
          favorites={favorites} 
          onSelectFavorite={handleSelectFavorite}
          onRemoveFavorite={handleRemoveFromFavorites}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;