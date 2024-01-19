import { useEffect, useState } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import UserCard from "../components/UserCard";

function UserPage({ fetchAllRecipesByUser, fetchFavoritedRecipesByUser }) {
  const [user, setUser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    fetch(`/users/${id}`)
      .then((resp) => resp.json())
      .then((user) => {
        setUser(user);
        setIsLoaded(true);
      });
  }, [id]);

  useEffect(() => {
    const path = location.pathname.split("/");
    if (path[path.length - 1] === "favorites") {
      fetchFavoritedRecipesByUser(id);
    } else {
      fetchAllRecipesByUser(id);
    }
  }, [location]);

  if (!isLoaded) return <h2>Loading...</h2>;

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row">
        <UserCard user={user} />
        <div className="mt-8 border-x border-b border-[#9cb6dd] rounded-md w-full max-w-full md:w-1/2 lg:w-2/3 flex-end">
          <div className="flex justify-evenly">
            <NavLink
              to={`/users/${id}`}
              end
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex border-[#9cb6dd] border-y rounded-t-md rounded-br-md w-full justify-center"
                  : isActive
                  ? "flex border-[#9cb6dd] border-t rounded-t-md w-full justify-center bg-[#f2f7fb]"
                  : "flex border-[#9cb6dd] border-y border-r rounded-t-md rounded-br-md w-full justify-center"
              }
            >
              Recipes
            </NavLink>
            <NavLink
              to={`/users/${id}/favorites`}
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "flex justify-center border-[#9cb6dd] border-t rounded-t-md w-full bg-[#f2f7fb]"
                  : "flex justify-center border-[#9cb6dd] border-l border-y rounded-t-md rounded-l-md w-full"
              }
            >
              Favorites
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default UserPage;
