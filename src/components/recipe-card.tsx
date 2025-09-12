import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe-from-prompt';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Separator } from './ui/separator';
import { Utensils, Users } from 'lucide-react';

interface RecipeCardProps {
  recipe: GenerateRecipeOutput;
}

const parseList = (text: string) => {
    return text.split('\n').map(item => item.trim().replace(/^-|^\*|^\d+\.\s*/, '')).filter(Boolean);
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const ingredientsList = parseList(recipe.ingredients);
  const instructionsList = parseList(recipe.instructions);

  return (
    <div className="w-full text-foreground">
        <h2 className="text-xl font-bold font-headline mb-2">{recipe.recipeName}</h2>
        
        {recipe.servings > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Users className="w-4 h-4" />
            <span>Serve {recipe.servings} {recipe.servings > 1 ? 'pessoas' : 'pessoa'}</span>
          </div>
        )}

        <div className="space-y-4">
            <div>
                <h3 className="font-semibold mb-2">Ingredientes</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    {ingredientsList.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <Separator />
            
            <div>
                <h3 className="font-semibold mb-2">Instruções</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                    {instructionsList.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </div>
            
            {recipe.servingSuggestion && (
                 <>
                    <Separator />
                    <div>
                        <h3 className="font-semibold mb-2">Sugestão de Serviço</h3>
                        <p className="text-sm flex items-start gap-2">
                            <Utensils className="w-4 h-4 mt-1 shrink-0 text-primary" />
                           <span>{recipe.servingSuggestion}</span>
                        </p>
                    </div>
                 </>
            )}
        </div>
    </div>
  );
}
