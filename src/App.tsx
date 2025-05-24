import AppShell from "./components/layout/AppShell";
import HomePage from "./features/home/HomePage";
import ProfilePage from "./features/profile/ProfilePage";
import { Routes, Route } from "react-router-dom";

import "./App.css";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
