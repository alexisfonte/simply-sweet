import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Simply Sweet Logo Orange.png";
import AvatarSelector from "../components/AvatarSelector";

function SignUp() {
  const [avatars, setAvatars] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    avatar_id: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/avatars")
      .then((r) => r.json())
      .then((data) => {
        setAvatars(data);
        setFormData((prevData) => ({ ...prevData, "avatar_id": data[0].id }));
      });
  }, []);

  const { username, password, avatar_id, confirm_password } = formData;

  function onSubmit(e) {
    e.preventDefault();

    if (password !== confirm_password) {
      setErrors(["Passwords do not match"]);
    } else {
      const user = {
        username,
        password,
        avatar_id,
      };

      fetch(`/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.ok) {
          res.json().then((user) => {
            navigate(`/users/${user.id}`);
            navigate(0); // refresh app
          });
        } else {
          res.json().then((json) => setErrors(json.errors));
        }
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center mt-12 sm:px-6 lg:px-8">
      <div className="h-full w-full my-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-md ">
          <img className="mx-auto  w-auto" src={Logo} alt="Your Company" />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-[#ffd8ca] px-6 py-12 shadow sm:rounded sm:px-12">
            <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-[#182934]">
              Create an account
            </h2>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="text-center">
                {errors
                  ? errors.map((error) => (
                      <p className="text-lg font-bold text-red-700 mb-2">
                        {error}
                      </p>
                    ))
                  : null}
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-[#182934]"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 p-1.5 text-[#182934] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-200 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-[#182934]"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="off"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 p-1.5 text-[#182934] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-200 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium leading-6 text-[#182934]"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 p-1.5 text-[#182934] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-200 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <AvatarSelector
                avatars={avatars}
                setFormData={setFormData}
                formData={formData}
                handleChange={handleChange}
              />

              <div className="flex items-center justify-end">
                <div className="text-sm leading-6">
                  <Link
                    to={"/sign-in"}
                    className="font-semibold text-[#ff642b] hover:text-[#ff8051]"
                  >
                    Already have an account?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-[#ff642b] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ff8051] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ouline-sky-200"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
