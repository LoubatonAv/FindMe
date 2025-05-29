import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js"; // path to your initialized Firebase instance

const Header = () => {
  const { user, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Optionally: navigate to /signin or show a message
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="w-full bg-indigo-600 text-white shadow">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/signup" className="px-3 py-1 rounded hover:bg-indigo-500">
          Sign Up
        </Link>
        <Link className="px-3 py-1 rounded hover:bg-indigo-500" to="/signin">
          {user ? <div>Welcome {user.email}!</div> : <div>Sign in</div>}
        </Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </header>
  );
};

export default Header;
