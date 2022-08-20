import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getObrasSociales } from "../../redux/actions";



export default function HealthData() {

    const obras= useSelector((state)=>state.os)

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getObrasSociales())
    },[dispatch])

    const [input, setInput] = useState({
        blood: '',
        vaccines: '',
        allergies: '',
        donation: [],
        transfusion: [],
        chronicles: [],
        oS:[]
    })

    function handleSubmit(e) {
        e.preventDefault();
        dispatch()      //falta action y reducer
        setInput({
            blood: '',
            vaccines: [],
            allergies: '',
            donation: [],
            transfusion: [],
            chronicles: [],
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h4>Grupo Sanguineo:</h4>
                    <select >

                    </select>
                </div>

                <div>
                    <h4>Vacunas</h4>
                    <select>

                    </select>
                </div>

                <div>
                    <h4>Alergias</h4>
                    <select>
                    </select>
                </div>

                <div>
                    <h4>Donante: </h4>
                    <select >
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div>
                    <h4>Transfundible: </h4>
                    <select >
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div>
                    <h4>Enfermedades Crónicas: </h4>
                </div>
                <div>
                    <label >Obra Social: </label>
                    <select defaultValue='Seleccione una opción'>
                        <option value="Seleccione una opción">Seleccione una opción</option>
                        {
                            obras.map(e=>{
                                return <option  value= {e} > {e} </option>
                            })
                        }
                    </select>
                </div>

                <button type="submit" >Enviar</button>

            </form>
        </div >
    )


}