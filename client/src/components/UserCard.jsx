import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function UserCard({ user }) {
  const { id, username, avatar, recipes, favorited_recipes, likes } = user;
  const {authUser, isLoggedIn} = useAuth();
  const location = useLocation()
  return (
    <div className="mt-16 max-w-full px-3 md:w-1/2 lg:w-1/3">
      <div className="bg-white text-center border mb-4 rounded-md">
        <div className="rounded-full overflow-hidden max-w-full w-32 h-32 -mt-16 mx-auto">
          <img
            src={avatar.image_url}
            alt={avatar.name}
            className="object-cover object-center"
          />
        </div>
        <div className="px-2 pt-4 pb-5 ">
          <span className="mb-2 text-2xl font-semibold text-center">{`@${username}`}</span>
          <div className="flex items-center justify-evenly">
            <div className="">
              <span>{recipes.length}</span>
              <p>Recipes</p>
            </div>
            <div className="">
              <span>{likes}</span>
              <p>Likes</p>
            </div>
            <div className="">
              <span>{favorited_recipes.length}</span>
              <p>Favorites</p>
            </div>
            
          </div>
          {isLoggedIn && authUser.id === id && location.pathname !== "/users/me" &&
          <Link to="/users/me" className="mt-4 flex w-full justify-center items-center py-3 text-base px-6 rounded-lg text-white mx-auto bg-red-400 font-bold tracking-wider">Edit Profile</Link>
          }
        </div>
      </div>
    </div>
  );
}

export default UserCard;
