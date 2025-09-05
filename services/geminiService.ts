import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "Um título criativo e chamativo para a receita."
    },
    description: {
      type: Type.STRING,
      description: "Uma breve descrição da receita, com 2-3 frases, que seja apetitosa."
    },
    prepTime: {
      type: Type.STRING,
      description: "O tempo total de preparo em minutos (ex: '30 minutos')."
    },
    servings: {
        type: Type.STRING,
        description: "Quantas porções a receita rende (ex: '4 porções')."
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "Um ingrediente da lista (ex: '2 xícaras de farinha de trigo')."
      }
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "Um passo do modo de preparo, bem detalhado e simples de seguir."
      }
    },
    tips: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "Uma dica extra, sugestão de variação ou substituição de ingrediente."
      }
    }
  },
  required: ["title", "description", "prepTime", "servings", "ingredients", "instructions", "tips"]
};


export const generateRecipe = async (ingredients: string, time: string): Promise<Recipe> => {
  try {
    const timeConstraint = time !== 'any' ? `em no máximo ${time} minutos` : 'sem restrição de tempo';

    const prompt = `
      Crie uma receita deliciosa e fácil de fazer usando os seguintes ingredientes: ${ingredients}.
      A receita deve ser completada ${timeConstraint}.
      A receita precisa ser simples, com um passo a passo claro, ideal para cozinheiros iniciantes.
      Inclua dicas úteis, como sugestões para substituir ingredientes, se possível.
      Gere a resposta em português do Brasil.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.8,
      },
    });

    const text = response.text.trim();
    const recipeData = JSON.parse(text);

    // Add a placeholder image URL
    const recipeWithImage: Recipe = {
        ...recipeData,
        imageUrl: `https://picsum.photos/seed/${recipeData.title.replace(/\s/g, '')}/1024/768`
    };

    return recipeWithImage;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Não foi possível gerar a receita. Tente novamente com outros ingredientes.");
  }
};
