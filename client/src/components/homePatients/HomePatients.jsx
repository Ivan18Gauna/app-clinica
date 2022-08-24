import React from "react";
import { Link } from "react-router-dom";

export default function HomePatients() {

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
                    <label>Grupo Sanguineo: </label>
                    <label>Vacunas: </label>
                    <label>Alergias: </label>
                    <label>Donante: </label>
                    <label>Transfundible: </label>
                    <label>Enfermedades crónicas: </label>
                    <label>Obra Social: </label>
                </div>
            </div>
        </div>
    )
}