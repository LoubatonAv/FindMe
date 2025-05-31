import React from "react";

const ProfileCard = ({ profile }) => {
  const { displayName, bio, hobbies } = profile;
  const shortBio = bio.length > 80 ? bio.slice(0, 77) + "…" : bio;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col">
      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {displayName || "Unnamed User"}
      </h3>

      {/* Bio snippet */}
      <p className="text-gray-600 text-sm mb-4">
        {shortBio || "No bio available."}
      </p>

      {/* Hobbies as pills */}
      <div className="mb-4">
        {hobbies && hobbies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby) => (
              <span
                key={hobby}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {hobby}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-xs italic">No hobbies listed.</p>
        )}
      </div>

      {/* “View Profile” button */}
      <a
        href={`/profile`}
        className="mt-auto inline-block text-center w-full py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded hover:bg-gray-200 transition"
      >
        View Profile
      </a>
    </div>
  );
};

export default ProfileCard;
