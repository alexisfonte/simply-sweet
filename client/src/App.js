import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from "./components/Layout";
import RecipePage from "./pages/RecipePage";
import UserPage from "./pages/UserPage";
import RecipeContainer from "./components/RecipeContainer";
import { useAuth } from "./contexts/AuthContext";
import Profile from "./pages/Profile";
import EditRecipe from "./pages/EditRecipe";
import NewRecipe from "./pages/NewRecipe";
import { useRecipe } from "./contexts/RecipeContext";

function App() {
  const { isLoggedIn } = useAuth();
  const { userRecipes } = useRecipe();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="p-0 w-full mx-auto max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
        <Routes>
          <Route
            path="sign-in"
            element={isLoggedIn ? <Navigate to={`/`} /> : <SignIn />}
          />
          <Route
            path="sign-up"
            element={isLoggedIn ? <Navigate to={`/`} /> : <SignUp />}
          />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="recipes">
              <Route path=":id" element={<RecipePage />} />
              <Route path=":id/edit" element={<EditRecipe />} />
              <Route path="new" element={<NewRecipe />}></Route>
            </Route>
            <Route path="users">
              <Route
                path="me"
                element={!isLoggedIn ? <Navigate to="/sign-in" /> : <Profile />}
              />
              <Route
                path=":id"
                element={
                  <UserPage/>
                }
              >
                <Route
                  index
                  element={<RecipeContainer recipes={userRecipes} />}
                />

                <Route
                  path="favorites"
                  element={<RecipeContainer recipes={userRecipes} />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
