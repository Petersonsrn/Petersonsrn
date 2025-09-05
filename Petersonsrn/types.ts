export interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  imageUrl: string;
  userImageUrl?: string;
}