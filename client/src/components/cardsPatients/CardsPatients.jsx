import React from 'react';
import CardEditPatients from '../cardPatients/CardPatients';
import styles from '../cards/Cards.module.css';

export default function CardsPatients({ patients }) {
	return (
		<div className={styles.container}>
			{patients && patients.map((e) => {
				return (
					<CardEditPatients
						key={e.id}
						name={e.name}
						lastname={e.lastname}
						city={e.city}
						mail={e.mail}
					/>
				);
			})}
		</div>
	);
}
