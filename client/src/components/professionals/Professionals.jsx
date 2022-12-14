import React from 'react';
import Filters from '../filters/Filters.jsx';
import Cards from '../cards/Cards.jsx';
import NotFoundPro from '../error/NotFoundPro.jsx';
import ModifyFilter from '../error/ModifyFilter.jsx';
import { useSelector } from 'react-redux';
import styles from './Professionals.module.css';

export default function Professionals() {
	const doctors = useSelector((state) => state.doctors);
	console.log(doctors)
	return (
		<div className={styles.container}>
			<Filters />
			{typeof doctors === 'string' &&
			doctors === 'No encontramos profesionales con estos filtros' ? (
				<NotFoundPro />
			) : doctors === 'Debe seleccionar un valor a consultar' ? (
				<ModifyFilter />
			) : (
				doctors.length && <Cards doctors={doctors} />
			)}
		</div>
	);
}
