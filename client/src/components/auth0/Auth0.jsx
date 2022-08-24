import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../profile/Profile";

export default function Auth0() {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated && <button onClick={() => logout()}>logout</button>}
      {!isAuthenticated &&  <button onClick={() => loginWithPopup()}>Login</button> }
      {isAuthenticated && <Profile />}
    </div>
  );
}
