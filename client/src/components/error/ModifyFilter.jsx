import React from 'react';
import styles from './NotFound.module.css';
import icon from '../../Icons/icons8-brake-warning-48.png';

const ModifyFilter = () => {
	return (
		<div className={styles.container}>
			<div className={styles.warning}>
				<img src={icon} alt="warning" />
				<h4>Complete alguno de los campos de búsqueda</h4>
			</div>
			<p>
				Para mostrarle resultados relevantes, es necesario que complete al menos
				uno de los campos de búsqueda.
			</p>
		</div>
	);
};

export default ModifyFilter;
