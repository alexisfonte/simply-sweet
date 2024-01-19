import { Link, useNavigate } from "react-router-dom";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

function RecipeCard({ recipe }) {
  const { authUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [favorite, setFavorite] = useState({});

  useEffect(() => {
    if (recipe.like_by_user.length === 1) {
      setFavorite(recipe.like_by_user[0]);
      setIsLiked(true);
    }
    setLikes(recipe.favorites);
  }, [recipe]);

  function handleLike() {
    if (isLoggedIn) {
      setIsLiked(true);
      setLikes((likes) => likes + 1);
      const like = {
        user_id: authUser.id,
        recipe_id: recipe.id,
      };
      fetch(`/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(like),
      }).then((res) => {
        if (res.ok) {
          res.json().then((like) => {
            setFavorite(like);
            setIsLiked(true);
          });
        } else {
          res.json().then((json) => console.log(json.errors));
        }
      });
    } else {
      navigate("/sign-in");
    }
  }
  function handleUnLike() {
    if (isLoggedIn) {
      setIsLiked(false);
      setLikes((like) => like - 1);
      
      fetch(`/favorites/${favorite.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.ok) {
          setFavorite({});
          setIsLiked(false);
        } else {
          res.json().then((json) => console.log(json.errors));
        }
      });
    } else {
      navigate("/sign-in");
    }
  }
  return (
    <div className="w-full py-4">
      <Link to={`/recipes/${recipe.id}`}>
        <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-md bg-gray-100">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="object-cover object-center"
          />
        </div>
      </Link>
      <div className="mt-4 flex items-center justify-between space-x-4">
        <Link to={`/recipes/${recipe.id}`}>
          <span className="hover:text-[#ff642f]">{recipe.title}</span>
        </Link>
        <div className="flex items-center">
          {isLiked ? (
            <button onClick={handleUnLike}>
              <SolidHeartIcon className="w-4 h-4 mr-1 text-pink-600 " />
            </button>
          ) : (
            <button onClick={handleLike}>
              <HeartIcon className="w-4 h-4 mr-1 hover:text-pink-600 " />
            </button>
          )}
          <span className="text-sm">{likes}</span>
        </div>
      </div>
      <Link
        to={`/users/${recipe.author.id}`}
        className="flex items-center group hover:text-[#ff642f]"
      >
        <div className="w-4 h-4 mr-1 overflow-hidden bg-white rounded-full">
          <img src={recipe.author.avatar_url} alt={recipe.author.username} />
        </div>
        <p className="text-sm">{recipe.author.username}</p>
      </Link>
    </div>
  );
}
export default RecipeCard;
