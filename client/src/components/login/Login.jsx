import React from "react";
import { Link } from "react-router-dom";
import Google from "../google/Google";
import img from "./pngwing.com.png";
// import { useAuth0 } from "@auth0/auth0-react";
// import Profile from "../profile/Profile";

export default function Login() {
  // const {loginWithPopup,logout,isAuthenticated} = useAuth0()
 
  return (
    <div>
      {/* <button onClick={()=> loginWithPopup()}>Login</button>
      <button onClick={()=> logout()}>logout</button>
      {isAuthenticated && <Profile/>} */}
      <div class="container w-75 mt-5">
        <div class="row">
          <div class="col d-none d-lg-block">
            <img
              src="https://thumbs.dreamstime.com/z/retrato-dise-o-minimalista-exhausto-continuo-de-la-sola-mano-del-dibujo-lineal-doctor-un-forma-vida-linear-aislada-solo-s%C3%ADmbolo-146395118.jpg"
              alt="not img"
              width="700"
              height="700"
              class='col-12'
            />
          </div>

          <div class="col">
            <div class="text-end">
              <img src={img} alt="not img" width="100px" />
            </div>
            <h2 class="fw-bold text-center py-5">Ingresa a +Salud</h2>
            <form>
              <div class="mb-4">
                <label for="email" class="form-label">
                  Correo electronico
                </label>
                <input type="email" class="form-control" name="email" />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">
                  Password
                </label>
                <input type="password" class="form-control" name="email" />
              </div>
              <div class="mb-4 form-check">
                <input
                  type="checkbox"
                  name="connected"
                  class="form-check-input"
                />
                <label for="connected" class="form-check-label">
                  Mantenerme conectado
                </label>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">
                  Iniciar Sesion
                </button>
              </div>
              <div class="my-3">
                <span>¿nuevo en +Salud? </span>
                <Link to="/signin">
                  <span>Resgistrate</span>
                </Link>
              </div>
              <div class="my-3">
                <span>¿olvidaste tu contraseña? </span>
                <Link to="/sincomponente">
                  <span>Recupera tu contraseña</span>
                </Link>
              </div>
            </form>
            <div class="container w-100 my-5">
              <div class="row text-center">
                <div class="col-12">Iniciar sesión con:</div>
              </div>
              <div class="row">
                <div class="col">
                  <Google/>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
