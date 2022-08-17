import React from "react";

export default function Card({name}) {
    return (
        <div>
            <div>
                <img src="https://c8.alamy.com/compes/2dtw8p3/estetoscopio-vector-salud-medico-logotipo-medico-2dtw8p3.jpg" alt="img not found" width="150px" height="200" />
            </div>
            <div>
                <h3>{name}</h3>
                <h4>specialties</h4>
            </div>
        </div>
    )
}