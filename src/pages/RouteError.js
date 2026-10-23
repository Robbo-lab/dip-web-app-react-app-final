import React from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export default function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} — ${error.data || error.statusText}`
    : "An unexpected error occurred.";

  return (
    <div className="box mt-3" role="alert">
      <h2 className="title is-4">Route error</h2>
      <p>{message}</p>
      <Link to="/users">Back to Users</Link>
      <p className="help is-size-7 mt-3">Route errors with useRouteError.</p>
    </div>
  );
}
