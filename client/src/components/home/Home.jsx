import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Portada from '../portada/Portada.jsx';
import Filters from '../filters/Filters.jsx';
import CardsTriple from '../infoCards/InfoCards';
import CardHistory from '../cardHistory/CardHistory';
import styles from './Home.module.css';
// import { useAuth0 } from '@auth0/auth0-react';
import HomePatients from '../homePatients/HomePatients.jsx';
import HomeProfessional from '../homeProfessionals/HomeProfessionals.jsx';
import { getUserDetail } from '../../redux/actions/index.js';
import Cookies from 'universal-cookie';


export default function Home() {
	const cookie = new Cookies()
	console.log(cookie.get('userEmail'))
	
/* 	const { user, isAuthenticated } = useAuth0();
 */	const dispatch = useDispatch();
 
 useEffect(() => {
	 dispatch(getUserDetail(cookie.get('userEmail')))
	}, [])
	
	const globalUser = useSelector( state => state.user)
	console.log('felipe', globalUser)
	/* 	if((isAuthenticated && !globalUser) || (isAuthenticated && globalUser && !globalUser.name)){
	} */

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
