import { getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { getDatabase } from "firebase/database";
const db = getFirestore(app);
const rtdb = getDatabase(app);

export { db, rtdb };
