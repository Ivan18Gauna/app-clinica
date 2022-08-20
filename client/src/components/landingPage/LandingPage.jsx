import React from "react";
import {Link} from "react-router-dom";
import videoplayback from "./videoplayback.mp4"
import  "./landing.css"
import Button from "react-bootstrap/esm/Button";

export default function LandingPage (){
    const fecha = new Date('Jul 12 2011');
    const añoActual = fecha.getFullYear();
console.log(añoActual);
    return(
        <div className="landing">
            <div className="fondo"></div>
            <video src={videoplayback} autoPlay loop muted></video>
            <div className="texto">

            <p>+ Salud</p>
            <Link to = "/home">
            <Button variant="outline-success">Ingresar</Button>{' '}
            </Link>
            </div>
        </div>
    )
}