import React from "react";
import "./paginado.css"

function Pagination ({doctorsPage, doctors, paginado}){
    const pageNumbers = []
    console.log("soy page",pageNumbers)
    for (let i = 1; i <= Math.ceil(doctors/doctorsPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav className="paginado">
            <ul>
            { pageNumbers && 
            pageNumbers.map(number => (
                
                <a onClick={() => paginado(number)} href>|{number}|</a>
              
            ))}
            </ul>
        </nav>
    )
}


export default Pagination