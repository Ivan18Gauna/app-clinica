import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPatientsDetail } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from './PatientsProfile.module.css';

const blood_type = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB+', 'AB-', 'O+', 'O-'];
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

function validate(info) {
	let error = {};
	if (!/([A-z])/.test(info.name)) {
		error.name = 'Ingrese un nombre valido.';
		return error;
	}
	if (!/([A-z])/.test(info.lastname)) {
		error.lastname = 'Ingrese un apellido valido.';
		return error;
	}

	if (!/\S+@\S+\.\S+/.test(info.mail)) {
		error.mail = 'Dirección de correo no valida.';
		return error;
	}
	if (
		!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
			info.password
		)
	) {
		error.password =
			'La contraseña debe contener al menos 8 digitos, una mayúscula, un número y un caracter especial.';
		return error;
	}
	if (info.password !== info.new_password) {
		error.new_password = 'No coincide con la contraseña.';
		return error;
	}
	let newDate = info.birth;
	let Date1 = new Date(newDate);
	let Date2 = new Date();
	if (Date1 >= Date2) {
		error.birth = 'La fecha de nacimiento no puede ser posterior a la actual.';
		return error;
	}
	if (!/^\d{5,15}$$/.test(info.document)) {
		error.document = 'Número de documento no valido.';
		return error;
	}
	if (!/^\d{8,15}$$/.test(info.phone)) {
		error.phone = 'Número de telefono no valido.';
		return error;
	}
	if (!/[0-9]/.test(info.number)) {
		error.number = 'Número no valido.';
		return error;
	} else if (info.number <= 0) {
		error.number = 'Número no valida.';
		return error;
	}
	return error;
}


export default function UserProfile() {

    const { user } = useAuth0()

    const dispatch = useDispatch();

    const patient = useSelector((state) => state.user)
    const [editInfoPersonal, setEditInfoPersonal] = useState(false)
    const [editInfoSalud, setEditInfoSalud] = useState(false)
    const [info, setInfo] = useState({
        name: '',
        lastname: '',
        document: '',
        birth: '',
        phone: '',
        mail: '',
        province: '',
        city: '',
        number: '',
        street: '',
        username: '',
        password: '',
        new_password: '',
        blood: '',
        vaccines: [],
        allergies: [],
        donation: '',
        transfusion: '',
        chronicles: [],
        oS: '',

    })

    const[error,setError]=useState({})

    // useEffect(() => {
    //     dispatch(getPatientsDetail(user.email))
    // }, [dispatch, user.email])

    // let patient_=patient.filter(el=>el.mail===user.email)


    function handleInfoPersonal(e) {
        e.preventDefault();
        setEditInfoPersonal(true);
    }

    function handleInput(e) {
        e.preventDefault()
		setInfo({
			...info,
			[e.target.name]: e.target.value,
		});
        let objError=validate({
            ...info,
            [e.target.name]:e.target.value
        })
        setError(objError)
    }

    function handleSelect(e) {
		setInfo({
			...info,
			province: e.target.value,
		});
	}

    console.log('info',info)

    function handleCancel(e) {
        e.preventDefault();
        setEditInfoPersonal(false)
    }
    function handleInfoSalud(e) {
        e.preventDefault()
        setEditInfoSalud(true)
    }

    function handleSubmit(e){
        e.preventDefault()
        
    }

    return (
        <div>
            {
                editInfoPersonal === false ?
                    <aside>
                        <p>Aca iría la foto</p>
                        <img src="https://www.webespacio.com/wp-content/uploads/2012/01/foto-perfil.jpg" alt="imagen no disponible" />

                        <div>
                            <p>
                                Nombre:{patient.name}
                            </p>
                            <p>
                                Apellido: {patient.lastname}
                            </p>
                            <p>
                                Fecha de nacimiento: {patient.birth}
                            </p>
                            <p>
                                Número de Documento:{patient.document}
                            </p>
                            <p>
                                Número de telefono: {patient.phone}
                            </p>
                            <p>
                                Email: {patient.mail}
                            </p>
                            <p>
                                Provincia: {patient.province}
                            </p>
                            <p>
                                Ciudad: {patient.city}
                            </p>
                            <p>
                                Calle: {patient.street}
                            </p>
                            <p>
                                Número: {patient.number}
                            </p>
                        </div>

                    </aside>
                    :
                    <p>'' </p>
            }
            <div>
                {
                    editInfoPersonal === false ?
                        <button onClick={handleInfoPersonal} >Editar información personal</button>
                        :
                        <div className={styles.container}>
			<Form className={`${styles.form}`} onSubmit={(e) => handleSubmit(e)}>
				<div className={styles.titulo}>
					<h3>Editar información personal:</h3>
				</div>
				<Row className={`${styles.row}`} lg={2}>
					<Col className={`${styles.col}`}>
						<Form.Control
							type="text"
							name="name"
							placeholder="Nombre"
							value={info.name}
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
							value={info.lastname}
							onChange={handleInput}
							isInvalid={!!error.lastname}
						/>
						<Form.Control.Feedback type="invalid">
							{error.lastname}
						</Form.Control.Feedback>
					</Col>
				</Row>
				<Row className={`${styles.row}`} lg={1}>
					<Col className={`${styles.col}`}>
						<Form.Control
							type="text"
							name="username"
							placeholder="Nombre de usuario"
							value={info.username}
							onChange={handleInput}
						/>
					</Col>
				</Row>
				<Row className={`${styles.row}`} lg={1}>
					<Col className={`${styles.col}`}>
						<Form.Control
							type="email"
							name="mail"
							placeholder="Correo electrónico"
							value={info.mail}
							onChange={handleInput}
							isInvalid={!!error.mail}
						/>
						<Form.Control.Feedback type="invalid">
							{error.mail}
						</Form.Control.Feedback>
					</Col>
				</Row>
				<Row className={`${styles.row}`} lg={2}>
					<Col className={`${styles.col}`}>
						<Form.Control
							type="password"
							name="password"
							placeholder="Contraseña"
							value={info.password}
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
							value={info.new_password}
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
							value={info.birth}
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
							value={info.document}
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
							value={info.phone}
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
							value={info.city}
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
							value={info.street}
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
							value={info.number}
							onChange={handleInput}
							isInvalid={!!error.number}
						/>
						<Form.Control.Feedback type="invalid">
							{error.number}
						</Form.Control.Feedback>
					</Col>
				</Row>
			</Form>
		</div>
                }


            </div>
            {
                editInfoSalud === false ?
                    <div>
                        <h5>Información de salud básica: </h5>
                        <p>Grupo Sanguineo:</p>
                        {patient.blood ? patient.blood : 'Sin información'}
                        <p>Obra Social:</p>
                        {patient.oS}
                        <p>Vacunas que posee aplicadas:</p>
                        {patient.vaccine ? patient.blood : 'Sin información'}
                        <p>Alergias: </p>
                        {patient.allergies ? patient.allergies : 'Sin información'}
                        <p>Enfermedades Crónicas: </p>
                        {patient.chronicles ? patient.chronicles : 'Sin información'}
                        <p>Es donante?</p>
                        {patient.donation ? patient.donation : 'Sin información'}
                        <p>Es transfundible?</p>
                        {patient.transfusion ? patient.transfusion : 'Sin información'}
                        <p>Obra Social:</p>
                        {patient.oS ? patient.oS : 'Sin información'}


                    </div>
                    :
                    <p>Editar información de salud</p>
            }
            {
                editInfoSalud === false ?
                    <button onClick={handleInfoSalud}>Editar información de salud</button>
                    :
                    <select name="" id=""></select>
            }
        </div>
    )
}