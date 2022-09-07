import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getClinicHistory, getUserDetail } from "../../redux/actions";
import Loading from "../loading/Loading";
import styles from "../formPatients/FormPatients.module.css";
import Button from "react-bootstrap/esm/Button";
import { useAuth0 } from "@auth0/auth0-react";
import "./ClinicHistory.css";
import "../../App.css";
import Cookies from "universal-cookie";

export default function ClinicHistory() {
  const cookies = new Cookies();
	const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
	const globalUser = useSelector((state) => state.user);
	const clinicHistorys = useSelector((state) => state.clinicHistory);
    console.log(clinicHistorys[0])
    
	useEffect(() => {
        dispatch(getUserDetail(cookies.get('userEmail')))
        dispatch(getClinicHistory(globalUser.id));
	}, [globalUser.id]);

  useEffect(() => {
    dispatch(getUserDetail(cookies.get("userEmail")));
    dispatch(getClinicHistory(globalUser.id));
  }, [globalUser.id]);

  if (
    (isAuthenticated && !globalUser) ||
    (isAuthenticated && globalUser && !globalUser.name)
  ) {
  }

  return (
    <div>
      <div className="div-page">
        <div className={`${styles.container}`} id="container">
          <Link to="home">
            <Button variant="outline-secondary">Volver</Button>
          </Link>
          <div className={styles.form}>
            <h1>Tu historial clínico</h1>
            {clinicHistorys && clinicHistorys.length > 0 ? (
              <div>
                <h1>
                  {clinicHistorys[0].patient.name +
                    " " +
                    clinicHistorys[0].patient.lastname}
                </h1>
                {clinicHistorys.map(oneClinicHistory => (
                  <div className="clinic-history">
                    <h3 className="doctor-clinic">
                      Médico:{" "}
                      {oneClinicHistory.professional.name +
                        " " +
                        oneClinicHistory.professional.lastname}
                    </h3>
                    <p>Fecha atención: {oneClinicHistory.date}</p>

                    <p>Motivo: {oneClinicHistory.reason}</p>
                    <p>Detalle consulta: {oneClinicHistory.description}</p>
                    <label>Estudio digital: {oneClinicHistory.image}</label>
                    <h5>Diagnóstico final: {oneClinicHistory.diagnosis}</h5>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.loading}>
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// [
//     {
//       "id": 1,
//       "reason": "x",
//       "image": "x",
//       "description": "x",
//       "date": "x",
//       "diagnosis": "x",
//       "patientId": 3,
//       "professionalId": 1,
//       "professional": {
//         "name": "Emilio"
//       },
//       "patient": {
//         "name": "Emilio"
//       }
//     },
//     {
//       "id": 2,
//       "reason": "x",
//       "image": "x",
//       "description": "x",
//       "date": "x",
//       "diagnosis": "x",
//       "patientId": 3,
//       "professionalId": 2,
//       "professional": {
//         "name": "Tania"
//       },
//       "patient": {
//         "name": "Emilio"
//       }
//     }
//   ]

// FALTA VER SI ESTA BIEN IMPLEMENTADO EL DETALLE DE UNA HISTORIA CLINICA

// FUNCIONA PERO NO HAY HISTORIAL CLINICA GUARDADA, CREAR UN PAR, EL MODELO UTILIZADO PARA RENDERIZAR
// LAS HIST CLINICAS ES EL DE ARRIBA
