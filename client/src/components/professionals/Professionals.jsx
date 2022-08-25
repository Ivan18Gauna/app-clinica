import React from 'react';
import Filters from '../filters/Filters';
import Cards from '../cards/Cards.jsx';
import NotFoundPro from '../error/NotFoundPro.jsx';
import ModifyFilter from '../error/ModifyFilter.jsx';
import { useSelector } from 'react-redux';
import styles from './Professionals.module.css';
import { useLocation } from 'react-router-dom';
const queryToStr = require('query-string');

export default function Professionals() {
	const doctors = useSelector((state) => state.doctors);
	const result = queryToStr.parse(useLocation().search);
	return (
		<div className={styles.container}>
			<Filters />
			{typeof doctors === 'string' &&
			doctors === 'No encontramos profesionales con estos filtros' ? (
				<NotFoundPro />
			) : doctors === 'Debe seleccionar un valor a consultar' ? (
				<ModifyFilter />
			) : (
				<Cards doctors={doctors} />
			)}
		</div>
	);
}
