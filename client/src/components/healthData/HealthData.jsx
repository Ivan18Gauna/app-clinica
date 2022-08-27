import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getObrasSociales } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { registerHealthData } from "../../redux/actions";

const blood_type = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB+', 'AB-', 'O+', 'O-']
const vaccines_data = ['BCG', 'Hepatitis B', 'Neumococo conjugada', 'Quintuple pentavalente', 'Polio', 'Rotavirus', 'Meningococo', 'Gripe', 'Hepatitis A',
    'Triple viral', 'Varicela', 'Quintuple', 'Triple Bacteriana Celular', 'HPV', 'Fiebre Amarilla', 'COVID']

export default function HealthData() {

    const obras = useSelector((state) => state.os)

    const dispatch = useDispatch();

    const history = useHistory();

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

    const [allergies_, setAllergies] = useState('')
    const [chronicles_, setChronicles] = useState('')

    console.log('input', input)

    function handleSelectBlood(e) {
        e.preventDefault();
        setInput({
            ...input,
            blood: e.target.value
        })
    }

    function handleSelectVaccines(e) {
        e.preventDefault();
        if (input.vaccines.includes(e.target.value)) {
            alert('Ya se selecciono esa vacuna.')
        } else {
            setInput({
                ...input,
                vaccines: [...input.vaccines, e.target.value]
            })
        }
    }

    function handleDeleteVaccines(e) {
        e.preventDefault();
        setInput({
            ...input,
            vaccines: input.vaccines.filter(el => el !== e.target.value)
        })
    }

    function handleInput(e) {
        e.preventDefault()
        setAllergies(
            e.target.value
        )
    }

    function handleSubmitAllergies(e) {
        e.preventDefault();
        if (input.allergies.includes(allergies_)) {
            alert('Alergia ya ingresada.')
        } else {
            setInput({
                ...input,
                allergies: [...input.allergies, allergies_]
            })
        }
        setAllergies('')
    }
    function handleDeleteAllergies(e) {
        e.preventDefault();
        setInput({
            ...input,
            allergies: input.allergies.filter(el => el !== e.target.value)
        })

    }

    function handleInputDonate(e) {
        e.preventDefault();
        setInput({
            ...input,
            donation: e.target.value
        })
    }

    function handleInputTransfusion(e) {
        e.preventDefault();
        setInput({
            ...input,
            transfusion: e.target.value
        })
    }

    function handleInputChronicles(e) {
        e.preventDefault();
        setChronicles(
            e.target.value
        )
    }

    function handleSubmitChronicles(e) {
        e.preventDefault();
        if (input.chronicles.includes(chronicles_)) {
            alert('Enfermedad crónica ya ingresada.')
        } else {
            setInput({
                ...input,
                chronicles: [...input.chronicles, chronicles_]
            })
        }
        setChronicles('')
    }
    function handleDeleteChronicles(e) {
        e.preventDefault();
        setInput({
            ...input,
            chronicles: input.chronicles.filter(el => el !== e.target.value)
        })

    }
    function handleSelectOS(e) {
        e.preventDefault(e);
        setInput({
            ...input,
            oS: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(registerHealthData(input))
        setInput({
            blood: '',
            vaccines: [],
            allergies: [],
            donation: '',
            transfusion: '',
            chronicles: [],
            oS: ''
        })
        history.push('/home')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label  > Grupo Sanguineo: </label>
                    <select onChange={handleSelectBlood} defaultValue='Seleccione su grupo sanguineo'>
                        <option value='Seleccione su grupo sanguineo' hidden>Selecione una opción: </option>

                        {
                            blood_type.map(e => {
                                return <option value={e} > {e} </option>
                            })
                        }

                    </select>
                    {input.blood === '' ? <p>*</p> : ''}
                </div>

                <div>
                    <label>Vacunas: </label>
                    <select onChange={handleSelectVaccines} defaultValue=" Selecione las vacunas que posee colocadas">
                        <option value=" Selecione las vacunas que posee colocadas" hidden>Selecione las vacunas que posee colocadas: </option>
                        {
                            vaccines_data.map(e => {
                                return <option key={e} value={e}> {e} </option>
                            })
                        }

                    </select>
                    {input.vaccines === '' ? <p>*</p> : ''}
                </div>
                <div>
                    <ul>
                        <span>Vacunas seleccionadas: </span>
                        {
                            input.vaccines.map(e => {
                                return <li key={e} value={e} >{e}
                                    <button value={e} onClick={handleDeleteVaccines} >X</button>
                                </li>
                            })
                        }
                    </ul>
                </div>


                <div>
                    <label>Alergias: </label>
                    <input type="text" placeholder='Alergias que posee' name="allergies" value={allergies_} onChange={handleInput} />
                    <button type="submit" onClick={handleSubmitAllergies}  >Agregar</button>
                </div>
                <div>
                    <ul>
                        <span>Usted ingreso las siguientes alergias: </span>
                        {
                            input.allergies && input.allergies.map(al => {
                                return <li key={al} value={al} >{al}
                                    <button value={al} onClick={handleDeleteAllergies} >X</button>
                                </li>
                            })
                        }
                    </ul>
                </div>

                <div>
                    <label>Donante: </label>
                    <select defaultValue='Seleccione una opción' onChange={handleInputDonate}>
                        <option value="Seleccione una opción" hidden>Seleccione una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                    {input.donation === '' ? <p>*</p> : ''}
                </div>

                <div>
                    <label>Transfundible: </label>
                    <select defaultValue='Seleccione una opción' onChange={handleInputTransfusion}>
                        <option value="Seleccione una opción" hidden>Seleccione una opción  </option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                    {input.transfusion === '' ? <p>*</p> : ''}
                </div>

                <div>
                    <label>Enfermedades crónicas: </label>
                    <input type="text" placeholder='Enfermedades cronicas que posee' name="chronicles" value={chronicles_} onChange={handleInputChronicles} />
                    <button type="submit" onClick={handleSubmitChronicles}  >Agregar</button>
                </div>
                <div>
                    <ul>
                        <span>Usted ingreso las siguientes enfermedades crónicas: </span>
                        {
                            input.chronicles && input.chronicles.map(ch => {
                                return <li key={ch} value={ch} >{ch}
                                    <button value={ch} onClick={handleDeleteChronicles} >X</button>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div>
                    <label >Obra Social: </label>
                    <select defaultValue='Seleccione una opción' onChange={handleSelectOS}>
                        <option value="Seleccione una opción">Seleccione una opción</option>
                        {
                            obras.map(e => {
                                return <option value={e} > {e} </option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <p>* Campos obligatorios</p>
                </div>

                <div>
                    {
                    input.blood===''||input.donation===''||input.transfusion===''?
                        <button disabled>Datos obligatorios no completados</button>:
                        <button type="submit" >Enviar</button>
                    }
                </div>

            </form>
        </div >
    )


}