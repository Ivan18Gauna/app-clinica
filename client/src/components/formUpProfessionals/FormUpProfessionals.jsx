import React from "react";  
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getPatients, getPatientsByName, postHistory } from "../../redux/actions";


function validate(input){
    let error = {}

    if(!/([A-z])/.test(input.reason)){
        error.motivo = "Ingrese un motivo valido"
    }
    
    if(!/([A-z])/.test(input.description)){
        error.consulta = "Ingrese una descripcion valida"
    }

    if(!/([A-z])/.test(input.diagnosis)){
        error.diagnostico = "Ingrese un diagnostico valido"
    }
    return error;

}


export default function FormUpProfessionals(){
    const dispatch = useDispatch();
    const allPatients = useSelector((state) => state.patients)
	//console.log("soy -Paciente",allPatients)
    
    
    useEffect(() => {
		dispatch(getPatients())
	}, [dispatch])  
     
    const [input, setInput] = useState ({
        patient:[],
        reason: "",
        image: "",
        description: "",
        date: "",
        diagnosis:""
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
        console.log("asi va la info",input.patient, input.reason, input.image, input.description, input.date, input.diagnosis)
        dispatch(postHistory(input));
        alert("Registraste correctamente tu atencion a  " + input.patient)
        setInput({
            patient:[],
            reason: "",
            image: "",
            description: "",
            date: "",
            diagnosis:""
        })
    }
     

    function handleSearch(e){
        e.preventDefault()
        dispatch(getPatientsByName(input.patient))
      
    }
 
 
  
    
    return(
        <div>
            <form onSubmit={handleSubmit} >
                <label >Paciente :</label>
                <input type="search" name="patient" value={input.patient} onChange={handleMotivo}/>
                     {input.patient === '' ? <p>*</p> : ''}
					{error.patient && <p> {error.patient} </p>}
                   
                  {allPatients && allPatients.document == input.patient[0] ? 
                  <div>
                
                    <p> {allPatients.name}</p>
                  <p> {allPatients.lastname}</p>
                  </div> : 
                  <div>"No se encontro paciente"</div>}
                    
                <button onClick={handleSearch}>Buscar Paciente</button>
      
               <label > Razon:</label>
                <input type="text"  name="reason" value={input.reason} onChange={handleMotivo}/>
                    {input.reason === '' ? <p>*</p> : ''}
					{error.reason && <p> {error.reason} </p>}

                <label>Estudio digital :</label>
                <input type="file" name="image" value={input.image} onChange={handleMotivo}/>
                    {input.image === '' ? <p>*</p> : ''}
					{error.image && <p> {error.image} </p>}

                <label>Descripcion consulta :</label>
                <input type="textarea" name="description" value={input.description} onChange={handleMotivo}/>
                    {input.description === '' ? <p>*</p> : ''}
					{error.description && <p> {error.description} </p>}

                <label>Fecha atencion :</label>
                <input type="date" name="date" value={input.date} onChange={handleMotivo}/>
                    {input.date === '' ? <p>*</p> : ''}
					{error.date && <p> {error.date} </p>}

                <label>Diagnostico final :</label>
                <input type="text" name="diagnosis" value={input.diagnosis} onChange={handleMotivo}/>
                     {input.diagnosis === '' ? <p>*</p> : ''}
					{error.diagnosis && <p> {error.diagnosis} </p>}
                 
                 
                 <button type="subtmit">Enviar</button>
            </form>
        </div>
    )
}
// todo ok