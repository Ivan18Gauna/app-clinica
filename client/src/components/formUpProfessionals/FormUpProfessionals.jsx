import React from "react";  
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getPatients, getPatientsByName } from "../../redux/actions";


function validate(input){
    let error = {}

    if(!/([A-z])/.test(input.motivo)){
        error.motivo = "Ingrese un motivo valido"
    }
    
    if(!/([A-z])/.test(input.consulta)){
        error.consulta = "Ingrese una consulta valida"
    }

    if(!/([A-z])/.test(input.consulta)){
        error.consulta = "Ingrese una consulta valida"
    }

    if(!/([A-z])/.test(input.diagnostico)){
        error.diagnostico = "Ingrese un diagnostico valido"
    }
    return error;

}


export default function FormUpProfessionals(){
    const dispatch = useDispatch();
    const allPatients = useSelector((state) => state.patients)
	console.log("soy -Paciente",allPatients)
    
    useEffect(() => {
		dispatch(getPatients())
	}, [dispatch])  
     
    const [input, setInput] = useState ({
        search:[],
        motivo: "",
        file: "",
        consulta: "",
        date: "",
        diagnostico:""
    })
    console.log("soy search",input.search)
    
    const [error, setError] = useState({})
    
    function handleMotivo(e){
        setInput({
        ...input,
        [e.target.name]: [e.target.value],
    })
    let existeError = validate({
        
         ...input,
            [e.target.name]: [e.target.value],
    })
        setError(existeError)
   
    }
	
    function handleSubmit(e){
        e.preventDefault(e)
        console.log(input.search, input.motivo, input.file, input.consulta, input.date, input.diagnostico)
        setInput({
            search:[],
            motivo: "",
            file: "",
            consulta: "",
            date: "",
            diagnostico:""
        })
    }
     
    

    function handleSearch(e){
        e.preventDefault()
        dispatch(getPatientsByName(input.search))
      
    }
 
 
    
    
    return(
        <div>
            <form onSubmit={handleSubmit} >
                <label >Paciente :</label>
                <input type="search" name="search" value={input.search} onChange={handleMotivo}/>
                     {input.search === '' ? <p>*</p> : ''}
					{error.search && <p> {error.search} </p>}
                 
                  {allPatients && allPatients.length>0 && allPatients[0].name === input.search[0] ? 
                  <div>
                    <p>{allPatients[0].document}</p>
                    <p> {allPatients[0].name}</p>
                  <p> {allPatients[0].lastname}</p>
                  </div> : 
                  <div>"No se encontro paciente"</div>}
                    
                <button onClick={handleSearch}>Buscar Paciente</button>
      
               <label > Motivo :</label>
                <input type="text"  name="motivo" value={input.motivo} onChange={handleMotivo}/>
                    {input.motivo === '' ? <p>*</p> : ''}
					{error.motivo && <p> {error.motivo} </p>}

                <label>Estudio digital :</label>
                <input type="file" name="file" value={input.file} onChange={handleMotivo}/>
                    {input.file === '' ? <p>*</p> : ''}
					{error.file && <p> {error.file} </p>}

                <label>Detalle consulta :</label>
                <input type="textarea" name="consulta" value={input.consulta} onChange={handleMotivo}/>
                    {input.consulta === '' ? <p>*</p> : ''}
					{error.consulta && <p> {error.consulta} </p>}

                <label>Fecha atencion :</label>
                <input type="date" name="date" value={input.date} onChange={handleMotivo}/>
                    {input.date === '' ? <p>*</p> : ''}
					{error.date && <p> {error.date} </p>}

                <label>Diagnostico final :</label>
                <input type="text" name="diagnostico" value={input.diagnostico} onChange={handleMotivo}/>
                     {input.diagnostico === '' ? <p>*</p> : ''}
					{error.diagnostico && <p> {error.diagnostico} </p>}
                 
                 
                 <button type="subtmit">Enviar</button>
            </form>
        </div>
    )
}