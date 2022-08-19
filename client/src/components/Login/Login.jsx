import React from "react";
import { Link } from "react-router-dom";
import Google from "../google/Google";
import img from "./pngwing.com.png";

export default function Login() {
  return (
    <div>
      <div class="container w-75 mt-5">
        <div class="row align-items-stretch">
          <div class="col d-none d-lg-block">
            <img
              src="https://thumbs.dreamstime.com/z/retrato-dise-o-minimalista-exhausto-continuo-de-la-sola-mano-del-dibujo-lineal-doctor-un-forma-vida-linear-aislada-solo-s%C3%ADmbolo-146395118.jpg"
              alt="not img"
              width="700"
              height="700"
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
                <Link to="/singin">
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
                  {/* <button class="btn btn-outline-danger w-1">
                    <div class="row align-items-center">
                      <div class="col-3">
                        <img
                          src="data:image/jpeg;base64,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"
                          width="32"
                          alt="not img"
                        />
                      </div>
                      <div class="col-9 text-center">Google</div>
                    </div>
                  </button> */}
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
