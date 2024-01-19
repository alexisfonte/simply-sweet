function IngredientInputGroup({ingredient, formData, setFormData, index}) {
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: prevFormData.ingredients.map((ingredient, i) =>
        i === index
          ? {
              ...ingredient, [name]: value
            }
          : ingredient
      ),
    }));
  }

  function handleDeleteIngredient(e) {
    if (ingredient.id){
      setFormData((prevData) => ({
        ...prevData,
        ingredients: prevData.ingredients.map((ingredient, i) => 
        i === index ? { id: ingredient.id, _destroy: "1"} : ingredient
        ),
      }));
    } else {
      setFormData((prevData) => ({
            ...prevData,
            ingredients: prevData.ingredients.filter((_, i) => i !== index),
          }));
    }
  }
  return (
    <>
      <div className="sm:col-span-1">
        <label
          htmlFor="amount"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Amount
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="amount"
            id="amount"
            onChange={handleChange}
            value={ingredient.amount}
            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-1">
        <label
          htmlFor="unit"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Unit
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="unit"
            id="unit"
            onChange={handleChange}
            value={ingredient.unit}
            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Name
        </label>
        <div className="mt-2 flex space-x-2">
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            onChange={handleChange}
            value={ingredient.name}
            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button className="bg-green-300 rounded-md flex items-center p-2" type="button" onClick={() => {setFormData((prevData) => ({...prevData, ingredients: [...prevData.ingredients, { amount: "", unit: "", name: "", ordinal: formData.ingredients.length}]}))}}>
            <div className="h-4 w-4 text-white stroke-2 font-bold flex items-center justify-center text-xl">+</div>
          </button>
          <button className="bg-red-300 rounded-md flex items-center p-2" type="button" onClick={handleDeleteIngredient}>
            <div className="h-4 w-4 text-white stroke-2 font-bold flex items-center justify-center text-xl">x</div>
          </button>
        </div>
      </div>
    </>
  );
}
export default IngredientInputGroup;
