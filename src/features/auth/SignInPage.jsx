import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const SignInPage = () => {
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = ({ email, password }) => {
    setFirebaseError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/profile");
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  };

  return (
    <div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          className="w-1/5 p-2 border rounded"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Must be at least 6 characters",
            },
          })}
        />
        <button>Login</button>
        {errors.email && (
          <p className="text-red-600 text-sm">{firebaseError}</p>
        )}
      </form>
    </div>
  );
};

export default SignInPage;
