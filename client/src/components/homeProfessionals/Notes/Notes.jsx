import React from "react";
import Button from "react-bootstrap/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteNotes } from "../../../redux/actions";
import styles from "./Notes.module.css";

const Notes = ({ notes }) => {
  const dispatch = useDispatch();

  const deleteNote = (id) => {
    dispatch(deleteNotes(id));
  };

  return (
    <div className={styles.contenedor}>
      {notes &&
        notes.map(e => (
          <div className={styles.nota}>
            <div>
              <h4>{e.tittle}</h4>
              <p>{e.day}</p>
              <p>{e.note}</p>
            </div>
            <div className={styles.delete}>
              <Button onClick={() => deleteNote(e.id)} variant="danger">
                <DeleteIcon fontSize="large" />
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Notes;
