'use server';

import { generateRecipe } from '@/ai/flows/generate-recipe-from-prompt';
import { createPayment } from '@/ai/flows/create-payment';
import { checkPaymentStatus as checkPaymentStatusFlow } from '@/ai/flows/check-payment-status';
import { sendToDiscord as sendToDiscordFlow } from '@/ai/flows/send-to-discord';
import type { Message } from '@/lib/types';
import { parseCookies } from 'nookies';

const FREE_RECIPE_LIMIT = 2;


function extractNumber(text: string): number | null {
  const match = text.match(/\d+([.,]\d+)?/);
  if (!match) return null;
  return parseFloat(match[0].replace(',', '.'));
}
export const getUser = async (token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/auth/validate`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include'
        }
      )

      if (!response.ok) {
        return null;
      }
      return response.json();
    } catch (error) {
      
    }
}; 


function constructPrompt(message: string): string {
  if (!message || !message.trim()) {
    throw new Error('A mensagem não pode ser vazia.');
  }

  return `
Você é um chef mundial e também conversa de forma amigável com o usuário.

- Se o usuário enviar algo irrelevante, casual ou apenas cumprimentos (como "oi", "olá", "bom dia"), responda de forma natural e amigável, sem gerar uma receita, e incentive a continuar a conversa sobre comida.
- Se o usuário enviar um pedido de receita ou prato, gere uma receita detalhada incluindo:
  - Nome criativo do prato
  - Número de porções (se não for especificado, pode sugerir um número padrão)
  - Lista completa de ingredientes com quantidades
  - Passo a passo claro para o preparo
  - Sugestões de como servir e aproveitar melhor a receita
- Sempre responda em português e de forma organizada.

Usuário: "${message}"
`;
}

export async function processUserMessage(
  history: Message[]
): Promise<{ recipe?: any; response?: string; error?: string }> {
  try {
    const lastUserMessage = history.findLast(msg => msg.role === 'user');
    if (!lastUserMessage) {
      return { error: 'Nenhuma mensagem do usuário encontrada.' };
    }


    const recipeCount = history.filter(msg => msg.role === 'assistant' && msg.recipe).length;
    if (recipeCount >= FREE_RECIPE_LIMIT) {
      return {
        response: 'Para continuar conversando e ter acesso ilimitado às receitas, assine o plano completo por apenas R$ 4,99!'
      };
    }

    const prompt = constructPrompt(lastUserMessage.content);
    const aiResponse = await generateRecipe({ prompt });

    if (aiResponse) {
      return { response: aiResponse.textResponse };
    } else {
      return { recipe: aiResponse };
    }

  } catch (error: any) {
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

