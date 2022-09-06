import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTurnoProf } from "../../redux/actions";
import styles from "./HomeProfessionals.module.css";
// import { postNotes, getNotes } from "../../redux/actions";

export default function HomeProfessional({ globalUser }) {
  const dispatch = useDispatch();
  const [createNote, setCreateNote] = useState(false);
  const turnos = useSelector(state => state.turnos);
  // const userInfo = useSelector( state => state.user )
  const notesProfessionals = useSelector(state => state.user);
  const [notes, setNotes] = useState({
    title: "",
    note: "",
    day: new Date()
    //professional: userInfo.license
  });

  function hanldeChange(e) {
    e.preventDefault();
    setNotes({
      ...notes,
      [e.target.name]: e.target.value
    });
  }

  function handleClick(e) {
    e.preventDefault();
    setCreateNote(true);
  }

  function handleNote(e) {
    e.preventDefault();
    // dispatch(postNotes(notes));
    setCreateNote(false);
    setNotes({
      title: "",
      note: "",
      day: new Date()
    });
  }
  useEffect(() => {
    dispatch(getTurnoProf(globalUser.id));
    //dispatch(getNotes());
  }, [dispatch, globalUser.id]);
  // function notesProfessionals(e){
  //     e.preventDefault();
  //     dispatch(deleteNotes(e.target.key));
  //
  // REVISAR FLUJO -> PUEDO FILTRAR notesProfessionals PARA RENDERIZARLO EN EL MOMENTO
  //
  // }

  console.log("turnos", turnos);
  return (
    <div className={styles.container}>
      <div className={`${styles.turnosContenedor}`}>
        <div>
          <h3 className={styles.h3}>PROXIMOS TURNOS</h3>
          {turnos.length > 0 ? null : <p>Sin Turnos</p>}
        </div>
        <div className={styles.turnos}>
          {Array.from({ length: 6 })
            .slice(0, 3)
            .map((e, i) => {
              return (
                <ListGroup key={i} variant="flush">
                  <ListGroup.Item>Fecha: Lunes, 4 sept </ListGroup.Item>
                  <ListGroup.Item>Hora: </ListGroup.Item>
                  <ListGroup.Item>
                    Profesional:{" "}
                    {e
                      ? `${e.professional.name} ${e.professional.lastname}`
                      : ""}
                  </ListGroup.Item>
                  <ListGroup.Item>Domicilio: Av Libertador 1521</ListGroup.Item>
                </ListGroup>
              );
            })}
        </div>
      </div>
      <div className={styles.notes}>
        <h3>Block de notas</h3>
        {// PUEDE SER UN COMPONENTE IGUAL
        notesProfessionals.length > 0
          ? notesProfessionals.map(element => (
              <div key={element.id}>
                <h4>{element.title}</h4>
                <p>{element.note}</p>
                <button>X</button>
              </div>
            ))
          : null}
        {createNote === false ? (
          <button onClick={e => handleClick(e)}>Crear nota</button>
        ) : (
          <div>
            <label>Titulo</label>
            <input
              name="title"
              value={notes.title}
              onChange={e => hanldeChange(e)}
            />
            <label>Nota</label>
            <input
              name="note"
              value={notes.note}
              onChange={e => hanldeChange(e)}
            />
            <button onClick={e => handleNote(e)}>Añadir nota</button>
          </div>
        )}
        <Link to="/form">
          <button>Cargar Historia Clinica</button>
        </Link>
      </div>
    </div>
  );
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
//         }
//     }
// }

// reducer

// notes: []

// case GET_NOTES:
//   return { ...state, notes: action.payload };
