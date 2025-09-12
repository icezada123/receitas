import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe-from-prompt';
import { Separator } from './ui/separator';
import { Utensils, Users, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

interface RecipeCardProps {
  recipe: GenerateRecipeOutput;
}

const parseList = (text: string) => {
    return text.split('\n').map(item => item.trim().replace(/^-|^\*|^\d+\.\s*/, '')).filter(Boolean);
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [showUnlock, setShowUnlock] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
        setShowUnlock(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [])


  const ingredientsList = parseList(recipe.ingredients).slice(0, 4);
  const instructionsList = parseList(recipe.instructions).slice(0, 3);

  return (
    <div className="w-full text-foreground relative">
        <div className={showUnlock ? 'blur-sm' : ''}>
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
                         <li>... e mais</li>
                    </ul>
                </div>

                <Separator />
                
                <div>
                    <h3 className="font-semibold mb-2">Instruções</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                        {instructionsList.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                        <li>... e mais</li>
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

        {showUnlock && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg p-4 text-center">
                <Lock className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">Libere a receita completa!</h3>
                <p className="text-muted-foreground mb-4">
                    Assine agora por apenas <span className="font-bold text-primary">R$ 1,99</span> e tenha acesso a esta e milhares de outras receitas ilimitadas.
                </p>
                <Button>Quero acesso ilimitado</Button>
            </div>
        )}
    </div>
  );
}
