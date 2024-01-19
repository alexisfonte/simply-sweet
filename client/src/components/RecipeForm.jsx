import {
  ArrowLeftIcon,
  HeartIcon,
  PencilSquareIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { Switch } from "@headlessui/react";
import { Link } from "react-router-dom";
import IngredientInputGroup from "../components/IngredientInputGroup";
import DirectionInputGroup from "../components/DirectionInputGroup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function RecipeForm({ handleSubmit, formData, setFormData, recipeByUser }) {
  const { title, image_url, is_private, author, directions, ingredients } =
    formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="lg:my-0 space-y-4">
      <div className="flex items-center justify-between">
        <div className="my-2 mr-4 flex items-center">
          <Link to={`/users/${author.id}`} className="flex items-center group">
            <div className="rounded-full overflow-hidden w-8 h-8">
              <img
                src={author.avatar_url}
                alt={author.username}
                className="object-cover object-center"
              />
            </div>
            <span className="pl-1 text-xs group-hover:text-[#ff642f]">
              {author.username}
            </span>
          </Link>
        </div>
        <div className="flex space-x-4">
          {recipeByUser && (
            <button
              type="submit"
              className="mt-2 flex w-full justify-center items-center py-3 text-sm font-medium px-6 rounded-lg text-white mx-auto bg-[#6a7fc1]"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Recipe Info
            </h2>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={handleChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Ex: Chocolate Chip Cookies"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <Switch.Group
                as="div"
                className="flex items-center justify-between"
              >
                <span className="flex flex-grow flex-col">
                  <Switch.Label
                    as="span"
                    className="text-sm font-medium leading-6 text-gray-900"
                    passive
                  >
                    Private
                  </Switch.Label>
                  <Switch.Description
                    as="span"
                    className="text-sm text-gray-500"
                  >
                    Private recipes will be hidden from other users.
                  </Switch.Description>
                </span>
                <Switch
                  checked={is_private}
                  name="is_private"
                  onChange={(e) =>
                    setFormData({ ...formData, ["is_private"]: e })
                  }
                  className={classNames(
                    is_private ? "bg-indigo-600" : "bg-gray-200",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      is_private ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
              </Switch.Group>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="image_url"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover Photo Url
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="image_url"
                    name="image_url"
                    id="image_url"
                    value={image_url}
                    onChange={handleChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="www.example.com"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="mt-2 flex justify-center border border-dashed border-gray-900/25 rounded-xl overflow-hidden relative aspect-h-2 aspect-w-4">
                <div className="text-center">
                  {image_url ? (
                    <img
                      src={image_url}
                      alt={title}
                      className="w-full max-w-full object-cover object-center"
                    />
                  ) : (
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Ingredients
            </h2>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            {ingredients.map((ingredient, index) => (
                !ingredient._destroy &&
              <IngredientInputGroup
                key={index}
                ingredient={ingredient}
                formData={formData}
                setFormData={setFormData}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Directions
            </h2>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            {directions.map((direction, index) => (
                !direction._destroy &&
              <DirectionInputGroup
                key={index}
                direction={direction}
                formData={formData}
                setFormData={setFormData}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
export default RecipeForm;
