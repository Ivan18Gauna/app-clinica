import React from "react";
import img from '../../Icons/Doctors.svg'
import "./Portada.css"

export default function Portada() {
    return (
        <div className="portada">
            <p>Bienvenidos a +Salud</p>
            <img src={img} alt="img not found" />
        </div>
    )
}
