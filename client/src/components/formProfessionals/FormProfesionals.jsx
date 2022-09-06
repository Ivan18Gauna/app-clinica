import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "../formPatients/FormPatients.module.css";
import stylesTable from "../healthData/HealthData.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get_specialties, registerDoctors } from "../../redux/actions";
import swal from 'sweetalert';

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
      "La contraseña debe contener al menos 8 digitos, una mayúscula y un número.";
    return error;
  }
  if (input.password !== input.new_password) {
    error.new_password = "No coincide con la contraseña.";
    return error;
  }
  let newDate = input.birth;
  let Date1 = new Date(newDate);
  let Date2 = new Date();
  let Date3 = (Date2 - Date1) / (1000 * 60 * 60 * 24 * 365);
  if (Date1 >= Date2) {
    error.birth = "La fecha de nacimiento no puede ser posterior a la actual.";
    return error;
  } else if (Date3 < 18.011) {
    error.birth = "Debes ser mayor de 18 años para registrarte.";
    return error;
  }
  if (!/[0-9]/.test(input.license)) {
    error.license = "Matrícula no valida.";
    return error;
  } else if (input.license <= 0) {
    error.license = "Matrícula no valida.";
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
  "Tucumán"
];

export default function RegisterDoctor() {
  const dispatch = useDispatch();
  const especialities_data = useSelector(state => state.specialties);
  const history = useHistory();

  useEffect(() => {
    dispatch(get_specialties());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    specialty: [],
    license: "",
    birth: "",
    phone: "",
    mail: "",
    province: "",
    city: "",
    number: "",
    street: "",
    username: "",
    password: "",
    new_password: ""
  });

  const [error, setError] = useState({});

  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    let objError = validate({
      ...input,
      [e.target.name]: e.target.value
    });
    setError(objError);
  }

  function handleSelectProvince(e) {
    setInput({
      ...input,
      province: e.target.value
    });
  }

  function handleSelectSpecialities(e) {
    if (input.specialty.includes(e.target.value)) {
      swal({
        icon: 'warning',
        title: "Ya se seleccionó la especialidad."
      });
    } else {
      setInput({
        ...input,
        specialty: [...input.specialty, e.target.value]
      });
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      specialty: input.specialty.filter(el => el !== e.target.value)
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registerDoctors(input));
    swal({
      icon: 'success',
      title: 'Usuario registrado.',
      timer: 1500
    })
    setInput({
      name: "",
      lastname: "",
      specialty: [],
      license: "",
      birth: "",
      phone: "",
      mail: "",
      province: "",
      city: "",
      number: "",
      street: "",
      username: "",
      password: "",
      new_password: ""
    });
    history.push("/home");
  }

  return (
    <div className={styles.container}>
      <Form className={`${styles.form}`} onSubmit={handleSubmit}>
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
							isInvalid={!!error.username}
						/>
						<Form.Control.Feedback type="invalid">
							{error.username}
						</Form.Control.Feedback>
					</Col>
				</Row> */}
        <Row className={`${styles.row}`} lg={1}>
          <Col className={`${styles.col}`}>
            <Form.Control
              type="text"
              name="mail"
              placeholder="Correo electronico"
              value={input.mail}
              onChange={handleInput}
              isInvalid={!!error.mail}
            />
            <Form.Control.Feedback type="invalid">
              {error.lastname}
            </Form.Control.Feedback>
          </Col>
        </Row>
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
              name="license"
              placeholder="Número de matricula"
              value={input.license}
              onChange={handleInput}
              isInvalid={!!error.license}
            />
            <Form.Control.Feedback type="invalid">
              {error.license}
            </Form.Control.Feedback>
          </Col>
          <Col className={`${styles.col}`}>
            <Form.Control
              type="text"
              name="phone"
              placeholder="Numero de celular"
              value={input.phone}
              onChange={handleInput}
              isInvalid={!!error.phone}
            />
            <Form.Control.Feedback type="invalid">
              {error.phone}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className={`${styles.row}`} lg={2}>
          <Col className={`${styles.col}`}>
            <Form.Select
              onChange={handleSelectProvince}
              defaultValue="Provincia"
            >
              <option value="Provincia">Provincia</option>
              {provinces.map(e => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </Form.Select>
          </Col>
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
              {error.city}
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
              {error.street}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <div className={stylesTable.vacunas}>
          <Row className={`${stylesTable.row}`}>
            <Col className={`${stylesTable.col}`}>
              <Form.Label>Especialidad medica</Form.Label>
              <Form.Select
                onChange={handleSelectSpecialities}
                defaultValue="Seleccione una opción"
              >
                <option value="Seleccione una opción">
                  Seleccione una opción
                </option>
                {especialities_data.map(e => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Col className={`${stylesTable.tabla}`}>
            <ListGroup className={stylesTable.lista}>
              {input.specialty.map(e => (
                <ListGroup.Item className={stylesTable.fila}>
                  {e}
                  <Button variant="danger" value={e} onClick={handleDelete}>
                    X
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </div>
        <Row className={`${styles.row}`} lg={1}>
          <Col className={`${styles.col}`} lg={6}>
            {input.name === "" ||
              input.lastname === "" ||
              input.license === "" ||
              input.phone === "" ||
              input.mail === "" ||
              input.province === "" ||
              input.city === "" ||
              input.street === "" ||
              input.number === "" ||
              // input.username === '' ||
              input.password === "" ||
              input.new_password === "" ||
              input.specialty.length < 1 ||
              error.name ||
              error.lastname ||
              error.license ||
              error.phone ||
              error.mail ||
              error.number ||
              error.password ||
              error.new_password ? (
              <Button
                className={`${styles.buttonSubmit}`}
                variant="danger"
                disabled
              >
                Faltan datos por completar
              </Button>
            ) : (
              <Button
                className={`${styles.buttonSubmit}`}
                type="submit"
                variant="success"
              >
                Enviar
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
}
