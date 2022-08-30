import React from "react";
// import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getObrasSociales, getUserDetail } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "universal-cookie";
import PatientProfile from '../patientsProfile/PatientsProfile'

export default function UserProfile() {
  const cookie = new Cookies()
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    console.log('efect')
    dispatch(getObrasSociales());
    dispatch(getUserDetail(cookie.get('userEmail')));
    console.log(cookie.get('userEmail'))
  }, []);
  
  const state = useSelector((state) => state.user)
  console.log(state)

  return (
    <div>
      {state && state.document ? (
        <PatientProfile globalUser={state}/>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
}

