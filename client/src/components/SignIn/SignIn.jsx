import React from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div>
        <div>
            <h1>Regístrate ahora</h1>
        </div>
      <Link to='/formpatients'>
      <div>
        <div>
        <img src="https://d2cv8o6xw7nmr6.cloudfront.net/static/img/icon-patient-registration-d8f05efbcc.svg" alt="not img" />
        </div>
        <h3>
          Paciente
        </h3>
        <p>
          Busca el profecional que nesecitas y reserva un turno
        </p>
      </div>
      </Link>
      <br />
      <br />
      <Link to='/formprofessionals'>
      <div>
      <div>
        <img src="https://d2cv8o6xw7nmr6.cloudfront.net/static/img/icon-clinic-registration-d5e772603a.svg" alt="not img" />
        </div>
        <h3>
          Profecional Medico
        </h3>
        <p>
          Simplifica la gestion de turnos y permitele a tus paciente reservar citas de forma online
        </p>
      </div>
      </Link>
    </div>
  );
}
