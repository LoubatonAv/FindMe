import AppShell from "./components/layout/AppShell";
import HomePage from "./features/home/HomePage";
import ProfilePage from "./features/profile/ProfilePage";
import { Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import "./App.css";
import SignUpPage from "./features/auth/SignUpPage";
import SignInPage from "./features/auth/SignInPage";
import RequireAuth from "./features/auth/RequireAuth";
import NearbyPage from "./features/nearby/NearbyPage";

export function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />

      {/* Protected routes under AppShell */}
      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/nearby" element={<NearbyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
