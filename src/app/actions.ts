'use server';

import { generateRecipe } from '@/ai/flows/generate-recipe-from-prompt';
import { createPayment } from '@/ai/flows/create-payment';
import { checkPaymentStatus as checkPaymentStatusFlow } from '@/ai/flows/check-payment-status';
import { sendToDiscord as sendToDiscordFlow } from '@/ai/flows/send-to-discord';
import type { Message } from '@/lib/types';

const FREE_RECIPE_LIMIT = 2;

function extractNumber(text: string): number | null {
  const match = text.match(/\d+([.,]\d+)?/);
  if (!match) return null;
  return parseFloat(match[0].replace(',', '.'));
}

function constructPrompt(dish: string, servings?: number | string): string {
  if (!dish || !dish.trim()) {
    throw new Error('O nome do prato não pode ser vazio.');
  }
  return `
Você é um chef mundial e também conversa de forma amigável com o usuário.

- Se o usuário enviar algo irrelevante, casual ou apenas cumprimentos (como "oi", "olá", "bom dia"), responda de forma natural e amigável, sem gerar uma receita, e incentive a continuar a conversa sobre comida.
- Se o usuário enviar um pedido de receita ou prato, gere uma receita detalhada incluindo:
  - Nome criativo do prato
  - Lista completa de ingredientes com quantidades
  - Passo a passo claro para o preparo
  - Sugestões de como servir e aproveitar melhor a receita
- Sempre responda em português e de forma organizada.

Usuário: "${dish}"
${servings ? `Porções: ${servings}` : ''}
`;
}

function isValidRecipe(recipe: any): recipe is { recipeName: string; ingredients: any; instructions: any; servings: number } {
  return (
    recipe &&
    typeof recipe.recipeName === 'string' &&
    Array.isArray(recipe.ingredients) &&
    Array.isArray(recipe.instructions) &&
    (typeof recipe.servings === 'number' || typeof recipe.servings === 'string')
  );
}

export async function processUserMessage(
  history: Message[]
): Promise<{ recipe?: any; response?: string; error?: string }> {
  try {
    const lastUserMessage = history.findLast(msg => msg.role === 'user');
    if (!lastUserMessage) return { error: 'Nenhuma mensagem do usuário encontrada.' };

    const recipeCount = history.filter(msg => msg.role === 'assistant' && msg.recipe).length;
    if (recipeCount >= FREE_RECIPE_LIMIT) {
      return {
        response: 'Para continuar conversando e ter acesso ilimitado às receitas, assine o plano completo por apenas R$ 4,99!'
      };
    }

    const lastAssistantMessage = history.findLast(msg => msg.role === 'assistant');
    const servingsFromMessage = extractNumber(lastUserMessage.content);

    let prompt: string;

    // State 2: usuário respondeu a pergunta de porções
    if (lastAssistantMessage?.awaitingServings && servingsFromMessage) {
      const dishMessage = history
        .filter(msg => msg.role === 'user' && msg.id !== lastUserMessage.id)
        .map(msg => msg.content)
        .join(' ');

      prompt = constructPrompt(dishMessage, servingsFromMessage);
    } else {
      prompt = constructPrompt(lastUserMessage.content, servingsFromMessage ?? undefined);
    }

    const recipe = await generateRecipe({ prompt });
    // if (!isValidRecipe(recipe)) {
    //   throw new Error('A resposta da IA não continha uma receita válida.');
    // }

    return { recipe };
  } catch (error) {
    console.error('Error processing user message:', error);
    return { error: 'Desculpe, não consegui processar sua solicitação. Por favor, tente novamente.' };
  }
}

export async function createPixPayment(): Promise<{ qr_code_base64: string; qr_code: string; transaction_id: string } | null> {
  try {
    const payment = await createPayment();
    if (!payment?.qr_code || !payment?.transaction_id) {
      console.error('Pagamento incompleto retornado pela API.');
      return null;
    }
    return payment;
  } catch (error) {
    console.error('Error creating PIX payment:', error);
    return null;
  }
}

export async function checkPaymentStatus(transactionId: string): Promise<string | null> {
  try {
    if (!transactionId) throw new Error('transactionId é obrigatório.');
    const statusResponse = await checkPaymentStatusFlow(transactionId);
    return statusResponse?.status ?? null;
  } catch (error) {
    console.error('Error checking PIX payment status:', error);
    return null;
  }
}

export async function sendToDiscord(message: string): Promise<void> {
  try {
    if (!message || !message.trim()) throw new Error('Mensagem para Discord é obrigatória.');
    await sendToDiscordFlow(message);
  } catch (error) {
    console.error('Error sending message to Discord:', error);
    throw new Error('Falha ao enviar mensagem para o Discord.');
  }
}
