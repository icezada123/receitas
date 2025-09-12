import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe-from-prompt';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recipe?: GenerateRecipeOutput;
  isError?: boolean;
};
