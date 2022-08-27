import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from '../formPatients/FormPatients.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getObrasSociales } from '../../redux/actions';
import { useHistory, useLocation } from 'react-router-dom';
import { registerPatients } from '../../redux/actions';

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
    if(e.code === "Enter"){
      e.preventDefault()
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
			alert('Ya se selecciono esa vacuna.');
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
			alert('Alergia ya ingresada.');
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
			alert('Enfermedad crónica ya ingresada.');
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
console.log('heal', input)
	function handleSubmit(e) {
		e.preventDefault();

		console.log('ENTRE SUBMIT')


		dispatch(registerPatients(input));
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
				<Row className={`${styles.row}`} lg={1}>
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
				<Row>
					<Col className={`${styles.col}`}>
						<ul className={styles.lista}>
							<span>Vacunas seleccionadas: </span>
							{input.vaccines.map((e) => {
								return (
									<li key={e} value={e}>
										{e}
										<Button value={e} onClick={handleDeleteVaccines}>
											X
										</Button>
									</li>
								);
							})}
						</ul>
					</Col>
				</Row>
				<Row className={`${styles.row}`} lg={1}>
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
						<Button
							className={`${styles.buttonSubmit}`}
							type="button"
							onClick={handleSubmitAllergies}
						>
							Agregar
						</Button>
					</Col>
				</Row>
				<Row className={`${styles.row}`}>
					<Col className={`${styles.col}`}>
						<ul className={styles.lista}>
							<span>Usted ingreso las siguientes alergias: </span>
							{input.allergies &&
								input.allergies.map((al) => {
									return (
										<li key={al} value={al}>
											{al}
											<Button value={al} onClick={handleDeleteAllergies}>
												X
											</Button>
										</li>
									);
								})}
						</ul>
					</Col>
				</Row>
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
							<option value="yes">Sí</option>
							<option value="no">No</option>
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
							<option value="yes">Sí</option>
							<option value="no">No</option>
						</Form.Select>
					</Col>
				</Row>
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
						<Button
							className={`${styles.buttonSubmit}`}
							type="button"
							onClick={handleSubmitChronicles}
						>
							Agregar
						</Button>
					</Col>
				</Row>
				<Row className={`${styles.row}`}>
					<Col className={`${styles.col}`}>
						<ul className={styles.lista}>
							<span>Usted ingreso las siguientes enfermedades crónicas: </span>
							{input.chronicles &&
								input.chronicles.map((ch) => {
									return (
										<li key={ch} value={ch}>
											{ch}
											<Button value={ch} onClick={handleDeleteChronicles}>
												X
											</Button>
										</li>
									);
								})}
						</ul>
					</Col>
				</Row>
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
