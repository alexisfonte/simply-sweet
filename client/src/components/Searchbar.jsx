import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRecipe } from "../contexts/RecipeContext";
import SearchResults from "./SearchResults";
import { useLocation } from "react-router-dom";
function Searchbar({ isSearchOpen, setIsSearchOpen }) {
    const { recipes } = useRecipe();
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const location = useLocation();

    useEffect(() => {
      setIsSearchOpen(false)
    }, [location])

    function handleSearch(e){
        setSearchTerm(e.target.value)
        const filteredRecipes = recipes.filter(recipe => {
          if((!searchTerm) ||
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.author.username.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          }
          return false;
        })

        setSearchResults(filteredRecipes)
    }

  return (
    <div
      hidden={!isSearchOpen}
      className="absolute left-0 right-0 top-0 z-10 pb-6 bg-white "
    >
      <div className="w-full mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
        <div className="items-stretch flex flex-wrap mb-2.5 py-2 relative w-full border-b border-black text-lg text-black bg-[#f9f9f9]">
          <input
            type="text"
            name="Search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="min-h-10 py-3 pr-4 relative flex-shrink flex-grow flex-auto w-[1%] bg-[#f9f9f9]"
          />
          <button
            className="flex-start -ml-[1px]"
            onClick={() => setIsSearchOpen(false)}
          >
            <XMarkIcon className="h-9 w-9" />
          </button>
        </div>
        <SearchResults searchResults={searchResults}/>
      </div>
    </div>
  );
}
export default Searchbar;
