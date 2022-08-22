import React from 'react';
import CardEdit from '../card/Card';
import styles from '../card/Card.module.css'

export default function Cards({ doctors, setLastName, setFilterProfProv, setFilterEsp }) {
	return (
		<div className={styles.cards}>
			{doctors.map((e) => {
				return <CardEdit key={e.id} id={e.id} name={e.name} lastname={e.lastname} />;
			})}
		</div>
	);
}
