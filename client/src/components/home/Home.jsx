import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_Doctors } from '../../redux/actions';
import Cards from '../cards/Cards';
import Filters from '../filters/filters.jsx';
import Container from 'react-bootstrap/Container';

export default function Home() {
	const dispatch = useDispatch();
	const doctors = useSelector((state) => state.doctors);
	useEffect(() => {
		dispatch(get_Doctors());
	}, [dispatch]);

	return (
		<Container>
			<Filters />
			<Cards doctors={doctors} />
		</Container>
	);
}
