import React, { useEffect, useState } from 'react';
import Filters from '../filters/filters';
import Cards from '../cards/Cards.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { get_Doctors } from '../../redux/actions';
import styles from './Professionals.module.css';

export default function Professionals() {
	const dispatch = useDispatch();
	// const[order]= useState("ASC");
	// const [page ]=useState(0);
	// const [filterProfProv, ]=useState("");
	// const [filterEsp]=useState("");
	const doctors = useSelector((state) => state.doctors);
	useEffect(() => {
		dispatch(get_Doctors());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<Filters />
			<Cards doctors={doctors} />
		</div>
	);
}
