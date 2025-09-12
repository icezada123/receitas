'use server';
/**
 * @fileOverview Refines a recipe based on user feedback.
 *
 * - refineRecipeBasedOnFeedback - A function that refines a recipe based on user feedback.
 * - RefineRecipeBasedOnFeedbackInput - The input type for the refineRecipeBasedOnFeedback function.
 * - RefineRecipeBasedOnFeedbackOutput - The return type for the refineRecipeBasedOnFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineRecipeBasedOnFeedbackInputSchema = z.object({
  recipe: z.string().describe('The original recipe to be refined.'),
  feedback: z.string().describe('The user feedback on the recipe.'),
});
export type RefineRecipeBasedOnFeedbackInput = z.infer<
  typeof RefineRecipeBasedOnFeedbackInputSchema
>;

const RefineRecipeBasedOnFeedbackOutputSchema = z.object({
  refinedRecipe: z.string().describe('The refined recipe based on the feedback.'),
});
export type RefineRecipeBasedOnFeedbackOutput = z.infer<
  typeof RefineRecipeBasedOnFeedbackOutputSchema
>;

export async function refineRecipeBasedOnFeedback(
  input: RefineRecipeBasedOnFeedbackInput
): Promise<RefineRecipeBasedOnFeedbackOutput> {
  return refineRecipeBasedOnFeedbackFlow(input);
}

const refineRecipeBasedOnFeedbackPrompt = ai.definePrompt({
  name: 'refineRecipeBasedOnFeedbackPrompt',
  input: {schema: RefineRecipeBasedOnFeedbackInputSchema},
  output: {schema: RefineRecipeBasedOnFeedbackOutputSchema},
  prompt: `You are a recipe refinement expert. Please refine the given recipe based on the user feedback.

Original Recipe:
{{recipe}}

User Feedback:
{{feedback}}

Refined Recipe:`,
});

const refineRecipeBasedOnFeedbackFlow = ai.defineFlow(
  {
    name: 'refineRecipeBasedOnFeedbackFlow',
    inputSchema: RefineRecipeBasedOnFeedbackInputSchema,
    outputSchema: RefineRecipeBasedOnFeedbackOutputSchema,
  },
  async input => {
    const {output} = await refineRecipeBasedOnFeedbackPrompt(input);
    return output!;
  }
);
