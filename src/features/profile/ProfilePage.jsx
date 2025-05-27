import React from "react";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const hobbyOptions = ["Cooking", "Gaming", "Hiking"];

  const onProfileChange = ({ bio, hobbies }) => {
    console.log(bio, hobbies);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onProfileChange)}>
        <input
          type="textarea"
          {...register("bio")}
          className="w-full p-2 border rounded"
        />
        <fieldset className="space-y-2">
          <legend className="font-medium">Hobbies</legend>
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
        <input type="file"></input>
        <button>Click</button>
      </form>
    </div>
  );
};

export default ProfilePage;
