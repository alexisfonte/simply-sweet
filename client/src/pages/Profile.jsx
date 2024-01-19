import UserCard from "../components/UserCard";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AvatarSelector from "../components/AvatarSelector";

function Profile() {
  const { authUser, setAuthUser } = useAuth();
  const [avatars, setAvatars] = useState([]);
  const [avatarId, setAvatarId] = useState(authUser.avatar.id);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/avatars")
      .then((r) => r.json())
      .then((data) => {
        setAvatars(data);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    handleAvatarUpdate();
  }

  function handleAvatarUpdate() {
    const user = {
      avatar_id: avatarId.avatar_id,
    };

    fetch(`/users/${authUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setAuthUser(user);
          navigate(`/users/${user.id}`);
        });
      } else {
        res.json().then((json) => console.log(json.errors));
      }
    });
  }

  return (
    <div className="">
      <div className="flex justify-between px-4 mb-2 max-w-full items-center">
        <h2 className="text-4xl font-serif font-bold tracking-wide">
          Edit Profile
        </h2>
      </div>
      <hr className="py-4" />
      <div className="bg-[#ffd8ca] px-6 pb-12 pt-6 shadow sm:rounded sm:px-12">
        <div className="w-full flex justify-center">
          <UserCard user={authUser} />
        </div>
        <AvatarSelector
          avatars={avatars}
          formData={avatarId}
          setFormData={setAvatarId}
        />
        <button
          onClick={handleSubmit}
          className="mt-2 flex w-full justify-center items-center py-3 text-sm font-medium px-6 rounded-lg text-white mx-auto bg-[#6a7fc1]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
export default Profile;
