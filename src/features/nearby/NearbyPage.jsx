import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../db";
import ProfileCard from "./ProfileCard";
import MapView from "./MapView";

const NearbyPage = () => {
  const database = collection(db, "profiles");
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const snapshot = await getDocs(database, "profiles");
        const result = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProfiles(result);
      } catch {
        alert("lol");
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 w-full">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
      <div className="py-10">
        <MapView />
      </div>
    </div>
  );
};

export default NearbyPage;
