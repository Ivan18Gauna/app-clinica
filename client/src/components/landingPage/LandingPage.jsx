import React from "react";
import {Link} from "react-router-dom";
import videoplayback from "./videoplayback.mp4"
import  "./landing.css"
import Button from "react-bootstrap/esm/Button";

export default function LandingPage (){
    return(
        <div className="landing">
            <div className="fondo"></div>
            <video src={videoplayback} autoPlay loop muted></video>
            <div className="texto">
      {/*      <h1>+Salud</h1> */}
            <Link to = "/home">
            <Button variant="outline-success">Ingresar</Button>{' '}
            </Link>
            </div>
        </div>
    )
}