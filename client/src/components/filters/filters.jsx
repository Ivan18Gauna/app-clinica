import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styles from './Filters.module.css';

const Filters = () => {
	return (
		<div className={`${styles.contenedor}`}>
			<Row className={`justify-content-center`}>
				<Col lg={4}>
					<Form.Control type={'text'} placeholder={'Nombre...'} />
				</Col>
				<Col>
					<ButtonGroup>
						<DropdownButton as={ButtonGroup} title={'Especialidad'}>
							<Dropdown.Item>Alergia</Dropdown.Item>
							<Dropdown.Item>Actividad Fisica</Dropdown.Item>
						</DropdownButton>
						<DropdownButton as={ButtonGroup} title={'Ubicacion'}>
							<Dropdown.Item>Argentina</Dropdown.Item>
						</DropdownButton>
					</ButtonGroup>
				</Col>
				<Col>
					<Button className={`${styles.btn}`} type={'submit'}>Buscar</Button>
				</Col>
			</Row>
		</div>
	);
};

export default Filters;
