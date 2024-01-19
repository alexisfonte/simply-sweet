import RecipeContainer from './RecipeContainer'
function SearchResults({ searchResults }) {
  return (
    <div className="w-full border-x border-b border-black rounded-b-md">
      <h2 className='w-full text-center text-xl font-serif font-bold'>Showing {searchResults.length} Results</h2>
      <RecipeContainer recipes={searchResults}/>
    </div>
  )
}
export default SearchResults