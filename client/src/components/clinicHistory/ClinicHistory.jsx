import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getClinicHistory } from '../../redux/actions'

export default function ClinicHistory() {

    const dispatch = useDispatch();
    const clinicHistorys = useSelector( state => state.clinicHistory )

    useEffect(() => {
        dispatch(getClinicHistory());
   }, [dispatch])

    return (
        <div>
        <Link to='homeUsuarioPrueba'>
            <button>Volver</button>
        </Link>
        <h1>clinicHistory</h1>
        <h1>Paciente: {clinicHistorys[0].patient.name}</h1>
        { clinicHistorys ?
            clinicHistorys.map(oneClinicHistory =>
            <div>
                <h3>Medico: {oneClinicHistory.professional.name}</h3>
                <p>Motivo: {oneClinicHistory.reason}</p>
                {/* <label>Estudio digital: {oneClinicHistory.image}</label> */}
                <p>Detalle consulta: {oneClinicHistory.description}</p>
                <p>Fecha atencion: {oneClinicHistory.date}</p>
                <h5>Diagnostico final: {oneClinicHistory.diagnosis}</h5>
            </div> )
        : null }
        </div>
    )
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
    
// FALTA VER COMO IMPLEMENTAR EL DETALLE DE UNA HISTORIA CLINICA
// SE DEBERAN MAPEAR TODAS LAS HIST. CLIN. DEL PACIENTE