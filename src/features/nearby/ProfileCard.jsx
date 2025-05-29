import React from "react";

const ProfileCard = ({ profile }) => {
  console.log(profile);
  return (
    <div className="p-4 border rounded shadow bg-white">
      <div>{profile.bio}</div>
      <div>
        {profile.hobbies.map((hobby) => (
          <ul className="">
            <li>{hobby}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
