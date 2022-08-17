import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, id }) {
    return (
        <div>
            <div>
                <img src="https://c8.alamy.com/compes/2dtw8p3/estetoscopio-vector-salud-medico-logotipo-medico-2dtw8p3.jpg" alt="img not found" width="150px" height="200" />
            </div>
            <div>
                <Link to={'/details/'+id}>
                <h3>{name}</h3>
                </Link>
                <h4>specialties</h4>
            </div>
        </div>
    )
}

