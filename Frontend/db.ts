import { getFirestore } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { getDatabase } from "firebase/database";

const firestoreDB = getFirestore(app);
const db = getDatabase(app);
export { firestoreDB, db };
