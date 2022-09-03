import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
 import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTurnoProf } from "../../redux/actions";
// import Loading from "../loading/Loading";
// import { postNotes, getNotes } from "../../redux/actions";

export default function HomeProfessional(globalUser) {
   const dispatch = useDispatch();
  // const userInfo = useSelector( state => state.user )
  // const notesProfessionals = useSelector( state => state.user )
  const [notes, setNotes] = useState({
    title: "",
    note: "",
    day: new Date(),
    // professional: userInfo.license
  });
  const [createNote, setCreateNote] = useState(false);

  useEffect(() => {
    dispatch(getTurnoProf(globalUser.id))
    //     dispatch(getNotes());
  }, []);
  const turnos = useSelector((state) => state.turnos)

  function hanldeChange(e) {
    e.preventDefault();
    setNotes({
      ...notes,
      [e.target.name]: e.target.value,
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
      day: new Date(),
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
        <Card style={{ width: "22rem" }}>
          <Card.Body>
            <Card.Title>Proximos Turnos</Card.Title>
            <Card.Text>
              Recorda pedirle a tu medico que actualice tu historia clinica!
            </Card.Text>
            ------------------------------------
            {turnos.map((e, i) => {
              if (i <= 1) {
                return (
                  <ListGroup variant="flush">
                    <ListGroup.Item>Fecha: {e ? e.date : ""}</ListGroup.Item>
                    <ListGroup.Item>Hora: {e ? e.time : ""}</ListGroup.Item>
                    <ListGroup.Item>
                      Profesional: {e ? e.professional.name : ""}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Domicilio: Av Libertador 1521
                    </ListGroup.Item>
                    ------------------------------------
                    <br />
                  </ListGroup>
                );
              }
            })}
            <br />
            <Card.Link href="#">Cancelar turno</Card.Link>
            <Card.Link href="#">Pedir otro turno</Card.Link>
          </Card.Body>
        </Card>
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
          {createNote === false ? (
            <button onClick={(e) => handleClick(e)}>Crear nota</button>
          ) : (
            <div>
              <label>Titulo</label>
              <input
                name="title"
                value={notes.title}
                onChange={(e) => hanldeChange(e)}
              />
              <label>Nota</label>
              <input
                name="note"
                value={notes.note}
                onChange={(e) => hanldeChange(e)}
              />
              <button onClick={(e) => handleNote(e)}>Añadir nota</button>
            </div>
          )}
        </div>
        <Link to="/form">
          <button>Cargar Historia Clinica</button>
        </Link>
      </div>
      {/* : <Loading/>  */}
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
