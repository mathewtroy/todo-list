import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function registerUser({ name, email, password, dob, phone }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(cred.user, { displayName: name });

  const uid = cred.user.uid;
  await setDoc(doc(db, "users", uid), {
    uid,
    name,
    email,
    dob: dob || null,
    phone: phone || null,
    role: "user",              
    createdAt: serverTimestamp(),
  });

  return cred.user;
}

export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutUser() {
  return signOut(auth);
}
