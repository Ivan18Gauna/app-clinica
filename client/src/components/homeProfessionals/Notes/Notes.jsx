import React from "react";
import Button from "react-bootstrap/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
/* import { deleteNotes } from "../../../redux/actions"; */
import styles from "./Notes.module.css";

const Notes = ({ notes, deleteNote }) => {
  const dispatch = useDispatch();
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
              <Button
                onClick={() => {
                  const id = e.id;
                  deleteNote(id);
                }}
                variant="danger"
              >
                <DeleteIcon fontSize="large" />
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Notes;
