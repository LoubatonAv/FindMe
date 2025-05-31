// src/features/auth/SignUpPage.jsx
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export default function SignUpPage() {
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });

  const onLogin = ({ email, password }) => {
    setFirebaseError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const profileData = {
          uid: user.uid,
          email: user.email,
          displayName: "",
          bio: "",
          hobbies: [],
          createdAt: serverTimestamp(),
          location: {
            lng: 0,
            lat: 0,
          },
        };
        await setDoc(doc(db, "profiles", user.uid), profileData);
        navigate("/profile");
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="
                w-full
                px-4 py-2
                border border-gray-300
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
              className="
                w-full
                px-4 py-2
                border border-gray-300
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              flex justify-center
              px-6 py-3
              bg-gradient-to-r from-purple-500 to-indigo-600
              text-white font-semibold
              rounded-full shadow-md
              hover:from-purple-600 hover:to-indigo-700
              transition
              disabled:opacity-50
            "
          >
            {isSubmitting ? "Signing up…" : "Sign Up"}
          </button>

          {/* Firebase Error */}
          {firebaseError && (
            <p className="mt-4 text-center text-red-600">{firebaseError}</p>
          )}
        </form>
      </div>
    </div>
  );
}
