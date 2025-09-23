type RecipeCardProps = {
  recipe: {
    recipeName: string;
    servings: number;
    ingredients: string;
    instructions: string;
    servingSuggestion: string;
  };
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold mb-2 text-orange-500">{recipe.recipeName}</h2>
      <p className="text-gray-700 mb-2"><strong>Rende:</strong> {recipe.servings} unidades</p>
      
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-1">Ingredientes:</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{recipe.ingredients}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-1">Instruções:</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{recipe.instructions}</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-1">Sugestão de servir:</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{recipe.servingSuggestion}</p>
      </div>
    </div>
  );
}
