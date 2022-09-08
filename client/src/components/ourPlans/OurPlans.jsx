import React from 'react';
import Button from 'react-bootstrap/Button';
import onlineDoctor from '../../Icons/onlineDoctor.svg';
import styles from './OurPlans.module.css';

const OurPlans = () => {
	return (
		<div className={styles.contenedor}>
			<div className={styles.texto}>
				<h4>Nuevos profesionales forman parte de + SALUD </h4>
				<p>
					Comenzá a trabajar con nosotros y aumenta tus ingresos con el plan
					que mejor se adapte a tu necesidad.
				</p>
				<Button>Conoce nuestros planes</Button>
			</div>
			<div className={styles.imagen}>
				<img src={onlineDoctor} alt="onlineDoctor" />
			</div>
		</div>
	);
};

export default OurPlans;
