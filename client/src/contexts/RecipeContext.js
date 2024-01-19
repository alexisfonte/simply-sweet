import React, { useState, useEffect, useContext } from "react";

const RecipeContext = React.createContext();

export function useRecipe() {
  return useContext(RecipeContext);
}

export function RecipeProvider(props) {
  const [recipes, setRecipes] = useState([]);

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

  const value = {
    recipes,
    setRecipes,
  };

  return (
    <RecipeContext.Provider value={value}>
      {props.children}
    </RecipeContext.Provider>
  );
}
