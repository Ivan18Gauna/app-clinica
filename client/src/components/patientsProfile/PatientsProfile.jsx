import React, { useState } from 'react';
import doctor from '../../Icons/iconfinder-icon.svg';
// import { useHistory } from "react-router-dom";
import {
	modifyUsers,
	getUserDetail,
} from '../../redux/actions';
import { useAuth0 } from '@auth0/auth0-react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import stylesForm from '../formPatients/FormPatients.module.css';
import styles from './PatientsProfile.module.css';
import Loading from '../loading/Loading';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';

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
const vaccines_data = [
	'BCG',
	'Hepatitis B',
	'Neumococo conjugada',
	'Quintuple pentavalente',
	'Polio',
	'Rotavirus',
	'Meningococo',
	'Gripe',
	'Hepatitis A',
	'Triple viral',
	'Varicela',
	'Quintuple',
	'Triple Bacteriana Celular',
	'HPV',
	'Fiebre Amarilla',
	'COVID',
];

function validate(info) {
	let error = {};
	if (info.name && !/([A-z])/.test(info.name)) {
		error.name = 'Ingrese un nombre valido.';
		return error;
	}
	if (info.lastname && !/([A-z])/.test(info.lastname)) {
		error.lastname = 'Ingrese un apellido valido.';
		return error;
	}

	if (info.email && !/\S+@\S+\.\S+/.test(info.mail)) {
		error.mail = 'Dirección de correo no valida.';
		return error;
	}
	if (
		info.password &&
		!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
			info.password
		)
	) {
		error.password =
			'La contraseña debe contener al menos 8 digitos, una mayúscula, un número y un caracter especial.';
		return error;
	}
	if (info.new_password && info.password !== info.new_password) {
		error.new_password = 'No coincide con la contraseña.';
		return error;
	}
	let newDate = info.birth;
	let Date1 = new Date(newDate);
	let Date2 = new Date();
	if (info.birth && Date1 >= Date2) {
		error.birth = 'La fecha de nacimiento no puede ser posterior a la actual.';
		return error;
	}
	if (info.document && !/^\d{5,15}$$/.test(info.document)) {
		error.document = 'Número de documento no valido.';
		return error;
	}
	if (info.phone && !/^\d{8,15}$$/.test(info.phone)) {
		error.phone = 'Número de telefono no valido.';
		return error;
	}
	if (info.number && !/[0-9]/.test(info.number)) {
		error.number = 'Número no valido.';
		return error;
	} else if (info.number && info.number <= 0) {
		error.number = 'Número no valida.';
		return error;
	}
	return error;
}

export default function UserProfile({globalUser, obras}) {
	const dispatch = useDispatch()
	const { user, logout, isAuthenticated } = useAuth0();
	const [editInfoPersonal, setEditInfoPersonal] = useState(false);
	const [editInfoSalud, setEditInfoSalud] = useState(false);
	const [allergies_, setAllergies] = useState('');
	const [chronicles_, setChronicles] = useState('');
	const [error, setError] = useState({});
	let id;
/* 	if(globalUser && globalUser.id){ id = globalUser.id; }
 */	
	

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
	});

	function onKeyDown(e) {
		if (e.code === 'Enter') {
			e.preventDefault();
			return false;
		}
	}
	function handleSelectBlood(e) {
		e.preventDefault();
		setInfo({
			...info,
			blood: e.target.value,
		});
	}
	function handleSelectVaccines(e) {
		e.preventDefault();
		if (info.vaccines.includes(e.target.value)) {
			alert('Ya se selecciono esa vacuna.');
		} else {
			setInfo({
				...info,
				vaccines: [...info.vaccines, e.target.value],
			});
		}
	}
	function handleDeleteVaccines(e) {
		e.preventDefault();
		setInfo({
			...info,
			vaccines: info.vaccines.filter((el) => el !== e.target.value),
		});
	}
	function handleInputAllergies(e) {
		setAllergies(e.target.value);
	}
	function handleSubmitAllergies(e) {
		e.preventDefault();
		if (info.allergies.includes(allergies_)) {
			alert('Alergia ya ingresada.');
		} else {
			setInfo({
				...info,
				allergies: [...info.allergies, allergies_],
			});
		}
		setAllergies('');
	}
	function handleDeleteAllergies(e) {
		e.preventDefault();
		setInfo({
			...info,
			allergies: info.allergies.filter((el) => el !== e.target.value),
		});
	}
	function handleInputDonate(e) {
		e.preventDefault();
		setInfo({
			...info,
			donation: e.target.value,
		});
	}
	function handleInputTransfusion(e) {
		e.preventDefault();
		setInfo({
			...info,
			transfusion: e.target.value,
		});
	}
	function handleInputChronicles(e) {
		e.preventDefault();
		setChronicles(e.target.value);
	}
	function handleSubmitChronicles(e) {
		e.preventDefault();
		if (info.chronicles.includes(chronicles_)) {
			alert('Enfermedad crónica ya ingresada.');
		} else {
			setInfo({
				...info,
				chronicles: [...info.chronicles, chronicles_],
			});
		}
		setChronicles('');
	}
	function handleDeleteChronicles(e) {
		e.preventDefault();
		setInfo({
			...info,
			chronicles: info.chronicles.filter((el) => el !== e.target.value),
		});
	}
	function handleSelectOS(e) {
		e.preventDefault(e);
		setInfo({
			...info,
			oS: e.target.value,
		});
	}
	function handleInfoPersonal(e) {
		e.preventDefault();
		setEditInfoPersonal(true);
	}
	function handleInput(e) {
		e.preventDefault();
		setInfo({
			...info,
			[e.target.name]: e.target.value,
		});
		let objError = validate({
			...info,
			[e.target.name]: e.target.value,
		});
		setError(objError);
	}
	function handleSelect(e) {
		setInfo({
			...info,
			province: e.target.value,
		});
	}
	function handleCancel(e) {
		e.preventDefault();
		setEditInfoPersonal(false);
	}
	function handleInfoSalud(e) {
		e.preventDefault();
		setEditInfoSalud(true);
	}
	function handleCancelSalud(e) {
		e.preventDefault();
		setEditInfoSalud(false);
	}
	function handleSubmit(e) {
		e.preventDefault();
		dispatch(modifyUsers(info, id));
		setTimeout(()=>{
			/* dispatch(getUserDetail(user.email)) */
		}, 2000)
	}
		
	return (
		<div>
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
								<p>Fecha de nacimiento: {globalUser.birth}</p>
								<p>Número de Documento {globalUser.document}</p>
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
										<Form
											className={`${stylesForm.form}`}
											onSubmit={(e) => handleSubmit(e)}
										>
											<div className={stylesForm.titulo}>
												<h3>Editar información personal:</h3>
											</div>
											<Row className={`${stylesForm.row}`} lg={2}>
												<Col className={`${stylesForm.col}`}>
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
												<Col className={`${stylesForm.col}`}>
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
											<Row className={`${stylesForm.row}`} lg={1}>
												<Col className={`${stylesForm.col}`}>
													<Form.Control
														type="text"
														name="username"
														placeholder="Nombre de usuario"
														value={info.username}
														onChange={handleInput}
													/>
												</Col>
											</Row>
											<Row className={`${stylesForm.row}`} lg={1}>
												<Col className={`${stylesForm.col}`}>
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
											<Row className={`${stylesForm.row}`} lg={2}>
												<Col className={`${stylesForm.col}`}>
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
												<Col className={`${stylesForm.col}`}>
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
											<Row className={`${stylesForm.row}`} lg={1}>
												<Col className={`${stylesForm.col}`}>
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
											<Row className={`${stylesForm.row}`} lg={2}>
												<Col className={`${stylesForm.col}`}>
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
												<Col className={`${stylesForm.col}`}>
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
											<Row className={`${stylesForm.row}`} lg={1}>
												<Col className={`${stylesForm.col}`}>
													<Form.Label>Domicilio</Form.Label>
													<Form.Select
														onChange={handleSelect}
														defaultValue="Provincia"
													>
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
											<Row className={`${stylesForm.row}`} lg={1}>
												<Col className={`${stylesForm.col}`}>
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
											<Row className={`${stylesForm.row}`} lg={2}>
												<Col className={`${stylesForm.col}`}>
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
												<Col className={`${stylesForm.col}`}>
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
											<Row
												className={`${stylesForm.row}`}
												lg={2}
												md={2}
												sm={2}
												xs={2}
											>
												<Col className={`${stylesForm.col}`} md={6} lg={6}>
													<Button
														className={`${stylesForm.buttonSubmit}`}
														onClick={handleCancel}
													>
														Cancelar
													</Button>
												</Col>

												<Button
													className={`${stylesForm.buttonSubmit}`}
													type="submit"
													onClick={handleSubmit}
												>
													Confirmar
												</Button>
											</Row>
										</Form>
									</div>
								)}
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>Información de salud basica</Accordion.Header>
							<Accordion.Body>
								<p>Grupo Sanguineo:</p>
								{globalUser.blood ? globalUser.blood : 'Sin información'}
								{/* <p>Obra Social:</p>
								{globalUser.oS} */}
								<p>Vacunas que posee aplicadas:</p>
								{globalUser.vaccine ? globalUser.blood : 'Sin información'}
								<p>Alergias: </p>
								{globalUser.allergies ? globalUser.allergies : 'Sin información'}
								<p>Enfermedades Crónicas: </p>
								{globalUser.chronicles ? globalUser.chronicles : 'Sin información'}
								<p>Es donante?</p>
								{globalUser.donation ? globalUser.donation : 'Sin información'}
								<p>Es transfundible?</p>
								{globalUser.transfusion ? globalUser.transfusion : 'Sin información'}
								<p>Obra Social:</p>
								{globalUser.oS ? globalUser.oS : 'Sin información'}
								{editInfoSalud === false ? (
									<Button onClick={handleInfoSalud}>
										Editar información de salud
									</Button>
								) : (
									<div className={stylesForm.container}>
										<Form className={stylesForm.form} onSubmit={handleSubmit}>
											<div className={stylesForm.titulo}>
												<h3>Editar información de salud</h3>
											</div>
											<Row className={`${stylesForm.row}`} lg={1}>
												<Col className={`${stylesForm.col}`}>
													<Form.Label>Grupo Sanguineo</Form.Label>
													<Form.Select
														onChange={handleSelectBlood}
														defaultValue="grupo sanguineo"
													>
														<option value="grupo sanguineo" hidden>
															Selecione una opción
														</option>
														{blood_type.map((e, i) => (
															<option key={i} value={e}>
																{e}
															</option>
														))}
													</Form.Select>
												</Col>
											</Row>
											<Row className={`${stylesForm.row}`} lg={1}>
												<Col className={`${stylesForm.col}`}>
													<Form.Label>Vacunas</Form.Label>
													<Form.Select
														onChange={handleSelectVaccines}
														defaultValue="vacunas que posee colocadas"
													>
														<option value="vacunas que posee colocadas" hidden>
															Selecione las vacunas que posee
														</option>
														{vaccines_data.map((e) => {
															return (
																<option key={e} value={e}>
																	{e}
																</option>
															);
														})}
													</Form.Select>
												</Col>
											</Row>
											<Row>
												<Col className={`${stylesForm.col}`}>
													<ul className={stylesForm.lista}>
														<span>Vacunas seleccionadas: </span>
														{info.vaccines.map((e) => {
															return (
																<li key={e} value={e}>
																	{e}
																	<Button
																		value={e}
																		onClick={handleDeleteVaccines}
																	>
																		X
																	</Button>
																</li>
															);
														})}
													</ul>
												</Col>
											</Row>
											<Row className={`${stylesForm.row}`} lg={1}>
												<Col className={`${stylesForm.col}`} lg={9}>
													<Form.Control
														type="text"
														placeholder="Alergias que posee"
														name="allergies"
														value={allergies_}
														onChange={handleInputAllergies}
													/>
												</Col>
												<Col className={`${stylesForm.col}`} lg={3}>
													<Button
														className={`${stylesForm.buttonSubmit}`}
														type="button"
														onClick={handleSubmitAllergies}
													>
														Agregar
													</Button>
												</Col>
											</Row>
											<Row className={`${stylesForm.row}`}>
												<Col className={`${stylesForm.col}`}>
													<ul className={stylesForm.lista}>
														<span>Usted ingreso las siguientes alergias: </span>
														{info.allergies &&
															info.allergies.map((al) => {
																return (
																	<li key={al} value={al}>
																		{al}
																		<Button
																			value={al}
																			onClick={handleDeleteAllergies}
																		>
																			X
																		</Button>
																	</li>
																);
															})}
													</ul>
												</Col>
											</Row>
											<Row className={`${stylesForm.row}`}>
												<Col className={`${stylesForm.col}`}>
													<Form.Label>Donante: </Form.Label>
													<Form.Select
														defaultValue="Seleccione una opción"
														onChange={handleInputDonate}
													>
														<option value="Seleccione una opción" hidden>
															Seleccione una opción
														</option>
														<option value="yes">Sí</option>
														<option value="no">No</option>
													</Form.Select>
												</Col>
											</Row>
											<Row className={`${stylesForm.row}`}>
												<Col className={`${stylesForm.col}`}>
													<Form.Label>Transfundible: </Form.Label>
													<Form.Select
														defaultValue="Seleccione una opción"
														onChange={handleInputTransfusion}
													>
														<option value="Seleccione una opción" hidden>
															Seleccione una opción
														</option>
														<option value="yes">Sí</option>
														<option value="no">No</option>
													</Form.Select>
												</Col>
											</Row>
											<Row className={`${stylesForm.row}`}>
												<Col className={`${stylesForm.col}`} lg={9}>
													<Form.Control
														type="text"
														onKeyDown={(e) => onKeyDown(e)}
														placeholder="Enfermedades cronicas que posee"
														name="chronicles"
														value={chronicles_}
														onChange={handleInputChronicles}
													/>
												</Col>
												<Col className={`${stylesForm.col}`} lg={3}>
													<Button
														className={`${stylesForm.buttonSubmit}`}
														type="button"
														onClick={handleSubmitChronicles}
													>
														Agregar
													</Button>
												</Col>
											</Row>
											<Row className={`${stylesForm.row}`}>
												<Col className={`${stylesForm.col}`}>
													<ul className={stylesForm.lista}>
														<span>
															Usted ingreso las siguientes enfermedades
															crónicas:{' '}
														</span>
														{info.chronicles &&
															info.chronicles.map((ch) => {
																return (
																	<li key={ch} value={ch}>
																		{ch}
																		<Button
																			value={ch}
																			onClick={handleDeleteChronicles}
																		>
																			X
																		</Button>
																	</li>
																);
															})}
													</ul>
												</Col>
											</Row>
											<Row className={`${stylesForm.row}`}>
												<Col className={`${stylesForm.col}`}>
													<Form.Label>Obra Social</Form.Label>
													<Form.Select
														defaultValue="Seleccione una opción"
														onChange={handleSelectOS}
													>
														<option value="Seleccione una opción">
															Seleccione una opción
														</option>
														{obras.map((e, i) => {
															return (
																<option key={i} value={e}>
																	{e}
																</option>
															);
														})}
													</Form.Select>
												</Col>
											</Row>
											<Row
												className={`${stylesForm.row}`}
												lg={2}
												md={2}
												sm={2}
												xs={2}
											>
												<Col className={`${stylesForm.col}`} md={6} lg={6}>
													<Button
														className={`${stylesForm.buttonSubmit}`}
														onClick={handleCancelSalud}
													>
														Cancelar
													</Button>
												</Col>

												<Button
													className={`${stylesForm.buttonSubmit}`}
													type="submit"
													onClick={handleSubmit}
												>
													Confirmar
												</Button>
											</Row>
										</Form>
									</div>
								)}
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</div>
			<Button className={styles.button} onClick={logout}>Cerrar sesion</Button>
			</div>
		</div>
	);
}
