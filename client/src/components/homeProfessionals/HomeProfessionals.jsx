import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTurnoProf,
  postNotes,
  getNotes,
  deleteNotes
} from "../../redux/actions";
import styles from "./HomeProfessionals.module.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Notes from "./Notes/Notes.jsx";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const schema = yup
  .object({
    title: yup.string().required("Este campo es requerido"),
    note: yup
      .string()
      .max(100)
      .required("Este campo es requerido")
  })
  .required();

export default function HomeProfessional({ globalUser }) {
  const dispatch = useDispatch();
  const turnos = useSelector(state => state.turnos);
  const notes = useSelector(state => state.notes);
  const userInfo = useSelector(state => state.user);
  const notesProfessionals = useSelector(state => state.user);
  const [createNote, setCreateNote] = useState(false);
  const [state, setState] = useState([]);

  const [num, setNum] = useState(1);
  const deleteNote = id => {
    setNum(num + 1);
    dispatch(deleteNotes(id));
  };

  const onSubmitNote = data => {
    setNum(num + 1);
    dispatch(postNotes(data)).then(res => setState(res.data.id));
    setCreateNote(false);
  };

  useEffect(() => {
    dispatch(getTurnoProf(globalUser.id));
    dispatch(getNotes(globalUser.id));
  }, [state]);

  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      note: "",
      professional: userInfo.id,
      day: new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    }
  });

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.turnosContenedor}`}>
          <div className={styles.titulo}>
            <h3>PROXIMOS TURNOS</h3>
            {turnos.length > 0 ? null : <p>Sin Turnos</p>}
          </div>
          <div className={styles.turnos}>
            <TableContainer component={Paper} className={styles.prueba}>
              <Table sx={{ minWidth: 250 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell align="right">Hora</TableCell>
                    <TableCell align="right">Paciente</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {turnos.map((paciente, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {`${paciente.date.split("de")[0]} de ${
                          paciente.date.split("de")[1]
                        }`}
                      </TableCell>
                      <TableCell align="right">{paciente.time}</TableCell>
                      <TableCell align="right">
                        {paciente.patient.name} {paciente.patient.lastname}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className={styles.notesContenedor}>
          <div>
            <h3>NOTAS</h3>
            {notesProfessionals.length > 0
              ? notesProfessionals.map(element => (
                  <div key={element.id}>
                    <h4>{element.title}</h4>
                    <p>{element.note}</p>
                    <button>X</button>
                  </div>
                ))
              : null}
            {createNote === false ? (
              <Button
                className="mt-3 mb-3"
                onClick={() => {
                  setCreateNote(true);
                }}
              >
                Agregar Nota
              </Button>
            ) : (
              <Form onSubmit={handleSubmit(onSubmitNote)}>
                <Form.Group className="mb-3 mt-4">
                  <Form.Control
                    {...register("title")}
                    placeholder="Titulo"
                    type="text"
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                  <Form.Control
                    {...register("note")}
                    placeholder="Escribe tu nota aqui"
                    maxlength={100}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Button
                  onClick={() => {
                    setNum(num + 1);
                  }}
                  className="mb-3 me-2 mt-2"
                  type="submit"
                >
                  Guardar
                </Button>
                <Button
                  className="mt-2 mb-3"
                  type="button"
                  onClick={() => {
                    setCreateNote(false);
                  }}
                >
                  Cancelar
                </Button>
              </Form>
            )}
          </div>
          {notes.length > 0 ? (
            <Notes
              num={num}
              userInfo={userInfo}
              notes={notes}
              deleteNote={deleteNote}
            />
          ) : null}
        </div>
      </div>
      <Link to="/form">
        <button>Cargar Historia Clinica</button>
      </Link>
    </>
  );
}
