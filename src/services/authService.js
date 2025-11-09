import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

/** Register new user with email/password */
export async function registerUser({ name, email, password, dob, phone }) {
  try {
    // create user in Firebase Auth
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    // set display name
    await updateProfile(cred.user, { displayName: name });

    // create Firestore user doc
    const userRef = doc(db, "users", cred.user.uid);
    await setDoc(userRef, {
      name,
      email: email.toLowerCase(),
      dob: dob || null,
      phone: phone || null,
      role: "user",
      createdAt: new Date().toISOString(),
    });

    return cred.user;
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      throw new Error("This email is already registered");
    }
    throw err;
  }
}

/** Login existing user */
export async function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/** Logout */
export async function logoutUser() {
  await auth.signOut();
}

export async function resetPassword(email) {
  if (!email) throw new Error("Please enter your email");

  const actionCodeSettings = {
    url: "https://todo-krossi.web.app/login", 
    handleCodeInApp: false                    
  };

  try {
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    return "Password reset email sent!";
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      throw new Error("No account found with this email");
    }
    throw new Error("Failed to send reset email");
  }
}