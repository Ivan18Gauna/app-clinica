import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Loading from "../loading/Loading";
// import { postNotes, getNotes } from "../../redux/actions";

export default function HomeProfessional() {

    // const dispatch = useDispatch();
    // const userInfo = useSelector( state => state.user )
    // const notesProfessionals = useSelector( state => state.user )
    const [notes, setNotes] = useState({
        title: '',
        note: '',
        day: new Date(),
        // professional: userInfo.license
    });
    const [createNote, setCreateNote] = useState(false);

    useEffect( ()=>{
    //     dispatch(getNotes());
    }, [])

    function hanldeChange(e){
        e.preventDefault();
        setNotes({
            ...notes,
            [e.target.name]: e.target.value
        });
    }

    function handleClick(e){
        e.preventDefault();
        setCreateNote(true);
    }

    function handleNote(e){
        e.preventDefault();
        // dispatch(postNotes(notes));
        setCreateNote(false);
        setNotes({
            title: '',
            note: '',
            day: new Date()
        });
    }

    // function notesProfessionals(e){
    //     e.preventDefault();
    //     dispatch(deleteNotes(e.target.key));
    //
    // REVISAR FLUJO -> PUEDO FILTRAR notesProfessionals PARA RENDERIZARLO EN EL MOMENTO
    //
    // }

    return (
        <div>
            {/* { userInfo && notesProfessionals.lentgh > 0 ? */}
            <div>
                <h1>Medico</h1>
                <div>
                    <h3>Calendario diario {/* Dia acutal */} </h3>
                    <div> 
                    {/* van a ir en columna estilo grilla o google calendar */}
                        <h5>Hora</h5>
                        <h5>Paciente</h5>
                        <h5>Algo mas necesita saber?</h5>
                    </div>
                </div>
                <div>
                    <h3>Block de notas</h3>
                    {/* { // PUEDE SER UN COMPONENTE IGUAL
                        notesProfessionals.length > 0 ?
                        notesProfessionals.map( element => (
                            <div key={element.id}>
                                <h4>{element.title}</h4>
                                <p>{element.note}</p>
                                <button onClick={e => handleDelete(e)} >X</button>
                            </div>
                        ))
                        : null
                    } */}
                    { 
                        createNote === false ?
                        <button onClick={e => handleClick(e)}>Crear nota</button>
                        : <div>
                            <label>Titulo</label>
                            <input name="title" value={notes.title} onChange={e => hanldeChange(e)}/>
                            <label>Nota</label>
                            <input name="note" value={notes.note} onChange={e => hanldeChange(e)}/>
                            <button onClick={e => handleNote(e)}>Añadir nota</button>
                        </div>
                    }
                </div>
                <Link to='/form'>
                    <button>Cargar Historia Clinica</button>
                </Link>
            </div>
            {/* : <Loading/>  */}
        </div>
    )
}


// actions

    // export const GET_NOTES = "GET_NOTES";

    // export function getNotes(license){
    //     return async function (dispatch) {
    //         try {
    //             const notes = await axios('/notes/' + license);

    //             return dispatch({
    //                 type: GET_NOTES,
    //                 payload: notes
    //             })
    //         } catch(e) {
    //             console.log(e.message)
    //         }
    //     }
    // }

    // export function postNotes(payload){
    //     return async function () {
    //         try {
    //             const notes = await axios.post('/notes', payload);
    //             // getNotes(); que onda se puede hacer?
    //             return notes;
    //         } catch(e) {
    //             console.log(e.message)
    //         }
    //     }
    // }

    // export function deleteNotes(payload){
    //     return async function () {
    //         try {
    //             const notes = await axios.delete('/notes/' + payload);

                // REVISAR FLUJO
    //             // getNotes(); que onda se puede hacer?
    //             return dispatch({
    //                  type: GET_NOTES,
    //                  payload: notes
    //             });

    //         } catch(e) {
    //             console.log(e.message)
    //         }
    //     }
    // }

// reducer

    // notes: []

    // case GET_NOTES: 
    //   return { ...state, notes: action.payload };