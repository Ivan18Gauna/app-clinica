import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_Doctors } from '../../redux/actions';
import Cards from '../cards/Cards';
import Portada from '../portada/portada';
import CardsTriple from '../infoCards/infoCards';
import CardHistory from '../cardHistory/CardHistory';
import styles from './Home.module.css';

export default function Home() {
	const dispatch = useDispatch();
	const doctors = useSelector((state) => state.doctors);
	useEffect(() => {
		dispatch(get_Doctors());
	}, [dispatch]);

	return (
		<div className={`${styles.container}`}>
			<Portada />
			<h3>Encuentra profesionales online y agenda turnos al instante</h3>
			<CardsTriple />
			<CardHistory />
			<Cards doctors={doctors} />
		</div>
	);
}
