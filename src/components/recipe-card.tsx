import type { GenerateRecipeOutput } from '@/ai/flows/generate-recipe-from-prompt';
import { Separator } from './ui/separator';
import { Utensils, Users, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: GenerateRecipeOutput;
}

const truncateTextByWords = (text: string, wordLimit: number) => {
    if (!text) return { preview: '', isTruncated: false };
    const words = text.split(/\s+/);
    if (words.length <= wordLimit) {
        return { preview: text, isTruncated: false };
    }
    const preview = words.slice(0, wordLimit).join(' ');
    return { preview: `${preview}...`, isTruncated: true };
};

const scrollToMainCta = () => {
    const ctaElement = document.getElementById('main-cta');
    if (ctaElement) {
        ctaElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [showUnlock, setShowUnlock] = useState(false);

  const ingredientsPreview = truncateTextByWords(recipe.ingredients, 15);
  const instructionsPreview = truncateTextByWords(recipe.instructions, 15);

  const handleShowUnlock = () => setShowUnlock(true);

  return (
    <div className="w-full text-foreground relative">
        <div className={cn({ 'blur-sm': showUnlock })}>
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
                    <p className="text-sm whitespace-pre-wrap">{ingredientsPreview.preview}</p>
                    {ingredientsPreview.isTruncated && (
                         <Button variant="link" size="sm" className="p-0 h-auto text-destructive" onClick={handleShowUnlock}>
                           Ver mais...
                         </Button>
                    )}
                </div>

                <Separator />
                
                <div>
                    <h3 className="font-semibold mb-2">Instruções</h3>
                    <p className="text-sm whitespace-pre-wrap">{instructionsPreview.preview}</p>
                    {instructionsPreview.isTruncated && (
                        <Button variant="link" size="sm" className="p-0 h-auto text-destructive" onClick={handleShowUnlock}>
                           Ver mais...
                        </Button>
                    )}
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
                <Button onClick={scrollToMainCta}>Quero acesso ilimitado</Button>
            </div>
        )}
    </div>
  );
}
