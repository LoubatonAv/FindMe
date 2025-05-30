import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const ProfilePage = () => {
  // Get current user UID
  const { user } = useAuth();
  const uid = user.uid;

  // Profile data state
  const [profileInfo, setProfileInfo] = useState({
    displayName: "",
    bio: "",
    hobbies: [],
  });
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | saving | success | error

  // Initialize form
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues: profileInfo });

  // Fetch existing profile on mount or UID change
  useEffect(() => {
    async function fetchProfile() {
      const docRef = doc(db, "profiles", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfileInfo(data);
        reset(data); // load form values
      }
    }
    if (uid) fetchProfile();
  }, [uid, reset]);

  // Handle profile updates
  const onProfileChange = async ({ displayName, bio, hobbies }) => {
    try {
      setStatus("saving");
      const updated = { displayName, bio, hobbies };
      await updateDoc(doc(db, "profiles", uid), updated);
      setProfileInfo(updated);
      setEditing(false);
      setStatus("success");
    } catch (error) {
      console.error("Failed to update profile", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-md">
        {!editing ? (
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">
              {profileInfo.displayName || "Your Name"}
            </h2>
            <p className="text-gray-700">
              {profileInfo.bio || "No bio yet. Click edit to add one."}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Hobbies:</span>{" "}
              {profileInfo.hobbies.length > 0
                ? profileInfo.hobbies.join(", ")
                : "None added"}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onProfileChange)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                {...register("displayName")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                {...register("bio")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
              />
            </div>
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-700">
                Hobbies
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {["Cooking", "Gaming", "Hiking"].map((hobby) => (
                  <label
                    key={hobby}
                    className="inline-flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      value={hobby}
                      {...register("hobbies")}
                      defaultChecked={profileInfo.hobbies.includes(hobby)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">{hobby}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {status === "saving" ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset(profileInfo);
                  setEditing(false);
                }}
                className="flex-1 px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
            {status === "success" && (
              <p className="text-green-600 text-center">Profile updated!</p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-center">Error saving profile.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
