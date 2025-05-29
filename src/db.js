// db.js
import { getFirestore } from "firebase/firestore";
import { app } from "./firebase"; // import the initialized app

const db = getFirestore(app);

export default db;
