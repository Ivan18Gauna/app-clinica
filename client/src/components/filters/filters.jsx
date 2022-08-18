import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Filters = () => {
	return (
		<Container>
			<Row className={`justify-content-md-center`}>
				<Col lg={3}>
					<Form.Control type={'text'} placeholder={'Por nombre...'} />
				</Col>
				<Col lg={3}>
					<ButtonGroup>
						<DropdownButton as={ButtonGroup} title={'Especialidad'}>
							<Dropdown.Item eventKey="1">Alergia</Dropdown.Item>
							<Dropdown.Item eventKey="2">Actividad Fisica</Dropdown.Item>
						</DropdownButton>
						<DropdownButton as={ButtonGroup} title={'Ubicacion'}>
							<Dropdown.Item eventKey="3">Argentina</Dropdown.Item>
						</DropdownButton>
					</ButtonGroup>
				</Col>
				<Col lg={1}>
					<Button type={'submit'}>Buscar</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Filters;
