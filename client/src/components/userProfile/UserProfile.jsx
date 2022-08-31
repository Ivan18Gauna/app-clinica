import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getObrasSociales, getUserDetail } from "../../redux/actions";
// import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "universal-cookie";

import PatientProfile from '../patientsProfile/PatientsProfile';
import Loading from "../loading/Loading";
import '../login/Login.module.css';
import Button from "react-bootstrap/esm/Button";
import styles from '../patientsProfile/PatientsProfile.module.css';
import PatientProfile from '../patientsProfile/PatientsProfile'
import email from '../login/Login'

export default function UserProfile() {

  const cookie = new Cookies()
  const history = useHistory()
  const dispatch = useDispatch();

  const state = useSelector((state) => state.user)
  const obras = useSelector((state) => state.os)

  const {logout} = useAuth0()


  useEffect(() => {
    dispatch(getObrasSociales());
    dispatch(getUserDetail(cookie.get('email')));
  }, []);
  

  const state = useSelector((state) => state.user)
  const obras = useSelector((state) => state.os)

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
       </div>
      ) : (
        <div>
        <h1>loading</h1>
        <button onClick={logoutCookies}>cerrar local</button>
        <button onClick={logout}>cerrar auth0</button>

        </div>
      )}
    </div>
  );
}

