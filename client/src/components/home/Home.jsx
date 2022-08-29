import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Portada from '../portada/Portada.jsx';
import Filters from '../filters/Filters.jsx';
import CardsTriple from '../infoCards/InfoCards';
import CardHistory from '../cardHistory/CardHistory';
import styles from './Home.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import HomePatients from '../homePatients/HomePatients.jsx';
import HomeProfessional from '../homeProfessionals/HomeProfessionals.jsx';
import { getUserDetail } from '../../redux/actions/index.js';


export default function Home() {
	
	const { user, isAuthenticated } = useAuth0();
	const dispatch = useDispatch();
	const globalUser = useSelector( state => state.user)

	if((isAuthenticated && !globalUser) || (isAuthenticated && globalUser && !globalUser.name)){
		dispatch(getUserDetail(user.email))
	}

	return (
		<div>
			{ globalUser && globalUser.document && <HomePatients/> }
			{ globalUser && globalUser.license && <HomeProfessional/> }
			{ !globalUser || (globalUser && !globalUser.name) ?
				<div className={`${styles.container}`}>
					<Portada />
					<Filters />
					<CardsTriple />
					<CardHistory />
				</div> 
				: null
			}
			
		</div>
	);
}
