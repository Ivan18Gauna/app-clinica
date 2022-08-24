import React from "react";
import {Link} from "react-router-dom";
import videoplayback from "./videoplayback.mp4"
import  "./landing.css"
import Button from "react-bootstrap/esm/Button";

export default function LandingPage (){
    
    return(
        <div className="landing">
            <video src={videoplayback} autoPlay loop muted></video>
                <Link to = "/home" className="boton">
                    <Button variant="outline-success" >Ingresar</Button>{' '}
                </Link>
        </div>
    )
}