import React from 'react';
import { Link } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './Footer.module.css';
import logo from '../../Icons/logoClaro.svg';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.left}>
					<img src={logo} alt="logo" />
					<p>
						+ Salud es una web para encontrar profesionales de la salud y
						agendar turnos al instante de manera simple y rápida.
					</p>
				</div>
				<div className={styles.right}>
					<div className={styles.salud}>
						<h5>+ SALUD</h5>
						<div className={styles.links}>
							<Link to="/ourplans">
								<p>Planes</p>
							</Link>
							<Link to="/">
								<p>Contacto</p>
							</Link>
						</div>
					</div>
					<div className={styles.unete}>
						<h5>ÚNETE</h5>
						<div className={styles.links}>
							<Link to="/login">
								<p>Soy paciente</p>
							</Link>
							<Link to="/login">
								<p>Soy Profesinal</p>
							</Link>
						</div>
					</div>
				</div>
				<div className={styles.icons}>
					<MailIcon />
				</div>
			</div>
			<div
				onClick={() => {
					window.scrollTo(0, 0);
				}}
				className={styles.arrow}
			>
				<ArrowUpwardIcon sx={{ fontSize: 40 }} />
			</div>
		</footer>
	);
};

export default Footer;
