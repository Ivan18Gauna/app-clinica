import React from "react";  
import { useState } from "react";


export default function FormUpProfessionals(){
    const [input, setInput] = useState ({
        search:"",
        motivo: "",
        file: "",
        consulta: "",
        date: "",
        diagnostico:""
    })
    
    const [error, setError] = useState({})
    
    
    
    
    
    return(
        <div>
            <form action="">
                <label >Paciente :</label>
                <input type="search" name="search"/>
               <button>Buscar Paciente</button>
               <label > Motivo :</label>
                <input type="text"  name="motivo"/>
                <label>Estudio digital :</label>
                <input type="file" name="file" />
                <label>Detalle consulta :</label>
                <input type="textarea" name="consulta" />
                <label>Fecha atencion :</label>
                <input type="date" name="date"/>
                <label>Diagnostico final :</label>
                <input type="text" name="diagnostico" />

            </form>
        </div>
    )
}