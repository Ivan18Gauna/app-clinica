import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getObrasSociales,
  getUserDetail,
  get_specialties
} from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "universal-cookie";
import PatientProfile from "../patientsProfile/PatientsProfile";
import Loading from "../loading/Loading";
import "../login/Login.module.css";
import ProfessionalProfile from "../professionalsProfile/ProfessionalsProfile";

export default function UserProfile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(state => state.user);
  const obras = useSelector(state => state.os);
  const specialties = useSelector(state => state.specialties);
  const { isAuthenticated, logout } = useAuth0();
  const cookies = new Cookies();

  useEffect(() => {
    const cookies = new Cookies();
    dispatch(getObrasSociales());
    dispatch(get_specialties());
    dispatch(getUserDetail(cookies.get("userEmail")));
  }, [dispatch]);

  function logoutCookies() {
    if (isAuthenticated) {
      logout();
    }
    cookies.remove("userEmail", { path: "/" });
    history.push("/");
  }

  function register() {
    history.push("/signin");
  }

  return (
    <div>
      {state && state.document ? (
        <div>
          <PatientProfile globalUser={state} obras={obras} />
          {/* <Button className={styles.button} onClick={logoutCookies}>Cerrar sesion</Button> */}
        </div>
      ) : state && state.license ? (
        <div>
          <ProfessionalProfile globalUser={state} specialties={specialties} />
          {/* <Button className={styles.button} onClick={logoutCookies}>Cerrar sesion</Button> */}
        </div>
      ) : (
        <div>
          <Loading />
          <button onClick={logoutCookies}>Cerrar sesion</button>
          <button onClick={register}>Continuar con el registro</button>
        </div>
      )}
    </div>
  );
}
