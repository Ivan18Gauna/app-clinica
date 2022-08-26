import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function HomePatients() {

    // const userInfo = useSelector( state => state/*.user*/ )

    return (
        <div>
            <div>
                <h3>Proximos turnos</h3>
                <div> 
                {/* van a ir en columna estilo grilla */}
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
                    {/* <label>Grupo Sanguineo: {userInfo}</label>
                    <label>Vacunas: {userInfo}</label>
                    <label>Alergias: {userInfo}</label>
                    <label>Donante: {userInfo}</label>
                    <label>Transfundible: {userInfo}</label>
                    <label>Enfermedades crónicas: {userInfo}</label>
                    <label>Obra Social: {userInfo}</label> */}
                </div>
            </div>
        </div>
    )
}