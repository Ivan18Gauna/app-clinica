import { React } from 'react';
import { useSelector } from 'react-redux';
import Portada from '../portada/Portada.jsx';
import Filters from '../filters/Filters.jsx';
import CardsTriple from '../infoCards/InfoCards';
import CardHistory from '../cardHistory/CardHistory';
import styles from './Home.module.css';
// import { useAuth0 } from '@auth0/auth0-react';
import HomePatients from '../homePatients/HomePatients.jsx';
import HomeProfessional from '../homeProfessionals/HomeProfessionals.jsx';

export default function Home() {
	// const {isAuthenticated} = useAuth0();
	const user = useSelector( state => state.user)

	return (
		<div>
			{ user.length > 0 && user.document && <HomePatients/> }
			{ user.length > 0 && user.license && <HomeProfessional/> }
			{ user.length < 1 &&
				<div className={`${styles.container}`}>
					<Portada />
					<Filters />
					<CardsTriple />
					<CardHistory />
				</div>
			}
		</div>
	);
}
