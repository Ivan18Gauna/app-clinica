import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Portada from '../portada/Portada.jsx';
import Filters from '../filters/Filters.jsx';
import CardsTriple from '../infoCards/InfoCards';
import CardHistory from '../cardHistory/CardHistory';
import styles from './Home.module.css';
// import { useAuth0 } from '@auth0/auth0-react';
import HomePatients from '../homePatients/HomePatients.jsx';
import HomeProfessional from '../homeProfessionals/HomeProfessionals.jsx';
import Cookie from 'universal-cookie'
import { useEffect } from 'react';
import { getUserDetail } from '../../redux/actions/index.js';


export default function Home() {
	const dispatch = useDispatch()
	const cookie = new Cookie();
	useEffect(() => {
		dispatch(getUserDetail(cookie.get('userEmail')))
	}, [])
	
	// const {isAuthenticated} = useAuth0();
	const user = useSelector( state => state.user)
	/* if (user.length) {		 */
		console.log('state', user)
	/* } */


	return (
		<div>
			{ user && user.document && <HomePatients/> }
			{ user && user.license && <HomeProfessional/> }
			{ user && user.length < 1 &&
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
