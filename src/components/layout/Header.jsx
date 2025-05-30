import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";

const Header = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full md:w-3/4 mx-auto flex items-center justify-between py-4 px-6">
        {/* Left: Welcome or Sign In */}
        <div>
          {user ? (
            <Link
              to="/profile"
              className="text-gray-800 font-medium hover:text-gray-900 transition"
            >
              👋 Welcome, <span className="underline">{user.email}</span>
            </Link>
          ) : (
            <Link
              to="/signin"
              className="text-gray-800 font-medium hover:text-gray-900 transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Center (optional) */}
        <nav className="flex-1 text-center">
          <Link
            to="/nearby"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            Nearby
          </Link>
        </nav>

        {/* Right: Sign Out */}
        {user && (
          <button
            onClick={handleSignOut}
            className="text-gray-800 font-medium hover:text-gray-900 transition"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
