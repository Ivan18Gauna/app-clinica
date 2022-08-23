import React from 'react';
import styles from './NotFound.module.css';
import icon from '../../Icons/icons8-brake-warning-48.png';

const NotFoundPro = () => {
	return (
		<div className={styles.container}>
			<div className={styles.warning}>
				<img src={icon} alt="warning" />
				<h4>No encontramos profesionales con estos filtros</h4>
			</div>
			<p>Cambie alguno de los campos para ofrecerle resultados</p>
		</div>
	);
};

export default NotFoundPro;
