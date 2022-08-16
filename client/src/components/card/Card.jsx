import React from "react";

export default function Card({name, specialties}) {
    return (
        <div>
            <div>
                <img src="" alt="img not found" />
            </div>
            <div>
                <h3>{name}</h3>
                <h4>{specialties}</h4>
            </div>
        </div>
    )
}