import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AppShell = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full md:w-3/4 mx-auto p-6 bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppShell;
