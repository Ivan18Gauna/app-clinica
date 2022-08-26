import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
	const dispatch = useDispatch();
	const cities = useSelector((state) => state.cities);
	const specialties = useSelector((state) => state.specialties);

	const [filter, setFilter] = useState({
		lastname: '',
		filterEsp: '',
		filterProfProv: '',
		order: 'ASC',
	});

	useEffect(() => {
		dispatch(get_cities());
		dispatch(get_specialties());
	}, [dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			filterConvinado(
				filter.lastname,
				filter.filterEsp,
				filter.filterProfProv,
				filter.order
			)
		);
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
					<Col md={10} className={styles.col}>
						<Form.Control
							onChange={(e) => handleOnChange(e)}
							type={'text'}
							value={filter.lastname}
							name="lastname"
							placeholder={'Apellido...'}
						/>
					</Col>
					<Col lg={5} md={10} className={`${styles.selects}`}>
						<Form.Select
							value={filter.filterEsp}
							onChange={(e) => handleOnChange(e)}
							name="filterEsp"
						>
							<option hidden>Especialidad</option>
							{specialties &&
								specialties.map((el) => (
									<option key={el.name} value={el.name}>
										{el.name}
									</option>
								))}
						</Form.Select>
						<Form.Select
							value={filter.filterProfProv}
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
						<Form.Select
							value={filter.order}
							onChange={(e) => handleOnChange(e)}
							name="order"
						>
							<option value="ordenar" hidden>
								Ordernar
							</option>
							<option value="ASC">ASC</option>
							<option value="DESC">DESC</option>
						</Form.Select>
					</Col>
					<Col lg={2} md={10} xs={12} className={`${styles.selects}`}>
						<Button
							onClick={(e) => handleSubmit(e)}
							className={styles.button}
							variant="info"
							type="submit"
						>
							Buscar
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default Filters;

/* import React, { useEffect, useState } from 'react'; */
/* import Row from 'react-bootstrap/Row'; */
/* import Col from 'react-bootstrap/Col'; */
/* import Form from 'react-bootstrap/Form'; */
/* import Button from 'react-bootstrap/Button'; */
/* import { Route, Switch } from 'react-router-dom'; */
/* import styles from './Filters.module.css'; */
/* import { useDispatch, useSelector } from 'react-redux'; */
/* import { */
/* 	filterConvinado, */
/* 	get_cities, */
/* 	get_specialties, */
/* } from '../../redux/actions'; */
/* import { useHistory } from 'react-router-dom'; */
/**/
/* const Filters = () => { */
/* 	const history = useHistory(); */
/* 	const [filter, setFilter] = useState({ */
/* 		lastname: '', */
/* 		filterEsp: '', */
/* 		filterProfProv: '', */
/* 	}); */
/*   console.log(filter) */
/* 	const specialties = useSelector((state) => state.specialties); */
/* 	const cities = useSelector((state) => state.cities); */
/* 	const dispatch = useDispatch(); */
/* 	useEffect(() => { */
/* 		dispatch(get_cities()); */
/* 		dispatch(get_specialties()); */
/* 	}, [dispatch]); */
/* 	useEffect(() => { */
/* 		dispatch(filterConvinado(filter)); */
/* 	}, [dispatch, filter]); */
/**/
/* 	const handleSubmit = (e) => { */
/* 		e.preventDefault(); */
/* 		dispatch(filterConvinado(filter)); */
/* 		history.push('/professionals'); */
/* 	}; */
/* 	const handleOnChange = (e) => { */
/* 		setFilter({ */
/* 			...filter, */
/* 			[e.target.name]: e.target.value, */
/* 		}); */
/* 	}; */
/**/
/* 	return ( */
/* 		<div className={`${styles.contenedorSearch}`}> */
/* 			<Form className={styles.form} onSubmit={(e) => handleSubmit(e)}> */
/* 				<Row */
/* 					xs={1} */
/* 					sm={1} */
/* 					md={1} */
/* 					lg={3} */
/* 					className={`justify-content-center ${styles.searchMin}`} */
/* 				> */
/* 					<Col> */
/* 						<Form.Control */
/* 							onChange={(e) => handleOnChange(e)} */
/* 							type={'text'} */
/* 							value={filter.lastname} */
/* 							name="lastname" */
/* 							placeholder={'Nombre...'} */
/* 						/> */
/* 					</Col> */
/* 					<Col lg={5} className={styles.selects}> */
/* 						<Form.Select onChange={(e) => handleOnChange(e)} name="filterEsp"> */
/* 							<option hidden>Especialidad</option> */
/* 							{specialties && */
/* 								specialties.map((el) => ( */
/* 									<option key={el.id} value={el.name}> */
/* 										{el.name} */
/* 									</option> */
/* 								))} */
/* 						</Form.Select> */
/* 						<Form.Select */
/* 							onChange={(e) => handleOnChange(e)} */
/* 							name="filterProfProv" */
/* 						> */
/* 							<option hidden>Ubicacion</option> */
/* 							{cities && */
/* 								cities.map((el) => ( */
/* 									<option key={el} value={el}> */
/* 										{el} */
/* 									</option> */
/* 								))} */
/* 						</Form.Select> */
/* 					</Col> */
/* 					<Switch> */
/* 						<Route path={'/home'}> */
/* 							<Col lg={2}> */
/* 								<Button className={styles.button} variant="info" type="submit"> */
/* 									Buscar */
/* 								</Button> */
/* 							</Col> */
/* 						</Route> */
/* 					</Switch> */
/* 				</Row> */
/* 			</Form> */
/* 		</div> */
/* 	); */
/* }; */
/**/
/* export default Filters; */
