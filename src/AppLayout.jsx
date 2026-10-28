import { Link, Outlet } from "react-router";

function AppLayout() {
  return (
    <>
      <aside>
        <h2>Tweet App</h2>
        <Link to="/login">Login</Link>
        <Link to="/profile/1">Profile</Link>
        <Link to="/settings">Settings</Link>
      </aside>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;