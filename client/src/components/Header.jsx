import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/Simply Sweet Logo.png";
import { useAuth } from "../contexts/AuthContext";
import Searchbar from "./Searchbar";

function Header() {
  const { authUser, isLoggedIn } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white py-6 px-0">
      <div className="flex items-center py-1 md:py-4">
        <Link to="/" className="m-auto text-center px-2">
          <img src={Logo} alt="Simply Sweet" className="w-96" />
        </Link>
      </div>
      <nav className="px-4 lg:px-0 border-t border-b border-black border-opacity-20 flex items-center py-2 justify-between relative">
        <button onClick={() => setIsSearchOpen(true)}>
          <MagnifyingGlassIcon className="text-black h-5 w-5" />
        </button>
        {!isLoggedIn &&
          <div>
          <Link to="/sign-in">
            <div className="flex text-nowrap space-x-2 items-center hover:text-[#ff642f]">
              <UserCircleIcon className=" h-6 w-6 " />
              <span className="">Log In</span>
            </div>
          </Link>
        </div>
        }
        {
          authUser &&
          <div className="flex space-x-4">
            <Link to="recipes/new">
              <div className="flex w-full justify-center items-center py-1 text-sm font-medium px-6 rounded-lg text-white mx-auto bg-[#6a7fc1]">
                New Recipe
              </div>
            </Link>
            <Link to={`/users/${authUser.id}`}>
            <div className="flex text-nowrap space-x-2 items-center hover:text-[#ff642f]">
              <div className="h-6 w-6 overflow-hidden rounded-full">
                <img src={authUser.avatar.image_url} alt={authUser.username} className="object-cover object-center" />
              </div>
              <span>{authUser.username}</span>
            </div>
            </Link>
          </div>
        }
        <Searchbar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/>
      </nav>
    </header>
  );
}
export default Header;
