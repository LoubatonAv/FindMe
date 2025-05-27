// src/features/auth/RequireAuth.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function RequireAuth({ children }) {
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Subscribe once and capture the unsubscribe function
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in → stop checking
        setChecking(false);
      } else {
        // No user → redirect to sign-in
        navigate("/signin");
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [navigate]);

  // While checking, render nothing (or a spinner)
  if (checking) return null;

  // Once done, render the protected content
  return children;
}
