import React from "react";
import img from '../../Icons/Doctor_Monochromatic.svg'
import "./Portada.css"

export default function Portada() {
    return (
        <div className="portada">
            <p>Bienvenidos a +Salud</p>
            <img src={img} alt="img not found" />
        </div>
    )
}
