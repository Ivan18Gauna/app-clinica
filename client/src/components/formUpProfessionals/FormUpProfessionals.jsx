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
    
    function handleMotivo(e){
        setInput({
        ...input,
        [e.target.name]: e.target.value,
    })
    }

    function handleFile(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleConsulta(e) {
    setInput({
        ...input,
        [e.target.name]: e.target.value,
    })        
    }

    function handleDate(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleDiagnostico(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e){
        e.preventDefault(e)
        console.log(input.motivo, input.file, input.consulta, input.date, input.diagnostico)
    }
    

    
    
    return(
        <div>
            <form onSubmit={handleSubmit} >
                <label >Paciente :</label>
                <input type="search" name="search"/>
               <button>Buscar Paciente</button>

               <label > Motivo :</label>
                <input type="text"  name="motivo" value={input.motivo} onChange={handleMotivo}/>

                <label>Estudio digital :</label>
                <input type="file" name="file" value={input.file} onChange={handleFile}/>

                <label>Detalle consulta :</label>
                <input type="textarea" name="consulta" value={input.consulta} onChange={handleConsulta}/>

                <label>Fecha atencion :</label>
                <input type="date" name="date" value={input.date} onChange={handleDate}/>

                <label>Diagnostico final :</label>
                <input type="text" name="diagnostico" value={input.diagnostico} onChange={handleDiagnostico}/>
                 <button type="subtmit">Enviar</button>
            </form>
        </div>
    )
}