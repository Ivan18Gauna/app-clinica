import React, { useState } from 'react';
import doctor from '../../Icons/iconfinder-icon.svg';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserDetail, modifyProfessionals } from '../../redux/actions';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import stylesForm from '../formPatients/FormPatients.module.css'
import styles from './ProfessionalsProfile.module.css';
import Loading from '../loading/Loading';
import Cookies from 'universal-cookie';
import { inputAdornmentClasses } from '@mui/material';


function validate(input) {
    let error = {};
    if (input.name && !/([A-z])/.test(input.name)) {
        error.name = 'Ingrese un nombre valido.';
        return error;
    }
    if (input.lastname && !/([A-z])/.test(input.lastname)) {
        error.lastname = 'Ingrese un apellido valido.';
        return error;
    }
    if (input.mail && !/\S+@\S+\.\S+/.test(input.mail)) {
        error.mail = 'Dirección de correo no valida.';
        return error;
    }
    if (input.password &&
        !/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
            input.password
        )
    ) {
        error.password =
            'La contraseña debe contener al menos 8 digitos, una mayúscula, un número y un caracter especial.';
        return error;
    }
    if (input.password !== input.new_password) {
        error.new_password = 'No coincide con la contraseña.';
        return error;
    }
    let newDate = input.birth;
    let Date1 = new Date(newDate);
    let Date2 = new Date();
    let Date3 = (Date2 - Date1) / (1000 * 60 * 60 * 24 * 365);
    if (input.birth && (Date1 >= Date2)) {
        error.birth = 'La fecha de nacimiento no puede ser posterior a la actual.';
        return error;
    } else if (input.birth && (Date3 < 18.011)) {
        error.birth = 'Debes ser mayor de 18 años para registrarte.';
        return error;
    }
    if (input.license && !/[0-9]/.test(input.license)) {
        error.license = 'Matrícula no valida.';
        return error;
    } else if (input.license && input.license <= 0) {
        error.license = 'Matrícula no valida.';
        return error;
    }
    if (input.phone && !/^\d{10}$$/.test(input.phone)) {
        error.phone = 'Número de telefono no valido.';
        return error;
    }
    if (input.number && !/[0-9]/.test(input.number)) {
        error.number = 'Número no valido.';
        return error;
    } else if (input.number && (input.number <= 0)) {
        error.number = 'Número no valida.';
        return error;
    }
    return error;
}

const provinces = [
    'Buenos Aires',
    'Ciudad Autónoma de Buenos Aires',
    'Catamarca',
    'Chaco',
    'Chubut',
    'Córdoba',
    'Corrientes',
    'Entre Ríos',
    'Formosa',
    'Jujuy',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'Misiones',
    'Neuquén',
    'Río Negro',
    'Salta',
    'San Juan',
    'San Luis',
    'Santa Cruz',
    'Santa Fe',
    'Santiago del Estero',
    'Tierra del Fuego',
    'Tucumán',
];

export default function ProfessionalProfile({ globalUser, specialties }) {


    const dispatch = useDispatch();
    const { user, logout, isAuthenticated } = useAuth0();
    const history = useHistory();
    const cookie = new Cookies();
    const [editInfoPersonal, setEditInfoPersonal] = useState(false);
    const [error, setError] = useState({});
    const [input, setInput] = useState({});

    const uploadImage = async (e) => {

        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "appclinica");

        const respuesta = await axios.post(
            "https://api.cloudinary.com/v1_1/appclinica/image/upload", data
        );

        setInput({
            ...input,
            avatar: respuesta.data.secure_url
        })
    }
    console.log('user', globalUser)
    if ((isAuthenticated && !globalUser) || (isAuthenticated && globalUser && !globalUser.name)) {
        dispatch(getUserDetail(user.email));
    }
    if (globalUser && !globalUser.name) {
        dispatch(getUserDetail(globalUser.mail));
    }


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


    function handleSelectProvince(e) {
        setInput({
            ...input,
            province: e.target.value,
        });
    }

    function handleSelectSpecialities(e) {
        if (input.specialty && input.specialty.length > 0 &&
             input.specialty.includes(e.target.value)) {
            alert('Ya se selecciono la especialidad.');
        } else {
            setInput({
                ...input,
                specialty: [...input.specialty, e.target.value],
            });
        }
    }
    console.log('input', input);

    function handleDelete(e) {
        e.preventDefault();
        setInput({
            ...input,
            specialty: input.specialty.filter((el) => el !== e.target.value),
        });
    }
    function handleInfoPersonal(e) {
        e.preventDefault();
        setEditInfoPersonal(true);
    }
    function handleCancel(e) {
        e.preventDefault();
        setEditInfoPersonal(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(modifyProfessionals(input, globalUser.id, globalUser.mail));
        // setInput({
        //     name: '',
        //     lastname: '',
        //     specialty: [],
        //     license: '',
        //     birth: '',
        //     phone: '',
        //     mail: '',
        //     province: '',
        //     city: '',
        //     number: '',
        //     street: '',
        //     username: '',
        //     password: '',
        //     new_password: '',
        // });
        setEditInfoPersonal(false);
        setInput({})
        history.push('/userProfile')
    }


    return (


        <div className={styles.container}>
            <div className={styles.perfil}>
                <img src={doctor} alt="imagen no disponible" />
                <h4>
                    {globalUser.name} {globalUser.lastname}
                </h4>
            </div>
            <div className={styles.acordion}>
                <Accordion className={styles.acordionContenido}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Mis Datos</Accordion.Header>
                        <Accordion.Body>
                            <p>Especialidad: {globalUser.specialty && globalUser.specialty.length > 0 &&
                                globalUser.specialty.map(el => <p> {el} </p>)} </p>
                            <p>Fecha de nacimiento: {globalUser.birth}</p>
                            <p>Número de Matricula {globalUser.license}</p>
                            <p>Número de telefono: {globalUser.phone}</p>
                            <p>Email: {globalUser.mail}</p>
                            <p>Provincia: {globalUser.province}</p>
                            <p>Ciudad: {globalUser.city}</p>
                            <p>Calle: {globalUser.street}</p>
                            <p>Número: {globalUser.number}</p>
                            {editInfoPersonal === false ? (
                                <Button onClick={handleInfoPersonal}>
                                    Editar información personal
                                </Button>
                            ) : (
                                <div className={stylesForm.container}>
                                    <Form className={`${stylesForm.form}`} onSubmit={handleSubmit}>
                                        <div className={stylesForm.titulo}>
                                            <h3>Editar Información personal</h3>
                                        </div>
                                        <Row className={`${stylesForm.row}`} lg={2}>
                                            <Col className={`${stylesForm.col}`}>
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
                                            <Col className={`${stylesForm.col}`}>
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
                                            <Col>
                                                <Form.Control
                                                    type="file"
                                                    name="avatar"
                                                    placeholder='Cambie su imagen'
                                                    onChange={uploadImage}
                                                />
                                            </Col>
                                        </Row>
                                        {/* <Row className={`${stylesForm.row}`} lg={1}>
                                            <Col className={`${stylesForm.col}`}>
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
                                        <Row className={`${stylesForm.row}`} lg={1}>
                                            <Col className={`${stylesForm.col}`}>
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
                                        <Row className={`${stylesForm.row}`} lg={2}>
                                            <Col className={`${stylesForm.col}`}>
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
                                            <Col className={`${stylesForm.col}`}>
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
                                        <Row className={`${stylesForm.row}`} lg={1}>
                                            <Col className={`${stylesForm.col}`}>
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
                                        <Row className={`${stylesForm.row}`} lg={2}>
                                            <Col className={`${stylesForm.col}`}>
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
                                            <Col className={`${stylesForm.col}`}>
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
                                        <Row className={`${stylesForm.row}`} lg={2}>
                                            <Col className={`${stylesForm.col}`}>
                                                <Form.Select
                                                    onChange={handleSelectProvince}
                                                    defaultValue="Provincia"
                                                >
                                                    <option value="Provincia">Provincia</option>
                                                    {provinces.map((e) => (
                                                        <option key={e} value={e}>
                                                            {e}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                            <Col className={`${stylesForm.col}`}>
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
                                        <Row className={`${stylesForm.row}`} lg={2}>
                                            <Col className={`${stylesForm.col}`}>
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
                                            <Col className={`${stylesForm.col}`}>
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
                                        <Row className={`${stylesForm.row}`}>
                                            <Col className={`${stylesForm.col}`}>
                                                <Form.Label>Especialidad medica</Form.Label>
                                                <Form.Select
                                                    onChange={handleSelectSpecialities}
                                                    defaultValue="Seleccione una opción"
                                                >
                                                    <option value="Seleccione una opción">
                                                        Seleccione una opción
                                                    </option>
                                                    {specialties && specialties.map((e) => (
                                                        <option key={e.id} value={e.name}>
                                                            {e.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <div>
                                            <ul>
                                                {input.specialty && input.specialty.length > 0 && input.specialty.map((e) => (
                                                    <li key={e} value={e}>
                                                        {e}
                                                        <Button variant="danger" value={e} onClick={handleDelete}>
                                                            X
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Row className={`${stylesForm.row}`} lg={1}>
                                            <Col className={`${stylesForm.col}`} lg={6}>
                                                <Button
                                                    className={`${stylesForm.buttonSubmit}`}
                                                    variant="success"
                                                    onClick={handleCancel}
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button
                                                    className={`${stylesForm.buttonSubmit}`}
                                                    type="submit"
                                                    variant="success"
                                                    onClick={handleSubmit}
                                                >
                                                    Enviar
                                                </Button>

                                            </Col>
                                        </Row>
                                    </Form>
                                </div>

                            )
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

        </div>


    )

}