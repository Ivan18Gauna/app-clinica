import React from "react";  

export default function FormUpProfessionals(){
    return(
        <div>
            <form action="">
                <label >Paciente :</label>
                <input type="search" />
               <button>Buscar Paciente</button>
               <label > Motivo :</label>
                <input type="text" />
                <label>Estudio digital :</label>
                <input type="file" />
                <label>Detalle consulta :</label>
                <input type="textarea" />
                <label>Fecha atencion :</label>
                <input type="date" />
                <label>Diagnostico final :</label>
                <input type="text" />

            </form>
        </div>
    )
}