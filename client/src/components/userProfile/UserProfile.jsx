import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getObrasSociales, getUserDetail } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "universal-cookie";
import PatientProfile from '../patientsProfile/PatientsProfile'

export default function UserProfile() {
  const cookie = new Cookies()
  const history = useHistory()
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    console.log('efect')
    dispatch(getObrasSociales());
    dispatch(getUserDetail(cookie.get('email')));
  }, [dispatch]);
  
  const state = useSelector((state) => state.user)
  const obras = useSelector((state) => state.os)

  console.log("state",state)

  function logoutCookies (){
    cookie.remove('email',{path:'/'})
    cookie.remove('userEmail',{path:'/'})
    history.push('/')
  }

  return (
    <div>
      {state && state.document ? (
       <div>
         <PatientProfile globalUser={state} obras={obras}/>
         <button onClick={logoutCookies}>cerrar local</button>
       </div>
      ) : (
        <div>
        <h1>loading</h1>
        <button onClick={logoutCookies}>cerrar local</button>
        </div>
      )}
    </div>
  );
}

