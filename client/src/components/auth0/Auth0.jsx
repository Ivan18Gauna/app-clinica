import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";


export default function Auth0() {
  const { loginWithPopup, isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated && <div>
        <h1>Bienvenido a +Saud</h1>
        <Link to='/signin'>
        <button>Continuar</button>
        </Link>
      </div> }
      {!isAuthenticated &&  <button onClick={() => loginWithPopup()}>Login</button> }
      
    </div>
  );
}
