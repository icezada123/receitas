'use server';

import { generateRecipe } from '@/ai/flows/generate-recipe-from-prompt';
import type { Message } from '@/lib/types';

function constructPrompt(history: Message[]): string {
  const userMessages = history
    .filter((msg) => msg.role === 'user')
    .map((msg) => msg.content);

  const lastAssistantMessage = history.findLast((msg) => msg.role === 'assistant' && msg.recipe);

  if (lastAssistantMessage && lastAssistantMessage.recipe) {
    const recipeContext = `The user was previously given a recipe for "${lastAssistantMessage.recipe.recipeName}".`;
    const refinementRequest = `Now, the user has the following request: "${userMessages[userMessages.length - 1]}".`;
    const instruction = `Please generate a new, complete recipe that incorporates this feedback.`;
    return `${recipeContext} ${refinementRequest} ${instruction}`;
  }

  return `The user wants a recipe. Here is the conversation so far, with the user's messages: ${userMessages.join(
    '; '
  )}. Based on this, generate a complete recipe. If you don't have enough information, generate a common version of the last requested dish. For example, if they just say "strogonoff", make a classic beef stroganoff recipe.`;
}

export async function processUserMessage(
  history: Message[]
): Promise<{ recipe?: any; error?: string }> {
  try {
    const prompt = constructPrompt(history);
    const recipe = await generateRecipe({ prompt });

    if (!recipe.recipeName || !recipe.ingredients || !recipe.instructions || !recipe.servings) {
      throw new Error('A resposta da IA não continha uma receita válida.');
    }

    return { recipe };
  } catch (error) {
    console.error('Error processing user message:', error);
    return {
      error: 'Desculpe, não consegui gerar uma receita. Por favor, tente novamente.',
    };
  }
}
