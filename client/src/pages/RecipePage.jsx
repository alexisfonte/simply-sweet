import {
  ArrowLeftIcon,
  HeartIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RecipePage() {
  const [recipe, setRecipe] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipeByUser, setRecipeByUser] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuth();

  useEffect(() => {
    fetch(`/recipes/${id}`)
      .then((resp) => resp.json())
      .then((recipe) => {
        setRecipe(recipe);
        if (authUser && recipe.author.id === authUser.id) {
          setRecipeByUser(true);
        }
        setIsLoaded(true);
      });
  }, [id, authUser]);

  const { title, image_url, author, directions, ingredients, favorites } =
    recipe;

  if (!isLoaded) return <h2>Loading...</h2>;

  return (
    <div className="lg:my-12">
      <div className="sm:flex">
        <div className="">
          <Link to="/" className="flex items-center">
            <ArrowLeftIcon className="h-4 w-4 text-[#ff642f] stroke-2" />
            <span className="ml-1 font-medium text-sm hover:text-[#ff642f]">
              All Recipes
            </span>
          </Link>
          <h2 className="py-3 mb-0 text-6xl font-bold font-serif">{title}</h2>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="my-2 mr-4 flex items-center">
          <Link to={`/users/${author.id}`} className="flex items-center group">
            <div className="rounded-full overflow-hidden w-8 h-8">
              <img
                src={author.avatar_url}
                alt={author.username}
                className="object-cover object-center"
              />
            </div>
            <span className="pl-1 text-xs group-hover:text-[#ff642f]">
              {author.username}
            </span>
          </Link>
        </div>
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <HeartIcon className="h-6 w-6" />
            <span>{favorites}</span>
          </div>
          {recipeByUser && (
            <button className="group" onClick={() => navigate("edit")}>
              <PencilSquareIcon className="h-6 w-6 group-hover:text-[#ff642f]" />
            </button>
          )}
        </div>
      </div>
      <div className="">
        <hr className="my-5" />
        <div className="rounded-xl overflow-hidden relative aspect-h-2 aspect-w-4">
          <img
            src={image_url}
            alt={title}
            className="w-full max-w-full object-cover object-center"
          />
        </div>
        <br />
        <div className="flex flex-wrap -mx-3 mt-8">
          <div className="md:flex md:w-1/2 max-w-full px-3">
            <div className="">
              <h3 className="text-3xl font-bold font-serif">Ingredients</h3>
              <ul className="pb-2 list-inside list-disc">
                {ingredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="text-lg mt-4 pl-4"
                  >{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:flex md:w-1/2 max-w-full px-3">
            <div>
              <h3 className="text-3xl font-bold font-serif">Directions</h3>
              <ul className="list-none pt-4 mb-4">
                {directions.map((dir) => (
                  <li className="pl-10 pr-7 relative mb-6 text-lg text-left">
                    <span className="items-center flex flex-col h-6 w-6 justify-center absolute left-0 top-0.5 text-white bg-[#ff642f] rounded-full">
                      {dir.ordinal + 1}
                    </span>
                    {dir.direction}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RecipePage;
