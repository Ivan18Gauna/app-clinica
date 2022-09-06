import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import question from "../../Icons/question.svg";
import login from "../../Icons/longIn.svg";
import calendar from "../../Icons/calendar.svg";
import search from "../../Icons/search.svg";
import styles from "./CardHistory.module.css";

function CardHistory() {

	return (
		<div className={styles.container}>
			<Row className={styles.row} lg={2}>
				<Col className={styles.col} lg={3}>
					<img src={question} alt="question" />
					<p>Aprende en tres simples pasos a usar +Salud.</p>
				</Col>
				<Col className={styles.colInfo} lg={8}>
					<h3>¿Cómo funciona +Salud?</h3>
					<Row className={styles.rowInfo} lg={3} xs={1}>
						<Col className={styles.info}>
							<div className={styles.pasos}>
								<img src={login} alt="question" />
								<h6>1. REGISTRATE</h6>
							</div>
							<p>
								Lo primero que debes hacer es registrarte gratuitamente en
								+Salud. Dale click al boton <Link to="/login">registrarse</Link> y
							</p>
						</Col>
						<Col className={styles.info}>
							<div className={styles.pasos}>
								<img src={search} alt="question" />
								<h6>2. BUSCA UN PROFESIONAL</h6>
							</div>
							<p>
								Al ingresar veras casilleros vacios en donde completaras tu
								informacion básica de salud y enfermedades preexistentes.
							</p>
						</Col>
						<Col className={styles.info}>
							<div className={styles.pasos}>
								<img src={calendar} alt="question" />
								<h6>3. AGENDA EL TURNO</h6>
							</div>
							<p>
								+Salud ideo una aplicacion para que cada vez que visites un
								profesional, este mismo pueda cargar tu atencion de manera facil
							</p>
						</Col>
					</Row>
					<footer className={styles.footerInfo}>
						<p>
							Encuentra profesionales por :
							<Link to='/professionals'>Ubicación - Especialidad</Link>
						</p>
					</footer>
				</Col>
			</Row>
		</div>
	);

}

export default CardHistory;
