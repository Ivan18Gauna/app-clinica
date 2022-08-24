import { React } from 'react';
import Portada from '../portada/portada';
import Filters from '../filters/filters.jsx';
import CardsTriple from '../infoCards/infoCards';
import CardHistory from '../cardHistory/CardHistory';
import styles from './Home.module.css';

export default function Home() {
	return (
		<div className={`${styles.container}`}>
			<Portada />
			<Filters />
			<CardsTriple />
			<CardHistory />
		</div>
	);
}
