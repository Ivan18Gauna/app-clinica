import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styles from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterConvinado,
	get_cities,
	get_specialties,
} from '../../redux/actions';

const Filters = () => {
	const [filter, setFilter] = useState({
		lastname: '',
		filterEsp: '',
		filterProfProv: '',
	});
	const specialties = useSelector((state) => state.specialties);
	const cities = useSelector((state) => state.cities);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(get_specialties());
		dispatch(get_cities());
		dispatch(filterConvinado(filter));
    console.log(filter)
	}, [dispatch, filter]);

	const handleSubmit = (e) => {
		e.preventDefault();
		filterConvinado(filter);
	};

	const handleOnChange = (e) => {
		setFilter({
			...filter,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className={`${styles.contenedorSearch}`}>
			<Form onSubmit={(e) => handleSubmit(e)}>
				<Row
					xs={1}
					sm={1}
					md={1}
					lg={3}
					className={`justify-content-center ${styles.searchMin}`}
				>
					<Col>
						<Form.Control
							onChange={(e) => handleOnChange(e)}
							type={'text'}
							value={filter.lastname}
							name="lastname"
							placeholder={'Nombre...'}
						/>
					</Col>
					<Col lg={6} className={styles.selects}>
						<Form.Select onChange={(e) => handleOnChange(e)} name="filterEsp">
							<option hidden>Especialidad</option>
							{specialties &&
								specialties.map((el) => (
									<option key={el.id} value={el.name}>
										{el.name}
									</option>
								))}
						</Form.Select>
						<Form.Select
							onChange={(e) => handleOnChange(e)}
							name="filterProfProv"
						>
							<option hidden>Ubicacion</option>
							{cities &&
								cities.map((el) => (
									<option key={el} value={el}>
										{el}
									</option>
								))}
						</Form.Select>
					</Col>
					<Col lg={2}>
						<Button className={`${styles.btn}`} type={'submit'}>
							Buscar
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default Filters;
