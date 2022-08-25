import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { getClinicHistory } from '../../redux/actions/index'

export default function ClinicHistory() {

    const dispatch = useDispatch();
    const clinicHistory = useSelector( state => state/*.clinicHistory*/ )

    useEffect(() => {
        // dispatch(getClinicHistory());
    }, [dispatch])

    return (
        <div>
            <h1>Paciente: {clinicHistory}</h1>
            <h3>Medico: {clinicHistory}</h3>
            <p>Motivo: {clinicHistory}</p>
            <label>Estudio digital: {clinicHistory}</label>
            <p>Detalle consulta: {clinicHistory}</p>
            <p>Fecha atencion: {clinicHistory}</p>
            <h5>Diagnostico final: {clinicHistory}</h5>
        </div>
    )
}

// action

    // export const GET_CLINIC_HISTORY = 'GET_CLINIC_HISTORY'

    // export function getClinicHistory() {
    //     return async function (dispatch) {
    //         const clinicHistory = await axios('/historiaclinica');

    //         return dispatch({
    //             type: GET_CLINIC_HISTORY,
    //             payload: clinicHistory.data,
    //         });
    //     };
    // }

// reducer

    // clinicHistory = []

    // case GET_CLINIC_HISTORY:
    //    return { ...state, clinicHistory: payload };

    
// FALTA VER COMO IMPLEMENTAR EL DETALLE DE UNA HISTORIA CLINICA