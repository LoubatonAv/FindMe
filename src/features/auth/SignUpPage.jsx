// src/features/auth/SignUpPage.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur", // still valid
  });

  const onLogin = ({ email, password }) => {
    setFirebaseError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/profile");
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onLogin)}>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <label className="block mt-4 mb-1">Password</label>
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
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {isSubmitting ? "Signing up…" : "Sign Up"}
        </button>
        {firebaseError && (
          <p className="mt-2 text-sm text-red-600">{firebaseError}</p>
        )}
      </form>
    </div>
  );
}
