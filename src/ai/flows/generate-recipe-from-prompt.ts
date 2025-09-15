'use server';
/**
 * @fileOverview Generates a recipe from a user-provided prompt.
 *
 * - generateRecipe - A function that takes a prompt and returns a detailed recipe.
 * - GenerateRecipeInput - The input type for the generateRecipe function.
 * - GenerateRecipeOutput - The return type for the generateRecipe function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateRecipeInputSchema = z.object({
  prompt: z.string().describe('A description of the desired recipe.'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  servings: z.number().describe('The number of people the recipe serves.'),
  ingredients: z.string().describe('A list of ingredients for the recipe.'),
  instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
  servingSuggestion: z.string().optional().describe('Suggestion on how to serve the recipe'),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(input: GenerateRecipeInput): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const recipePrompt = ai.definePrompt({
  name: 'recipePrompt',
  input: { schema: GenerateRecipeInputSchema },
  output: { schema: GenerateRecipeOutputSchema },
  prompt: `
  Você é um chef mundial. Responda sempre em português.
Se o usuário enviar algo irrelevante (como "oi", "hello", etc.), responda de forma amigável pedindo mais informações sobre comida ou receitas.
Se o usuário enviar um pedido de receita, gere uma receita detalhada incluindo:
- Nome da receita
- Porções
- Ingredientes
- Passo a passo
- Sugestões de servir

Usuário: {{{prompt}}}`,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const { output } = await recipePrompt(input);
    return output!;
  }
);
