import RecipeCard from "./RecipeCard";

function RecipeContainer({ recipes }) {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mb-12">
        {recipes.map(recipe => (
            <RecipeCard key={recipe.id}recipe={recipe}/>
        ))}
    </div>
  );
}
export default RecipeContainer;
