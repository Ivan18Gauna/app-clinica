import React from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div>
      <div class="container w-75 mt-5">
        <div class="row align-items-stretch">
          <Link to='/formpatients'>
            <div class="card-deck col mt-5">
              <div class="card col mt-5">

                <div class="col text-center">
                  <img
                    src="https://d2cv8o6xw7nmr6.cloudfront.net/static/img/icon-patient-registration-d8f05efbcc.svg"
                    alt="not img"
                  />
                  <div class="text-center">
                    <h5>Paciente</h5>
                  </div>
                  <div class="text-center">
                    Busca el profecional que nesecitas y reserva un turno.
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to='/formprofessionals'>
            <div class="card-deck col mt-5">
              <div class="card col mt-5">

                <div class="col text-center">
                  <img
                    src="https://d2cv8o6xw7nmr6.cloudfront.net/static/img/icon-patient-registration-d8f05efbcc.svg"
                    alt="not img"
                  />
                  <div class="text-center">
                    <h5>Profesional Medico</h5>
                  </div>
                  <div class="text-center">
                    Simplifica la gestion de turnos y permitele a tus paciente
                    reservar citas de forma online.
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
