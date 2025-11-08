import { auth } from "../lib/firebase";

export default function Tasks() {
  const user = auth.currentUser;
  return (
    <section className="home">
      <h1 className="home__title">Tasks</h1>
      <p className="home__text">
        Logged in as: <strong>{user?.email}</strong>
      </p>
      {/* TODO: task list will go here */}
    </section>
  );
}
