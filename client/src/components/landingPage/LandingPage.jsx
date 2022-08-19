import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage (){
    const fecha = new Date('Jul 12 2011');
    const añoActual = fecha.getFullYear();
console.log(añoActual);
    return(
        <div className="landing">
            <h1 >App Clinica</h1>
            <Link to = "/home">
                <button>Ingresar</button>
            </Link>
        </div>
    )
}