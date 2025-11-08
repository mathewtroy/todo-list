import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const loadProfile = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setProfile(data);
        setNameEdit(data.name || "");
      }
    };

    loadProfile();
  }, []);

  const saveName = async () => {
    const user = auth.currentUser;
    if (!user || !nameEdit.trim()) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), { name: nameEdit.trim() });
      setProfile((prev) => ({ ...prev, name: nameEdit.trim() }));
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="section tasks-page">
      <h2 className="section-title">Profile</h2>

      <div className="card profile-card">
        {/* Name */}
        <div className="profile__row">
          <span className="profile__name">Name:</span>
          {!editing ? (
            <>
              <span>{profile?.name}</span>
              <button className="btn" onClick={() => setEditing(true)}>
                Edit Name
              </button>
            </>
          ) : (
            <>
              <input
                className="input"
                value={nameEdit}
                onChange={(e) => setNameEdit(e.target.value)}
              />
              <div className="profile__actions">
                <button className="btn" onClick={saveName} disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  className="btn btn--purple"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>

        {/* Email */}
        <div className="profile__row">
          <span className="profile__name">Email:</span>
          <span>{profile?.email}</span>
        </div>

        {/* Role */}
        {profile?.role && (
          <div className="profile__row">
            <span className="profile__name">Role:</span>
            <span>{profile.role}</span>
          </div>
        )}
      </div>
    </section>
  );
}
