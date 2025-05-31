import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; // ✅ make sure this is imported

import { db } from "../../firebase";

const MapView = () => {
  const [position, setPosition] = useState(null); // user's location
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const snapshot = await getDocs(collection(db, "profiles"));
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const profilesWithLocation = results.filter(
          (result) => result.location
        );
        setProfiles(profilesWithLocation);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    }
    fetchProfiles();
  }, []);
  console.log(profiles);

  function getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          resolve({ latitude, longitude });
        },
        (err) => reject(err)
      );
    });
  }

  useEffect(() => {
    async function fetchProfile() {
      const profilesRef = collection(db, "profiles"); // ✅ correct
      const snapshot = await getDocs(profilesRef);
      // console.log(snapshot);
    }
    fetchProfile();
  }, []);

  return (
    <MapContainer
      center={[32.0853, 34.7818]} // Tel Aviv coordinates
      zoom={10}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded"
    >
      {profiles
        .filter(
          (p) => p.location?.lat !== undefined && p.location?.lng !== undefined
        )
        .map((profile) => (
          <Marker
            key={profile.id}
            position={[profile.location.lat, profile.location.lng]}
          >
            <Popup>
              <div>
                <strong>{profile.displayName}</strong>
                <br />
                {profile.bio}
              </div>
            </Popup>
          </Marker>
        ))}

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default MapView;
