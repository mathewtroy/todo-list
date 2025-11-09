import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

/**
 * Checks if an email is already used in Firestore users collection.
 * Returns true if exists, false if available.
 */
export async function isEmailTaken(email) {
  if (!email) return false;
  const q = query(collection(db, "users"), where("email", "==", email.toLowerCase()));
  const snap = await getDocs(q);
  return !snap.empty; 
}
