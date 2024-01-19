import RecipeContainer from "../components/RecipeContainer"
import { useRecipe } from "../contexts/RecipeContext";

function Home() {
  const { recipes } = useRecipe();

  return (
    <div>
        <RecipeContainer recipes={recipes}/>
    </div>
  )
}
export default Home