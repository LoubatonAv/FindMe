// Import necessary React hooks
import { createContext, useContext, useEffect, useState } from "react";

// Import Firebase authentication state listener
import { onAuthStateChanged } from "firebase/auth";

// Import the initialized Firebase auth instance
import { auth } from "../firebase";

// Create a new context for auth. Initially undefined.
// This will hold user authentication info globally.
const AuthContext = createContext(undefined);

// AuthProvider wraps your app and provides auth state to all children
export const AuthProvider = ({ children }) => {
  // State to store the current user object (null if not signed in)
  const [user, setUser] = useState(null);

  // State to indicate whether auth status is still loading
  const [loading, setLoading] = useState(true);

  // Run this once when the component mounts
  useEffect(() => {
    // Listen for auth state changes (e.g. user signs in or out)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Set the current user (null if signed out)
      setUser(firebaseUser);

      // Mark loading as complete
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Provide user and loading state to all children via context
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context from any component
export const useAuth = () => {
  // Get the context value
  const context = useContext(AuthContext);

  // Ensure this hook is only used inside AuthProvider
  if (!context) throw new Error("useAuth must be used within AuthProvider");

  // Return the user and loading values
  return context;
};
