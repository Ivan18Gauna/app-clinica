import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import styles from './FormPatients.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function validate(input) {
	let error = {};
	if (!/([A-z])/.test(input.name)) {
		error.name = 'Ingrese un nombre valido.';
	}
	if (!/([A-z])/.test(input.lastname)) {
		error.lastname = 'Ingrese un apellido valido.';
	}
	if (!/^\d{10}$$/.test(input.document)) {
		error.document = 'Número de documento no valido.';
	}
	if (!/^\d{10}$$/.test(input.phone)) {
		error.phone = 'Número de telefono no valido.';
	}
	if (!/\S+@\S+\.\S+/.test(input.mail)) {
		error.mail = 'Dirección de correo no valida.';
	}
	if (!/[0-9]/.test(input.number)) {
		error.number = 'Número no valido.';
	} else if (input.number <= 0) {
		error.number = 'Número no valida.';
	}

	if (
		!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
			input.password
		)
	) {
		error.password =
			'La contraseña debe contener al menos 8 digitos, una mayúscula, un número y un caracter especial.';
	}

	if (input.password !== input.new_password) {
		error.new_password = 'No coincide con la contraseña.';
	}

	let newDate = input.birth;
	let Date1 = new Date(newDate);
	let Date2 = new Date();
	if (Date1 >= Date2) {
		error.birth = 'La fecha de nacimiento no puede ser posterior a la actual.';
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

export default function RegisterPatient() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [error, setError] = useState({});

	const [input, setInput] = useState({
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
	console.log('input', input);
	console.log('error', error);

	function handleSelect(e) {
		setInput({
			...input,
			province: e.target.value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(); //falta action y reducer
		setInput({
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
		});
		history.push('/home');
	}

	return (
		<div>
			<div className={styles.container}>
				<Form className={`${styles.form}`} onSubmit={handleSubmit}>
					<Row className={`${styles.row}`} lg={2}>
						<Col className={`${styles.col}`} lg={6}>
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
						<Col className={`${styles.col}`} lg={6}>
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
					<Row className="justify-content-center mt-3" lg={1}>
						<Col className={`${styles.col}`} lg={12}>
							<Form.Control
								type="text"
								name="username"
								placeholder="Nombre de usuario"
								value={input.username}
								onChange={handleInput}
							/>
						</Col>
					</Row>
					<Row className="justify-content-center mt-3" lg={1}>
						<Col className={`${styles.col}`} lg={12}>
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
					<Row className="justify-content-center mt-3" lg={2}>
						<Col className={`${styles.col}`} lg={6}>
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
						<Col className={`${styles.col}`} lg={6}>
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
					<Row className="justify-content-center mt-3" lg={1}>
						<Col className={`${styles.col}`} lg={12}>
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
					<Row className="justify-content-center mt-3" lg={2}>
						<Col className={`${styles.col}`} lg={6}>
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
						<Col className={`${styles.col}`} lg={6}>
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
					<Row className="justify-content-center mt-3" lg={1}>
						<Col className={`${styles.col}`} lg={12}>
							<Form.Label>Provincia</Form.Label>
							<Form.Select
								onChange={handleSelect}
								defaultValue="Seleccione una opción"
							>
								<option value="Seleccione una opción" hidden>
									Seleccione una opción
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
					<Row className="justify-content-center mt-3" lg={1}>
						<Col className={`${styles.col}`} lg={12}>
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
					<Row className="justify-content-center mt-3" lg={2}>
						<Col className={`${styles.col}`} lg={6}>
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
						<Col className={`${styles.col}`} lg={6}>
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
					<Row className="justify-content-center mt-3" lg={1}>
						<Col className={`${styles.col}`} lg={5}>
							{input.name === '' ||
							input.lastname === '' ||
							input.document === '' ||
							input.phone === '' ||
							input.mail === '' ||
							input.province === '' ||
							input.city === '' ||
							input.street === '' ||
							input.number === '' ||
							input.username === '' ||
							input.password === '' ||
							input.new_password === '' ||
							error.name ||
							error.lastname ||
							error.document ||
							error.birth ||
							error.phone ||
							error.mail ||
							error.number ||
							error.password ||
							error.new_password ? (
								<Button
									disabled
									variant="danger"
									className={`${styles.buttonSubmit}`}
								>
									Faltan datos por completar
								</Button>
							) : (
								<Link to="/healthData">
									<Button type="submit" variant="success">
										Siguiente
									</Button>
								</Link>
							)}
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
}
