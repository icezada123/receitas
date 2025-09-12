'use server';

import { generateRecipe } from '@/ai/flows/generate-recipe-from-prompt';
import type { Message } from '@/lib/types';

function extractNumber(text: string): number | null {
  const numbers = text.match(/\d+/);
  return numbers ? parseInt(numbers[0], 10) : null;
}

function constructPrompt(dish: string, servings: number | string): string {
    return `O usuário quer uma receita para "${dish}" que sirva ${servings} ${servings > 1 ? 'pessoas' : 'pessoa'}. Por favor, gere uma receita completa e detalhada baseada nesta informação.`;
}

export async function processUserMessage(
  history: Message[]
): Promise<{ recipe?: any; response?: string; error?: string }> {
  try {
    const lastUserMessage = history.findLast((msg) => msg.role === 'user');
    if (!lastUserMessage) {
        return { error: 'Nenhuma mensagem do usuário encontrada.' };
    }

    const lastAssistantMessage = history.findLast((msg) => msg.role === 'assistant');

    // State 2: User answered how many servings
    if (lastAssistantMessage?.content.includes('quantas pessoas')) {
        const servings = extractNumber(lastUserMessage.content);
        const dish = history.find(msg => msg.role === 'user' && msg.id !== lastUserMessage.id)?.content;

        if (servings && dish) {
            const prompt = constructPrompt(dish, servings);
            const recipe = await generateRecipe({ prompt });
            if (!recipe.recipeName || !recipe.ingredients || !recipe.instructions || !recipe.servings) {
                throw new Error('A resposta da IA não continha uma receita válida.');
            }
            return { recipe };
        } else {
           // If user did not provide a number, ask again.
           return { response: 'Por favor, me diga para quantas pessoas será a receita.' };
        }
    }

    // State 1: Initial user prompt for a recipe
    const servings = extractNumber(lastUserMessage.content);
    
    if (servings) {
        // Servings info is already in the first message
        const prompt = constructPrompt(lastUserMessage.content, servings);
        const recipe = await generateRecipe({ prompt });

        if (!recipe.recipeName || !recipe.ingredients || !recipe.instructions || !recipe.servings) {
            throw new Error('A resposta da IA não continha uma receita válida.');
        }
        return { recipe };

    } else {
        // Servings info is missing, ask the user.
        return { response: `Com certeza! Para quantas pessoas essa receita vai servir?` };
    }

  } catch (error) {
    console.error('Error processing user message:', error);
    return {
      error: 'Desculpe, não consegui processar sua solicitação. Por favor, tente novamente.',
    };
  }
}
