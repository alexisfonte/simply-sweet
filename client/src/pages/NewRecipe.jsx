import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import RecipeForm from "../components/RecipeForm";

function NewRecipe() {
  const { authUser } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    author: { id: "", username: "", avatar_url: "" },
    user_id: "",
    is_private: false,
    ingredients: [{amount: "", unit: "", name: "", ordinal: 0}],
    directions: [{direction: "", ordinal: 0}],
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [recipeByUser, setRecipeByUser] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      setFormData((prev) => ({
        ...prev,
        author: {
          id: authUser.id,
          username: authUser.username,
          avatar_url: authUser.avatar.image_url,
        },
        user_id: authUser.id,
      }));
    }
    setIsLoaded(true);
  }, [authUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipe = {
      user_id: formData.user_id,
      title: formData.title,
      image_url: formData.image_url,
      is_private: formData.is_private,
      ingredients_attributes: formData.ingredients,
      directions_attributes: formData.directions,
    };

    fetch(`/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      }).then((res) => {
        if (res.ok) {
          res.json().then((recipe) => {
            navigate(`/recipes/${recipe.id}`);
          });
        } else {
          res.json().then((json) => console.log(json.errors));
        }
      });
  };

  if (!isLoaded) return <h2>Loading...</h2>;
  return (
    <div className="lg:my-0 space-y-4">
      <RecipeForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        recipeByUser={recipeByUser}
      />
    </div>
  );
}
export default NewRecipe;
