import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import db from "../../db";
const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const database = collection(db, "profiles");
  const [status, setStatus] = useState("idle"); // "idle" | "saving" | "success" | "error"

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const hobbyOptions = ["Cooking", "Gaming", "Hiking"];

  async function onProfileChange({ bio, hobbies, picture }) {
    try {
      const file = picture[0]; // assuming: register("picture")
      const updatedProfile = {
        ...profileInfo,
        bio: bio,
        hobbies: hobbies,
        file: file,
      };
      setStatus("saving");
      setProfileInfo(updatedProfile);
      await addDoc(database, {
        bio: updatedProfile.bio,
        hobbies: updatedProfile.hobbies,
      });
      await new Promise((res) => setTimeout(res, 1000)); // 1-second pause
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit(onProfileChange)}>
        <label className="block mb-1 font-medium">Bio</label>
        <textarea
          {...register("bio")}
          className="w-full p-2 border rounded min-h-[100px]"
          placeholder="Tell us about yourself..."
        />

        <fieldset className="mt-4 p-3 border rounded">
          <legend className="font-medium text-lg mb-2">Hobbies</legend>
          {hobbyOptions.map((hobby) => (
            <label key={hobby} className="flex items-center">
              <input
                type="checkbox"
                name="hobbies"
                value={hobby}
                className="mr-2"
                {...register("hobbies")}
              />
              {hobby}
            </label>
          ))}
        </fieldset>
        <label className="block mt-4 font-medium">Profile Picture</label>
        <input type="file" {...register("picture")} />

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Profile
        </button>
      </form>
      {status === "saving" && (
        <div className="flex items-center justify-center my-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-blue-500">Saving...</span>
        </div>
      )}

      {status === "success" && (
        <div className="text-green-600">Account saved!</div>
      )}
      {status === "error" && (
        <div className="text-red-600">
          Something went wrong. Please try again.
        </div>
      )}

      {profileInfo.bio && (
        <div className="mt-10 p-6 bg-gray-50 rounded shadow-md max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Profile Preview
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bio:
            </label>
            <div className="bg-white border rounded p-2 text-sm text-gray-800">
              {profileInfo.bio}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Hobbies:
            </label>
            <div className="flex flex-wrap gap-2">
              {profileInfo.hobbies?.map((hobby) => (
                <span
                  key={hobby}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Picture:
            </label>
            {profileInfo.file && (
              <img
                src={URL.createObjectURL(profileInfo.file)}
                alt="Profile"
                className="rounded border max-w-full h-auto"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
