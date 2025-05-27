import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-indigo-600 text-white shadow">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/signup" className="px-3 py-1 rounded hover:bg-indigo-500">
          Sign Up
        </Link>
        <Link className="px-3 py-1 rounded hover:bg-indigo-500" to="/signin">
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
