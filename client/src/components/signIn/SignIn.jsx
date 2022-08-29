import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import paciente from '../../Icons/paciente.svg';
import doctor from '../../Icons/doctor.svg';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.css';

export default function SignIn() {
	return (
		<div className={styles.container}>
			<Row className={styles.row} sm={2} md={2} lg={2}>
				<Col className={styles.col} lg={5}>
					<Link to="/formpatients" className={styles.link}>
						<div className={styles.titulo}>
							<h4>Paciente</h4>
						</div>
						<div className={styles.imagen}>
							<img src={paciente} alt="not img" />
						</div>
						<p>Busca el profesional que necesitas y reserva un turno.</p>
					</Link>
				</Col>
				<Col className={styles.col} lg={5}>
					<Link to="/formprofessionals" className={styles.link}>
						<div className={styles.titulo}>
							<h4>Profesional Medico</h4>
						</div>
						<div className={styles.imagen}>
							<img src={doctor} alt="not img" />
						</div>
						<p>Programa citas de forma online.</p>
					</Link>
				</Col>
			</Row>
		</div>
	);
}
