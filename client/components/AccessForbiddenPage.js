import React from "react";
import { Link } from "react-router-dom";

const AccessForbiddenPage = () => {
  return (
    <div className="access-forbidden-page">
      <h1>403</h1>
      <h2>Forbidden</h2>
      <h2>You do not have permission to access this page!</h2>
    </div>
  );
};

export default AccessForbiddenPage;


export const PageNotFound = () => {
  return (
    <div className="access-forbidden-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <h2>The URL you requested does not exist.</h2>
      <Link to='/'><h2>Go Home</h2></Link>
    </div>
  );
};

