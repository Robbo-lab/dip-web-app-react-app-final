import React from "react";
import { NavLink, Outlet, useNavigation } from "react-router";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/nasa-api", label: "NASA API" },
  { to: "/styled", label: "Styled Component" },
  { to: "/accordion", label: "Accordion" },
  { to: "/gallery", label: "Gallery" },
  { to: "/people", label: "People List" },
  { to: "/users", label: "User List" },
  { to: "/date-input", label: "Date Input" },
  { to: "/likes", label: "Likes" },
  { to: "/lifecycle", label: "Lifecycle" },
  { to: "/lifecycle-shared", label: "Shared Lifecycle" },
  { to: "/user-profile", label: "User Profile" },
  { to: "/context", label: "Context API" },
];

export default function MainLayout() {
  const navigation = useNavigation();

  return (
    <section className="hero is-fullheight is-primary">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">Our work in a SPA</h1>
          <h2 className="subtitle">
            All of our components in a Single Page React App
          </h2>
          <nav aria-label="Main navigation">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `button is-normal m-1 ${isActive ? "is-info" : "is-link"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          {navigation.state !== "idle" && (
            <p className="notification is-info mt-3" role="status">
              {navigation.state === "submitting"
                ? "Submitting…"
                : "Loading route…"}
            </p>
          )}
          <section className="section box has-background-scheme-main has-text-text mt-5 component-section" aria-label="React example">
            <Outlet />
          </section>
        </div>
      </div>
    </section>
  );
}
