import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styles from './Filters.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { get_cities, get_specialties } from '../../redux/actions';

const Filters = () => {
	const specialties = useSelector((state) => state.specialties);
	const cities = useSelector((state) => state.cities);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(get_specialties());
		dispatch(get_cities());
	}, [dispatch]);

	return (
		<div className={`${styles.contenedorSearch}`}>
			<Row
				xs={1}
				sm={1}
				md={1}
				lg={3}
				className={`justify-content-center ${styles.searchMin}`}
			>
				<Col xs={11} sm={8} className={styles.search}>
					<Form.Control type={'text'} placeholder={'Nombre...'} />
				</Col>
				<Col xs={11} sm={8} lg={6} className={styles.search}>
					<ButtonGroup className={`${styles.buttonGroup}`}>
						<select>
							{specialties &&
								specialties.map((el) => <option value={el}>{el}</option>)}
						</select>

						<select>
							{cities && cities.map((el) => <option value={el}>{el}</option>)}
						</select>
					</ButtonGroup>
				</Col>
				{/* <Col xs={5} sm={5} lg={2} md={4} className={styles.search}>
          <Button className={`${styles.btn}`} type={"submit"}>
            Buscar
          </Button>
        </Col> */}
			</Row>
		</div>
	);
};

export default Filters;
