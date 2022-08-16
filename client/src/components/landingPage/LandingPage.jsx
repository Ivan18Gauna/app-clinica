import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage (){
    return(
        <div className="landing">
            <h1 >App Clinica</h1>
            <Link to = "/home">
                <button>Ingresar</button>
            </Link>
        </div>
    )
}