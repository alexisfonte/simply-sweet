import React, { useState, useEffect, useContext } from "react";

const RecipeContext = React.createContext();

export function useRecipe() {
  return useContext(RecipeContext);
}

export function RecipeProvider(props) {
  const [recipes, setRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    fetch("/recipes").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setRecipes(data);
        });
      } else {
        res.json().then((data) => {
          console.log(data.errors);
        });
      }
    });
  }, []);

  function fetchAllRecipesByUser(id) {
    fetch(`/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setUserRecipes(data.recipes);
      });
  }

  function fetchFavoritedRecipesByUser(id) {
    fetch(`/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setUserRecipes(data.favorited_recipes);
      });
  }

  const value = {
    recipes,
    setRecipes,
    fetchAllRecipesByUser,
    fetchFavoritedRecipesByUser,
    userRecipes
  };

  return (
    <RecipeContext.Provider value={value}>
      {props.children}
    </RecipeContext.Provider>
  );
}