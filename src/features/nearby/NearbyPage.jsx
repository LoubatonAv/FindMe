import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import ProfileCard from "./ProfileCard";
import MapView from "./MapView";

const NearbyPage = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const snapshot = await getDocs(collection(db, "profiles"));
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfiles(result);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    }
    fetchProfiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-12">
        {/* Nearby Profiles Grid */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            📍 People Nearby
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </section>

        {/* Map View */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            🗺️ On the Map
          </h2>
          <div className="w-full h-96 rounded-xl shadow-lg overflow-hidden">
            <MapView />
          </div>
        </section>
      </div>
    </div>
  );
};

export default NearbyPage;
