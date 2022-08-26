import { React } from 'react';
import Portada from '../portada/Portada.jsx';
import Filters from '../filters/Filters.jsx';
import CardsTriple from '../infoCards/InfoCards';
import CardHistory from '../cardHistory/CardHistory';
import styles from './Home.module.css';
import { useAuth0 } from '@auth0/auth0-react';

export default function Home() {
	const {isAuthenticated} = useAuth0()
	return (
		<div className={`${styles.container}`}>
			<Portada />
			{isAuthenticated && <Filters />}
			<CardsTriple />
			<CardHistory />
		</div>
	);
}
