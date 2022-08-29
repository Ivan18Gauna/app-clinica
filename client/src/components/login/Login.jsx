import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import img from "../../Icons/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../redux/actions";
import "./Login.css";
import Loading from "../loading/Loading";
import "../formPatients/FormPatients.module.css";
import Button from "react-bootstrap/esm/Button";
import styles from '../patientsProfile/PatientsProfile.module.css';
import Auth0 from "../auth0/Auth0";
import Cookies from 'universal-cookie'

export default function Login() {

  const history = useHistory();
	const globalUser = useSelector( state => state.user);
  const dispatch = useDispatch();
  const { loginWithPopup, isAuthenticated, logout } = useAuth0();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
	const cookie = new Cookies()
	cookie.set('userEmail', user.email, {path: '/'})
	cookie.set('userPassword', user.password, {path: '/'})
	dispatch(getUserDetail(user.email))
/*     setUser({
      email: "",
      password: "",
    }); */
    history.push("/home");
  }
  
  // if((isAuthenticated && !globalUser.document) || (isAuthenticated && !globalUser.license) ){
  //   history.push('/signin')
  // }
  // if((isAuthenticated && globalUser.document) || (isAuthenticated && globalUser.license)){
  //   history.push('/home')
  // }
  // if(isAuthenticated){
    // setTimeout(()=>{
    //   dispatch(getUserDetail(user.email));
    // }, 2000)
    // history.push('/signin')
    // history.push('/home');
  // }

  return (
    <div>
      {!isAuthenticated ? (
        <div className="container w-75 mt-5">
          <div className="row">
            <div className="col d-none d-lg-block">
              <img
                src="https://thumbs.dreamstime.com/z/retrato-dise-o-minimalista-exhausto-continuo-de-la-sola-mano-del-dibujo-lineal-doctor-un-forma-vida-linear-aislada-solo-s%C3%ADmbolo-146395118.jpg"
                alt="not img"
                width="700"
                height="700"
                className="col-12"
              />
            </div>

            <div className="col" id='div-general-login'>
              <div className="text-end" id="div-image-name">
                <h2 className="fw-bold text-center py-5" id="name-login">Ingresa a +Salud</h2>
                <div id="image-logIn">
                  <img src={img} alt="not img" width="100px" />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Correo electronico
                  </label>
                  <input
                    value={user.name}
                    onChange={handleInput}
                    type="email"
                    className="form-control"
                    name="email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    value={user.name}
                    onChange={handleInput}
                    type="password"
                    className="form-control"
                    name="password"
                  />
                </div>
                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    name="connected"
                    className="form-check-input"
                  />
                  <label htmlFor="connected" className="form-check-label">
                    Mantenerme conectado
                  </label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Iniciar Sesion
                  </button>
                </div>
                <div className="my-3">
                  <span>¿Nuevo en +Salud? </span>
                  <Link to="/signin">
                    <span>Resgistrate</span>
                  </Link>
                </div>
                <div className="my-3">
                  <span>¿Olvidaste tu contraseña? </span>
                  <Link to="/sincomponente">
                    <span>Recupera tu contraseña</span>
                  </Link>
                </div>
              </form>
              <div className="container w-100 my-5" id='div-otra-manera'>
                <div className="row text-center" id='text-otra-manera'>
                  <div className="col-12">Otra manera de iniciar sesión</div>
                </div>
                <div className="row">
                  <div className="col">
                    {/* <br /> */}
                    <button onClick={() => loginWithPopup()}>Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="loading-login">
            <Loading />
          </div>
          <div id='loading-num'>
              { setTimeout(()=>{
                  dispatch(getUserDetail(user.email));

                }, 1000)}
              { setTimeout( ()=>{
                if(globalUser && globalUser.mail){
                  history.push('/home');
                } else {
                  history.push('/signin');
                }
              }, 5000)}
              <Button className={styles.button} onClick={logout}>Cerrar sesion</Button>
            </div>
          </div>
      )}
    </div>
  );
}
