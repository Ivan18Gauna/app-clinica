import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from '../formPatients/FormPatients.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getPatients,
	getPatientsByName,
	postHistory,
} from '../../redux/actions';

function validate(input) {
	let error = {};
	if (!/([A-z])/.test(input.reason)) {
		error.motivo = 'Ingrese un motivo valido';
	}
	if (!/([A-z])/.test(input.description)) {
		error.consulta = 'Ingrese una descripcion valida';
	}
	if (!/([A-z])/.test(input.diagnosis)) {
		error.diagnostico = 'Ingrese un diagnostico valido';
	}
	return error;
}

export default function FormUpProfessionals() {
	const dispatch = useDispatch();
	const allPatients = useSelector((state) => state.patients);
	console.log('soy -Paciente', allPatients);

	useEffect(() => {
		dispatch(getPatients());
	}, [dispatch]);

	const [input, setInput] = useState({
		patient: [],
		reason: '',
		image: '',
		description: '',
		date: '',
		diagnosis: '',
	});
	console.log('soy search', input.search);

	const [error, setError] = useState({});

	function handleMotivo(e) {
		setInput({
			...input,
			[e.target.name]: [e.target.value],
		});
		let existeError = validate({
			...input,
			[e.target.name]: [e.target.value],
		});
		setError(existeError);
	}

	function handleSubmit(e) {
		e.preventDefault(e);
		console.log(
			'asi va la info',
			input.patient,
			input.reason,
			input.image,
			input.description,
			input.date,
			input.diagnosis
		);
		dispatch(postHistory(input));
		alert('Registraste correctamente tu atencion a  ' + input.patient);
		setInput({
			patient: [],
			reason: '',
			image: '',
			description: '',
			date: '',
			diagnosis: '',
		});
	}

	function handleSearch(e) {
		e.preventDefault();
		dispatch(getPatientsByName(input.patient));
	}

	return (
		<div className={styles.container}>
			<Form className={`${styles.form}`} onSubmit={handleSubmit}>
				<div className={styles.titulo}>
					<h3>Tiltulo X</h3>
				</div>
				<Row lg={2} className={`${styles.row}`}>
					<Col className={`${styles.col}`} lg={8}>
						<Form.Control
							type="search"
							name="patient"
							value={input.patient}
							placeholder="Paciente"
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
						{allPatients && allPatients.document === input.patient[0] ? (
							<div>
								<p> {allPatients.name}</p>
								<p> {allPatients.lastname}</p>
							</div>
						) : (
							<div>No se encontro paciente</div>
						)}
					</Col>
				</Row>
				<Row className={`${styles.row}`}>
					<Col className={`${styles.col}`}>
						<Form.Label>Razon</Form.Label>
						<Form.Control
							type="text"
							name="reason"
							value={input.reason}
							onChange={handleMotivo}
							isInvalid={!!error.reason}
						/>
						<Form.Control.Feedback type="invalid">
							{error.patient}
						</Form.Control.Feedback>
					</Col>
				</Row>
				<Row className={`${styles.row}`}>
					<Col className={`${styles.col}`}>
						<Form.Label>Estudio digital</Form.Label>
						<Form.Control
							type="file"
							name="image"
							value={input.image}
							onChange={handleMotivo}
							isInvalid={!!error.image}
						/>
						<Form.Control.Feedback type="invalid">
							{error.image}
						</Form.Control.Feedback>
					</Col>
				</Row>
				<Row className={`${styles.row}`}>
					<Col className={`${styles.col}`}>
						<Form.Label>Descripcion consulta</Form.Label>
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
						<Form.Label>Fecha atencion</Form.Label>
						<Form.Control
							type="date"
							name="date"
							value={input.date}
							onChange={handleMotivo}
							isInvalid={!!error.date}
						/>
						<Form.Control.Feedback type="invalid">
							{error.description}
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
						<Button className={`${styles.buttonSubmit}`} type="subtmit">
							Enviar
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
}
