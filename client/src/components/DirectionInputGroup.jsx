function DirectionInputGroup({ direction, formData, setFormData, index }) {
  function handleDirectionChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      directions: prevFormData.directions.map((direction, i) =>
        i === index
          ? {
              id: direction.id,
              direction: e.target.value,
              ordinal: direction.ordinal,
            }
          : direction
      ),
    }));
  }

  function handleDeleteDirection(e) {
    if (direction.id) {
      setFormData((prevData) => ({
        ...prevData,
        directions: prevData.directions.map((direction, i) =>
          i === index && direction && direction.id
            ? { id: direction.id, _destroy: "1" }
            : direction
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        directions: prevData.directions.filter((_, i) => i !== index),
      }));
    }
  }
  return (
    <>
      <div className="sm:col-span-6">
        <div className="flex items-center space-x-2 ">
          <span className="items-center flex flex-col h-6 w-6 p-2 justify-center text-white bg-[#ff642f] rounded-full">
            {index + 1}
          </span>
          <input
            type="text"
            name="direction"
            id="direction"
            value={direction.direction}
            onChange={handleDirectionChange}
            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            className="bg-green-300 rounded-md flex items-center p-2"
            type="button"
            onClick={() => {
              setFormData((prevData) => ({
                ...prevData,
                directions: [
                  ...prevData.directions,
                  {
                    direction: "",
                    ordinal: formData.directions.length,
                    id: undefined
                  },
                ],
              }));
            }}
          >
            <div className="h-4 w-4 text-white stroke-2 font-bold flex items-center justify-center text-xl">
              +
            </div>
          </button>
          <button
            className="bg-red-300 rounded-md flex items-center p-2"
            type="button"
            onClick={handleDeleteDirection}
            // onClick={() => {
            //   setFormData((prevData) => ({
            //     ...prevData,
            //     directions: prevData.directions.filter((_, i) => i !== index),
            //   }));
            // }}
          >
            <div className="h-4 w-4 text-white stroke-2 font-bold flex items-center justify-center text-xl">
              x
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
export default DirectionInputGroup;
