import axios from "axios";
import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./FormUpProfessionals.module.css";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatients,
  getPatientsByName,
  getUserDetail,
  postHistory
} from "../../redux/actions";
import Cookies from "universal-cookie";

function validate(input) {
  let error = {};

  if (!/([0-9])/.test(input.patient)) {
    error.patient = "Ingrese un DNI válido";
    return error;
  }

  if (!/([A-Za-z0-9])/.test(input.reason)) {
    error.reason = "Ingrese un motivo válido";
    return error;
  }
  if (!/([A-Za-z0-9])/.test(input.description)) {
    error.description = "Ingrese una descripción válida";
    return error;
  }
  if (!/([A-Za-z0-9])/.test(input.diagnosis)) {
    error.diagnosis = "Ingrese un diagnostico válido";
    return error;
  }
  let newDate = input.date;
  let Date1 = new Date(newDate);
  let Date2 = new Date();
  let Date3 = (Date2 - Date1) / (1000 * 60 * 60 * 24 * 365);
  if (Date1 > Date2) {
    error.date = "La fecha no puede ser posterior a la actual.";
    return error;
  } else if (Date3 > 73) {
    error.date = "La fecha no puede ser anterior a 1950.";
    return error;
  }
  return error;
}

export default function FormUpProfessionals() {
  const dispatch = useDispatch();
  const allPatients = useSelector(state => state.patients);
  const globalUser = useSelector(state => state.user);
  const [imagen, setImagen] = useState("");
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    reason: "",
    image: "",
    description: "",
    date: "",
    diagnosis: "",
    patient: "",
    professional: ""
  });

  useEffect(() => {
    const cookies = new Cookies();
    dispatch(getUserDetail(cookies.get("userEmail")));
    dispatch(getPatients());
  }, [dispatch]);

  function handleMotivo(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    let existeError = validate({
      ...input,
      [e.target.name]: e.target.value
    });
    setError(existeError);
  }

  function handleSearch(e) {
    e.preventDefault();
    setInput({
      ...input,
      professional: globalUser.id
    });
    dispatch(getPatientsByName(input.patient));
  }

  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "appclinica");

    const respuesta = await axios.post(
      "https://api.cloudinary.com/v1_1/appclinica/image/upload",
      data
    );

    setImagen(respuesta.data.secure_url);
    setInput({
      ...input,
      image: respuesta.data.secure_url
    });
  };

  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(postHistory(input));
    swal({
      icon: "success",
      title:
        "Registraste correctamente tu atención a  " +
        allPatients.name +
        " " +
        allPatients.lastname
    });
    setInput({
      reason: "",
      image: "",
      description: "",
      date: "",
      diagnosis: "",
      patient: ""
    });
  }

  return (
    <div className={styles.container}>
      <Form className={`${styles.form}`} onSubmit={handleSubmit}>
        <div className={styles.titulo}>
          <h3>Historia Clínica</h3>
        </div>
        <Row lg={2} className={`${styles.row}`}>
          <Col className={`${styles.col}`} lg={8}>
            <Form.Label>Ingrese el número de documento del Paciente</Form.Label>
            <Form.Control
              type="search"
              name="patient"
              value={input.patient}
              placeholder="Nro de documento"
              onChange={handleMotivo}
              isInvalid={!!error.patient}
            />
            <Form.Control.Feedback type="invalid">
              {error.patient}
            </Form.Control.Feedback>
          </Col>
          <Col className={`${styles.col}`} lg={4}>
            <Button className={`${styles.buttonSubmit}`} onClick={handleSearch}>
              Buscar Paciente
            </Button>
          </Col>
        </Row>
        <Row className={`${styles.row}`}>
          <Col className={`${styles.col}`}>
            {allPatients && allPatients.document === parseInt(input.patient) ? (
              <div>
                <p>Nombre: {allPatients.name}</p>
                <p>Apellido: {allPatients.lastname}</p>
              </div>
            ) : (
              <div>No se encontró paciente</div>
            )}
          </Col>
        </Row>
        <Row className={`${styles.row}`}>
          <Col className={`${styles.col}`}>
            <Form.Label>Ingrese el motivo de la consulta</Form.Label>
            <Form.Control
              type="text"
              name="reason"
              value={input.reason}
              onChange={handleMotivo}
              isInvalid={!!error.reason}
            />
            <Form.Control.Feedback type="invalid">
              {error.reason}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className={`${styles.row}`}>
          <Col className={`${styles.col}`}>
            <Form.Label>Estudio digital</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={uploadImage}
              isInvalid={!!error.image}
            />
            <div>
              <img src={imagen} alt="" />
            </div>

            <Form.Control.Feedback type="invalid">
              {error.image}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className={`${styles.row}`}>
          <Col className={`${styles.col}`}>
            <Form.Label>Descripción consulta</Form.Label>
            <Form.Control
              type="textarea"
              name="description"
              value={input.description}
              onChange={handleMotivo}
              isInvalid={!!error.description}
            />
            <Form.Control.Feedback type="invalid">
              {error.description}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className={`${styles.row}`}>
          <Col className={`${styles.col}`}>
            <Form.Label>Fecha atención</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={input.date}
              onChange={handleMotivo}
              isInvalid={!!error.date}
            />
            <Form.Control.Feedback type="invalid">
              {error.date}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className={`${styles.row}`}>
          <Col className={`${styles.col}`}>
            <Form.Label>Diagnostico final</Form.Label>
            <Form.Control
              type="textarea"
              name="diagnosis"
              value={input.diagnosis}
              onChange={handleMotivo}
              isInvalid={!!error.diagnosis}
            />
            <Form.Control.Feedback type="invalid">
              {error.diagnosis}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className={`${styles.row}`}>
          <Col lg={6} className={`${styles.col}`}>
            {input.patient !== allPatients.document ||
            input.patient === "" ||
            input.reason === "" ||
            input.description === "" ||
            input.date === "" ||
            input.diagnosis === "" ||
            error.date ? (
              <Button
                className={`${styles.buttonSubmit}`}
                variant="danger"
                disabled
              >
                Faltan datos por completar
              </Button>
            ) : (
              <Button className={`${styles.buttonSubmit}`} type="subtmit">
                Enviar
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
// todo ok
