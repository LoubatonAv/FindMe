import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import L from "leaflet";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { haversine } from "../../utils/haversine";

const MapView = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [maxDistance, setMaxDistance] = useState(50);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const { user } = useAuth();
  const uid = user.uid;

  const glowingUserIcon = L.divIcon({
    className: "custom-glow-marker", // Your custom class
    iconSize: [25, 41], // Same as default marker
    iconAnchor: [12, 41], // Bottom center
    html: `
    <div class="marker-glow-wrapper">
      <img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" class="marker-icon-img" />
    </div>
  `,
  });

  const userIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const snapshot = await getDocs(collection(db, "profiles"));
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const profilesWithLocation = results.filter((r) => r.location);
        setProfiles(profilesWithLocation);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    }
    fetchProfiles();
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      const docRef = doc(db, "profiles", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfileInfo(docSnap.data());
      }
    }
    if (uid) fetchProfile();
  }, [uid]);

  const mapCenter = profileInfo?.location
    ? [profileInfo.location.lat, profileInfo.location.lng]
    : [32.794, 34.9896]; // Haifa fallback

  const profilesWithDistance =
    profileInfo?.location &&
    profiles
      .map((p) => {
        const distance = haversine(
          p.location.lat,
          p.location.lng,
          profileInfo.location.lat,
          profileInfo.location.lng
        );
        return { ...p, distance };
      })
      .filter((p) => p.distance < maxDistance);

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-[1000] bg-white bg-opacity-90 p-3 rounded shadow pointer-events-auto">
        <label
          htmlFor="distanceSlider"
          className="block text-sm font-medium mb-1"
        >
          Max distance: {maxDistance} km
        </label>
        <input
          id="distanceSlider"
          type="range"
          min={1}
          max={100}
          step={1}
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>

      <MapContainer
        center={mapCenter}
        zoom={8}
        key={mapCenter.join("-")}
        scrollWheelZoom={true}
        className="h-[500px] w-full rounded"
        tabIndex={-1}
      >
        {profilesWithDistance?.map((profile) => (
          <Marker
            key={profile.id}
            position={[profile.location.lat, profile.location.lng]}
            icon={
              uid === profile?.uid
                ? userIcon
                : profile.id === selectedProfile
                ? glowingUserIcon
                : defaultIcon
            }
            eventHandlers={{
              click: () => {
                setSelectedProfile(profile.id);
              },
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong>{profile.displayName}</strong>
                <p>{profile.bio}</p>
                {Array.isArray(profile.hobbies) &&
                  profile.hobbies.map((hobby, index) => (
                    <p key={index}>{hobby}</p>
                  ))}
                <p>Distance: {profile.distance.toFixed(2)} Km</p>
              </div>
            </Popup>
          </Marker>
        ))}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default MapView;
