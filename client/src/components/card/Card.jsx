import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, id }) {
    return (
        <div>
            <div>
                <img src="" alt="img not found" />
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

