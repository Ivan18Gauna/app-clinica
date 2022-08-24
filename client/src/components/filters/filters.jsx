import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Route, Switch } from 'react-router-dom';
import styles from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterConvinado,
	get_cities,
	get_specialties,
} from '../../redux/actions';
import { useHistory } from 'react-router-dom';

const Filters = () => {
	const history = useHistory();
	const [filter, setFilter] = useState({
		lastname: '',
		filterEsp: '',
		filterProfProv: '',
	});
	const specialties = useSelector((state) => state.specialties);
	const cities = useSelector((state) => state.cities);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(get_cities());
		dispatch(get_specialties());
	}, [dispatch]);
	useEffect(() => {
		dispatch(filterConvinado(filter));
	}, [dispatch, filter]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(filterConvinado(filter));
		history.push('/professionals');
	};
	const handleOnChange = (e) => {
		setFilter({
			...filter,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className={`${styles.contenedorSearch}`}>
			<Form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
					<Col lg={5} className={styles.selects}>
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
					<Switch>
						<Route path={'/home'}>
							<Col lg={2}>
								<Button className={styles.button} variant="info" type="submit">
									Buscar
								</Button>
							</Col>
						</Route>
					</Switch>
				</Row>
			</Form>
		</div>
	);
};

export default Filters;
