import React, { useState } from "react";
import { Link } from "react-router-dom";

import img from "./pngwing.com.png";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithPopup, isAuthenticated } = useAuth0();
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
    console.log(user)
    // dispatch(funcion a definir(user));
    setUser({
      email: "",
      password: "",
    });
  }
  return (
    <div>
      {!isAuthenticated?
    <div class="container w-75 mt-5">
    <div class="row">
      <div class="col d-none d-lg-block">
        <img
          src="https://thumbs.dreamstime.com/z/retrato-dise-o-minimalista-exhausto-continuo-de-la-sola-mano-del-dibujo-lineal-doctor-un-forma-vida-linear-aislada-solo-s%C3%ADmbolo-146395118.jpg"
          alt="not img"
          width="700"
          height="700"
          class="col-12"
        />
      </div>

      <div class="col">
        <div class="text-end">
          <img src={img} alt="not img" width="100px" />
        </div>
        <h2 class="fw-bold text-center py-5">Ingresa a +Salud</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <label for="email" class="form-label">
              Correo electronico
            </label>
            <input
              value={user.name}
              onChange={handleInput}
              type="email"
              class="form-control"
              name="email"
              
            />
          </div>
          <div class="mb-4">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              
              value={user.name}
              onChange={handleInput}
              type="password"
              class="form-control"
              name="password"
            />
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
            <div class="col-12">Otra manera de iniciar sesión</div>
          </div>
          <div class="row">
            <div class="col">
              <br />
              <button onClick={() => loginWithPopup()}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>:
  <div>
    <h1>Bienvenido a +Salud</h1>
    <Link to='/signin'><button>Continuar</button></Link>
    
  </div>  
    }
    </div>
  );
}
