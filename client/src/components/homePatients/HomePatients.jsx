import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Cookie from 'universal-cookie'

export default function HomePatients() {
    const cookie = new Cookie();
    console.log(cookie.get('userEmail'))

    const userInfo = useSelector( state => state.user )

    return (
        <div>
            <div>
                <h3>soy patient</h3>
                <h3>Proximos turnos</h3>
                <div> 
                {/* van a ir en columna estilo grilla o google calendar */}
                    <h5>Dia</h5>
                    <h5>Hora</h5>
                    <h5>Profesional</h5>
                </div>
                <button>dia evento/hora evento/profesional evento</button>
                {/* hay que ver como vn a guardar la info de los turnos */}
            </div>
            <Link to='/clinic_history'>
                <button>Historia Clinica</button>
            </Link>
            <Link to='/professionals'>
                <button>Profesionales</button>
            </Link>
            <div>
                <h3>Info Basica</h3>
                <div>
                    { userInfo && userInfo.lentgh > 0 ?
                    <div>
                        <label>Grupo Sanguineo: {userInfo[0].blood}</label>
                        <label>Vacunas: {userInfo[0].vaccines}</label>
                        <label>Alergias: {userInfo[0].allergies}</label>
                        <label>Donante: {userInfo[0].donation}</label>
                        <label>Transfundible: {userInfo[0].transfusion}</label>
                        <label>Enfermedades crónicas: {userInfo[0].chronicles}</label>
                        <label>Obra Social: {userInfo[0].oS}</label>
                    </div>
                    : null }
                </div>
            </div>
        </div>
    )
}