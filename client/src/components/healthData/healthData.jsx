import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getObrasSociales } from "../../redux/actions";

const blood_type = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB+', 'AB-', 'O+', 'O-']
const vaccines_data=['BCG', 'Hepatitis B', 'Neumococo conjugada', 'Quintuple pentavalente', 'Polio', 'Rotavirus','Meningococo', 'Gripe','Hepatitis A', 
                    'Triple viral', 'Varicela', 'Quintuple', 'Triple Bacteriana Celular','HPV', 'Fiebre Amarilla','COVID' ]

export default function HealthData() {

    const obras = useSelector((state) => state.os)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getObrasSociales())
    }, [dispatch])

    const [input, setInput] = useState({
        blood: '',
        vaccines: [],
        allergies: [],
        donation: '',
        transfusion: '',
        chronicles: [],
        oS: ''
    })

    function handleSubmit(e) {
        e.preventDefault();
        dispatch()      //falta action y reducer
        setInput({
            blood: '',
            vaccines: [],
            allergies: [],
            donation: '',
            transfusion: '',
            chronicles: [],
            oS: ''
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label  > Grupo Sanguineo: </label>
                    <select defaultValue='Seleccione una opción' >
                    <option value="Seleccione una opcion">Selecione una opción: </option>

                        {
                            blood_type.map(e => {
                                return <option key={e} value={e} > {e} </option>
                            })
                        }

                    </select>
                </div>

                <div>
                    <label>Vacunas: </label>
                    <select>
                    <option value="Seleccione una opcion">Selecione una opción: </option>
                    {
                        vaccines_data.map(e=>{
                            return <option key={e} value={e}> {e} </option>
                        })
                    }

                    </select>
                </div>

                <div>
                    <label>Alergias</label>
                    <input type="text" />
                </div>

                <div>
                    <label>Donante: </label>
                    <select defaultValue='Seleccione una opción'>
                        <option value="Seleccione una opción">Seleccione una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div>
                    <label>Transfundible: </label>
                    <select >
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div>
                    <label>Enfermedades Crónicas: </label>
                    <input type="text" />
                </div>
                <div>
                    <label >Obra Social: </label>
                    <select defaultValue='Seleccione una opción'>
                        <option value="Seleccione una opción">Seleccione una opción</option>
                        {
                            obras.map(e => {
                                return <option value={e} > {e} </option>
                            })
                        }
                    </select>
                </div>

                <button type="submit" >Enviar</button>

            </form>
        </div >
    )


}