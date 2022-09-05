import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './HealthData.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getObrasSociales } from '../../redux/actions';
import { useHistory, useLocation } from 'react-router-dom';
import { registerPatients } from '../../redux/actions';
import swal from 'sweetalert';

const blood_type = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB+', 'AB-', 'O+', 'O-'];
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

export default function HealthData() {
	const history = useHistory();
	const dispatch = useDispatch();
	const location = useLocation();
	const info_patient = location.state;
	const obras = useSelector((state) => state.os);

	useEffect(() => {
		dispatch(getObrasSociales());
	}, [dispatch]);

	const [input, setInput] = useState({
		name: info_patient.name,
		lastname: info_patient.lastname,
		document: info_patient.document,
		birth: info_patient.birth,
		phone: info_patient.phone,
		mail: info_patient.mail,
		province: info_patient.province,
		city: info_patient.city,
		number: info_patient.number,
		street: info_patient.street,
		username: info_patient.username,
		password: info_patient.password,
		new_password: info_patient.new_password,
		blood: '',
		vaccines: [],
		allergies: [],
		donation: '',
		transfusion: '',
		chronicles: [],
		oS: '',
	});

	const [allergies_, setAllergies] = useState('');
	const [chronicles_, setChronicles] = useState('');

	function onKeyDown(e) {
		if (e.code === 'Enter') {
			e.preventDefault();
			return false;
		}
	}
	function handleSelectBlood(e) {
		e.preventDefault();
		setInput({
			...input,
			blood: e.target.value,
		});
	}

	function handleSelectVaccines(e) {
		e.preventDefault();
		if (input.vaccines.includes(e.target.value)) {
			swal({
				icon: 'warning',
				text: "Vacuna ya ingresada."
			});
		} else {
			setInput({
				...input,
				vaccines: [...input.vaccines, e.target.value],
			});
		}
	}

	function handleDeleteVaccines(e) {
		e.preventDefault();
		setInput({
			...input,
			vaccines: input.vaccines.filter((el) => el !== e.target.value),
		});
	}

	function handleInput(e) {
		e.preventDefault();
		setAllergies(e.target.value);
	}

	function handleSubmitAllergies(e) {
		e.preventDefault();
		
		if (input.allergies.includes(allergies_)) {
			swal({
				icon: 'warning',
				text: 'Alergia ya ingresada.'
			});
		} else {
			setInput({
				...input,
				allergies: [...input.allergies, allergies_],
			});
		}
		setAllergies('');
	}
	function handleDeleteAllergies(e) {
		e.preventDefault();
		setInput({
			...input,
			allergies: input.allergies.filter((el) => el !== e.target.value),
		});
	}

	function handleInputDonate(e) {
		e.preventDefault();
		setInput({
			...input,
			donation: e.target.value,
		});
	}

	function handleInputTransfusion(e) {
		e.preventDefault();
		setInput({
			...input,
			transfusion: e.target.value,
		});
	}

	function handleInputChronicles(e) {
		e.preventDefault();
		setChronicles(e.target.value);
	}

	function handleSubmitChronicles(e) {
		e.preventDefault();
		if (input.chronicles.includes(chronicles_)) {
			swal({
				icon: 'warning',
				text: 'Enfermedad crónica ya ingresada.'
			});
		} else {
			setInput({
				...input,
				chronicles: [...input.chronicles, chronicles_],
			});
		}
		setChronicles('');
	}
	function handleDeleteChronicles(e) {
		e.preventDefault();
		setInput({
			...input,
			chronicles: input.chronicles.filter((el) => el !== e.target.value),
		});
	}
	function handleSelectOS(e) {
		e.preventDefault(e);
		setInput({
			...input,
			oS: e.target.value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(registerPatients(input));
		swal({
			icon: 'success',
			text: 'Usuario registrado.',
			timer: 1500
		})
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
			blood: '',
			vaccines: [],
			allergies: [],
			donation: '',
			transfusion: '',
			chronicles: [],
			oS: '',
		});
		history.push('/home');
	}

	return (
		<div className={styles.container}>
			<Form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.titulo}>
					<h3>Datos de salud</h3>
				</div>
				<Row className={`${styles.row}`} lg={1}>
					<Col className={`${styles.col}`}>
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
				<div className={styles.vacunas}>
					<Row lg={1}>
						<Col className={`${styles.col}`}>
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
					<Col className={`${styles.tabla}`}>
						<ListGroup className={styles.lista}>
							{input.vaccines.map((e) => {
								return (
									<ListGroup.Item className={styles.fila}>
										{e}
										<Button
											variant="danger"
											size={'sm'}
											value={e}
											onClick={handleDeleteVaccines}
										>
											X
										</Button>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					</Col>
				</div>
				<div className={styles.vacunas}>
					<Row className={`${styles.alergias}`} lg={1}>
						<Col className={`${styles.col}`} lg={9}>
							<Form.Control
								type="text"
								placeholder="Alergias que posee"
								name="allergies"
								value={allergies_}
								onChange={handleInput}
							/>
						</Col>
						<Col className={`${styles.col}`} lg={3}>
            {allergies_ ? (
                <Button
                  className={`${styles.buttonSubmit}`}
                  type="button"
                  onClick={handleSubmitAllergies}
                >
                  Agregar
                </Button>
              ) : (
                <Button
                disabled
                  className={`${styles.buttonSubmit}`}
                  type="button"
                  onClick={handleSubmitAllergies}
                >
                  Agregar
                </Button>
              )}
						</Col>
					</Row>
					<Col className={`${styles.tabla}`}>
						<ListGroup>
							{input.allergies &&
								input.allergies.map((al) => {
									return (
										<ListGroup.Item className={styles.fila}>
											{al}
											<Button
												variant="danger"
												size="sm"
												value={al}
												onClick={handleDeleteAllergies}
											>
												X
											</Button>
										</ListGroup.Item>
									);
								})}
						</ListGroup>
					</Col>
				</div>
				<Row className={`${styles.row}`}>
					<Col className={`${styles.col}`}>
						<Form.Label>Donante: </Form.Label>
						<Form.Select
							defaultValue="Seleccione una opción"
							onChange={handleInputDonate}
						>
							<option value="Seleccione una opción" hidden>
								Seleccione una opción
							</option>
							<option value="Si">Si</option>

							<option value="No">No</option>
						</Form.Select>
					</Col>
				</Row>
				<Row className={`${styles.row}`}>
					<Col className={`${styles.col}`}>
						<Form.Label>Transfundible: </Form.Label>
						<Form.Select
							defaultValue="Seleccione una opción"
							onChange={handleInputTransfusion}
						>
							<option value="Seleccione una opción" hidden>
								Seleccione una opción
							</option>
							<option value="Si">Si</option>
							<option value="No">No</option>
						</Form.Select>
					</Col>
				</Row>
				<div className={styles.vacunas}>
					<Row className={`${styles.row}`}>
						<Col className={`${styles.col}`} lg={9}>
							<Form.Control
								type="text"
								onKeyDown={(e) => onKeyDown(e)}
								placeholder="Enfermedades cronicas que posee"
								name="chronicles"
								value={chronicles_}
								onChange={handleInputChronicles}
							/>
						</Col>
						<Col className={`${styles.col}`} lg={3}>
              {chronicles_ ? (
                <Button
                className={`${styles.buttonSubmit}`}
								type="button"
								onClick={handleSubmitChronicles}
                >
                  Agregar
                </Button>
              ) : (
                <Button
                disabled
                className={`${styles.buttonSubmit}`}
								type="button"
								onClick={handleSubmitChronicles}
                >
                  Agregar
                </Button>
              )}
						</Col>
					</Row>
					<Col className={`${styles.tabla}`}>
						<ListGroup className={styles.lista}>
							{input.chronicles &&
								input.chronicles.map((ch) => {
									return (
										<ListGroup.Item className={styles.fila}>
											{ch}
											<Button
												variant="danger"
												size="sm"
												value={ch}
												onClick={handleDeleteChronicles}
											>
												X
											</Button>
										</ListGroup.Item>
									);
								})}
						</ListGroup>
					</Col>
				</div>
				<Row className={`${styles.row}`}>
					<Col className={`${styles.col}`}>
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
				<Row className={`${styles.row}`} lg={2} md={2} sm={2} xs={2}>
					<Col className={`${styles.col}`} md={6} lg={6}>
						<Button
							className={`${styles.buttonSubmit}`}
							onClick={() => history.goBack()}
						>
							Atras
						</Button>
					</Col>
					<Col className={`${styles.col}`} md={6} lg={6}>
						{input.blood === '' ||
							input.donation === '' ||
							input.transfusion === '' ? (
							<Button
								className={`${styles.buttonSubmit}`}
								variant="danger"
								disabled
							>
								Faltan datos
							</Button>
						) : (
							<Button className={`${styles.buttonSubmit}`} type="submit">
								Enviar
							</Button>
						)}
					</Col>
				</Row>
			</Form>
		</div>
	);
}
