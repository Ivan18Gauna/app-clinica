import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_Doctors } from '../../redux/actions';
import Cards from '../cards/Cards';
import Filters from '../filters/filters.jsx';
import Container from 'react-bootstrap/Container';
import Portada from '../portada/portada';
import CardsTriple from '../infoCards/infoCards';

export default function Home() {
	const dispatch = useDispatch();
	const doctors = useSelector((state) => state.doctors);
	useEffect(() => {
		dispatch(get_Doctors());
	}, [dispatch]);

	return (
		<Container>
			<Portada/>
			{/* Darle a los filtros un diseño para que quede en el medio 
			y con mayor estilo */}
			<Filters />
			<CardsTriple/>
		    <Cards doctors={doctors} />
		</Container>
	);
}
