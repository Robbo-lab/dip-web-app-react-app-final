import React from "react";
import { Link, useLoaderData } from "react-router";

export default function UserPage() {
  const user = useLoaderData();
  return (
    <div className="box mt-3">
      <h2 className="title is-4 has-text-light">{user.firstName}</h2>
      <p>Age: {user.age}</p>
      <Link to="/users">Back to Users</Link>
      <p className="help is-size-7 mt-3">Route data with useLoaderData.</p>
    </div>
  );
}
