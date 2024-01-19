

import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import RecipeForm from "../components/RecipeForm";

export default function EditRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    author: { id: "", username: "", avatar_url: "" },
    is_private: false,
    ingredients: [],
    directions: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipeByUser, setRecipeByUser] = useState(false);

  const { id } = useParams();
  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/recipes/${id}`)
      .then((resp) => resp.json())
      .then((recipe) => {
        if (authUser && recipe.author.id === authUser.id) {
          setRecipeByUser(true);
        }
        setFormData({
          title: recipe.title,
          author: recipe.author,
          image_url: recipe.image_url,
          is_private: recipe.is_private,
          ingredients: recipe.ingredients,
          directions: recipe.directions,
        });
        setIsLoaded(true);
      });
  }, [id, authUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipe = {
        title: formData.title,
        image_url: formData.image_url,
        is_private: formData.is_private,
        ingredients_attributes: formData.ingredients,
        directions_attributes: formData.directions
    }

    fetch(`/recipes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      }).then((res) => {
        if (res.ok) {
          res.json().then(() => {
            navigate(`/recipes/${id}`);
          });
        } else {
          res.json().then((json) => console.log(json.errors));
        }
      });
  }

  function handleDelete(){
    fetch(`/recipes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.ok) {
            navigate(`/`);
        } else {
          res.json().then((json) => console.log(json.errors));
        }
      });
  }

  if (!isLoaded) return <h2>Loading...</h2>;
  return (
    <div className="lg:my-0 space-y-4">
      <RecipeForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} recipeByUser={recipeByUser}/>
        <button onClick={handleDelete} className="mt-2 flex w-full justify-center items-center py-3 text-base px-6 rounded-lg text-white mx-auto bg-red-400 font-bold tracking-wider">Delete</button>
    </div>
  );
}
