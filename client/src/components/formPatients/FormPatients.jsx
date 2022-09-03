import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import styles from "./FormPatients.module.css";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Cookie from 'universal-cookie'


function validate(input) {
  let error = {};
  if (!/([A-z])/.test(input.name)) {
    error.name = "Ingrese un nombre valido.";
    return error;
  }
  if (!/([A-z])/.test(input.lastname)) {
    error.lastname = "Ingrese un apellido valido.";
    return error;
  }

  if (!/\S+@\S+\.\S+/.test(input.mail)) {
    error.mail = "Dirección de correo no valida.";
    return error;
  }
  if (
    !/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
      input.password
    )
  ) {
    error.password =
      "La contraseña debe contener al menos 8 digitos, una mayúscula, un número y un caracter especial.";
    return error;
  }
  if (input.password !== input.new_password) {
    error.new_password = "No coincide con la contraseña.";
    return error;
  }
  let newDate = input.birth;
  let Date1 = new Date(newDate);
  let Date2 = new Date();
  if (Date1 >= Date2) {
    error.birth = "La fecha de nacimiento no puede ser posterior a la actual.";
    return error;
  }
  if (!/^\d{5,15}$$/.test(input.document)) {
    error.document = "Número de documento no valido.";
    return error;
  }
  if (!/^\d{10}$$/.test(input.phone)) {
    error.phone = "Número de telefono no valido.";
    return error;
  }
  if (!/[0-9]/.test(input.number)) {
    error.number = "Número no valido.";
    return error;
  } else if (input.number <= 0) {
    error.number = "Número no valida.";
    return error;
  }
  return error;
}

const provinces = [
  "Buenos Aires",
  "Ciudad Autónoma de Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];


export default function RegisterPatient() {

  const { isAuthenticated, user } = useAuth0();
  const history = useHistory();
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    document: "",
    birth: "",
    phone: "",
    mail: isAuthenticated?user.email:"",
    province: "",
    city: "",
    number: "",
    street: "",
    username:"",
    password: isAuthenticated?"Yoivan2.0":"",
    new_password: isAuthenticated?"Yoivan2.0":"",
  });

  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    let objError = validate({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(objError);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      province: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const cookie = new Cookie()
    cookie.set('userEmail', input.mail, {path: '/'})
    setInput({
      name: "",
      lastname: "",
      document: "",
      birth: "",
      phone: "",
      mail: "",
      province: "",
      city: "",
      number: "",
      street: "",
      username: "",
      password: "",
      new_password: "",
    });
    history.push(`/healthData`, input);
  }

  return (
    <div className={styles.container}>
      <Form className={`${styles.form}`} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.titulo}>
          <h3>Crea tu cuenta</h3>
        </div>
        <Row className={`${styles.row}`} lg={2}>
          <Col className={`${styles.col}`}>
            <Form.Control
              type="text"
              name="name"
              placeholder="Nombre"
              value={input.name}
              onChange={handleInput}
              isInvalid={!!error.name}
            />
            <Form.Control.Feedback type="invalid">
              {error.name}
            </Form.Control.Feedback>
          </Col>
          <Col className={`${styles.col}`}>
            <Form.Control
              type="text"
              name="lastname"
              placeholder="Apellido"
              value={input.lastname}
              onChange={handleInput}
              isInvalid={!!error.lastname}
            />
            <Form.Control.Feedback type="invalid">
              {error.lastname}
            </Form.Control.Feedback>
          </Col>
        </Row>
        {/* <Row className={`${styles.row}`} lg={1}>
          <Col className={`${styles.col}`}>
            <Form.Control
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={input.username}
              onChange={handleInput}
            />
          </Col>
        </Row> */}
        {!isAuthenticated && (
          <Row className={`${styles.row}`} lg={1}>
            <Col className={`${styles.col}`}>
              <Form.Control
                type="email"
                name="mail"
                placeholder="Correo electrónico"
                value={input.mail}
                onChange={handleInput}
                isInvalid={!!error.mail}
              />
              <Form.Control.Feedback type="invalid">
                {error.mail}
              </Form.Control.Feedback>
            </Col>
          </Row>
        )}
        {!isAuthenticated && (
          <Row className={`${styles.row}`} lg={2}>
            <Col className={`${styles.col}`}>
              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                value={input.password}
                onChange={handleInput}
                isInvalid={!!error.password}
              />
              <Form.Control.Feedback type="invalid">
                {error.password}
              </Form.Control.Feedback>
            </Col>
            <Col className={`${styles.col}`}>
              <Form.Control
                type="password"
                name="new_password"
                placeholder="Repetir contraseña"
                value={input.new_password}
                onChange={handleInput}
                isInvalid={!!error.new_password}
              />
              <Form.Control.Feedback type="invalid">
                {error.new_password}
              </Form.Control.Feedback>
            </Col>
          </Row>
        )}
        <Row className={`${styles.row}`} lg={1}>
          <Col className={`${styles.col}`}>
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="birth"
              value={input.birth}
              onChange={handleInput}
              isInvalid={!!error.birth}
            />
            <Form.Control.Feedback type="invalid">
              {error.birth}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className={`${styles.row}`} lg={2}>
          <Col className={`${styles.col}`}>
            <Form.Control
              type="number"
              name="document"
              placeholder="Documento DNI"
              value={input.document}
              onChange={handleInput}
              isInvalid={!!error.document}
            />
            <Form.Control.Feedback type="invalid">
              {error.document}
            </Form.Control.Feedback>
          </Col>
          <Col className={`${styles.col}`}>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Número de celular"
              value={input.phone}
              onChange={handleInput}
              isInvalid={!!error.phone}
            />
            <Form.Control.Feedback type="invalid">
              {error.phone}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className={`${styles.row}`} lg={1}>
          <Col className={`${styles.col}`}>
            <Form.Label>Domicilio</Form.Label>
            <Form.Select onChange={handleSelect} defaultValue="Provincia">
              <option value="Provincia" hidden>
                Provincia
              </option>
              {provinces.map((e) => {
                return (
                  <option key={e} value={e}>
                    {e}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
        </Row>
        <Row className={`${styles.row}`} lg={1}>
          <Col className={`${styles.col}`}>
            <Form.Control
              type="text"
              name="city"
              placeholder="Ciudad"
              value={input.city}
              onChange={handleInput}
              isInvalid={!!error.city}
            />
            <Form.Control.Feedback type="invalid">
              {error.phone}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className={`${styles.row}`} lg={2}>
          <Col className={`${styles.col}`}>
            <Form.Control
              type="text"
              name="street"
              placeholder="Calle"
              value={input.street}
              onChange={handleInput}
              isInvalid={!!error.street}
            />
            <Form.Control.Feedback type="invalid">
              {error.street}
            </Form.Control.Feedback>
          </Col>
          <Col className={`${styles.col}`}>
            <Form.Control
              type="number"
              name="number"
              placeholder="Número"
              value={input.number}
              onChange={handleInput}
              isInvalid={!!error.number}
            />
            <Form.Control.Feedback type="invalid">
              {error.number}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className={`${styles.row}`} lg={1}>
          <Col className={`${styles.col}`}>
            {input.name === "" ||
            input.lastname === "" ||
            input.document === "" ||
            input.phone === "" ||
            // input.mail === "" ||
            input.province === "" ||
            input.city === "" ||
            input.street === "" ||
            input.number === "" ||
            // input.password === "" ||
            // input.new_password === "" ||
            error.name ||
            error.lastname ||
            error.document ||
            error.birth ||
            error.phone ||
            // error.mail ||
            // error.password ||
            // error.new_password ||
            error.number 
            ? (
              <Button
                disabled
                variant="danger"
                className={`${styles.buttonSubmit}`}
              >
                Faltan datos por completar
              </Button>
            ) : (
              <Button
                className={`${styles.buttonSubmit}`}
                type="submit"
                variant="success"
              >
                Siguiente
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
