import React from 'react';
import CardEdit from '../card/Card';
import styles from './Cards.module.css';

export default function Cards({ doctors }) {
	return (
		<div className={styles.container}>
			{doctors.map((e) => {
				return (
					<CardEdit
						key={e.id}
						id={e.id}
						name={e.name}
						lastname={e.lastname}
						specialties={e.specialties}
					/>
				);
			})}
		</div>
	);
}
