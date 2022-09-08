import React from "react";
import "./paginado.css"

function PaginatePatients ({patientsPage, patients, paginado}){
    const pageNumbersPatients = []
    for (let i = 1; i <= Math.ceil(patients/patientsPage); i++){
        pageNumbersPatients.push(i)
    }

    return(
        <nav className="paginado">
            <ul>
            { pageNumbersPatients && 
            pageNumbersPatients.map(number => (
                
                <a onClick={() => paginado(number)} href>{number}</a>
              
            ))}
            </ul>
        </nav>
    )
}


export default PaginatePatients