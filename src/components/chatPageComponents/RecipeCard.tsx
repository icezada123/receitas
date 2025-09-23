import type { GenerateRecipeOutput } from "@/ai/flows/generate-recipe-from-prompt";
import { Separator } from "../ui/separator";
import { Utensils, Users } from "lucide-react";

interface RecipeCardProps {
  recipe: {
    recipeName: string;
    servings: number;
    ingredients: string;
    instructions: string;
    servingSuggestion: string;
  };
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="w-full text-foreground p-6 rounded-xl border border-gray-200 shadow-md">
      <h2 className="text-xl font-bold font-headline mb-2 text-orange-500">
        {recipe.recipeName}
      </h2>

      {recipe.servings > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Users className="w-4 h-4 text-orange-400" />
          <span>
            Rende {recipe.servings} {recipe.servings > 1 ? "porções" : "porção"}
          </span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Ingredientes</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {recipe.ingredients}
          </p>
        </div>

        <Separator className="bg-gray-200" />

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Instruções</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {recipe.instructions}
          </p>
        </div>

        {recipe.servingSuggestion && (
          <>
            <Separator className="bg-gray-200" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Sugestão de Serviço
              </h3>
              <p className="text-sm flex items-start gap-2 text-gray-700">
                <Utensils className="w-4 h-4 mt-1 shrink-0 text-orange-400" />
                <span>{recipe.servingSuggestion}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
