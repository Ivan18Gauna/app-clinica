import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import data from '../../Icons/medicalHis.png'
import medicos from '../../Icons/medicos.svg'
import update from '../../Icons/update.svg'
import './Info.css';

function CardsTriple() {
	return (
    <div className='containerInfo'>
		<CardGroup className="top">
			<Card>
				<Card.Img
					variant="top"
					src={update}
				/>
				<Card.Body>
					<Card.Title>Siempre actualizados</Card.Title>
					<Card.Text>
						+Salud brinda sus herramientas tecnologicas para que cada atencion
						medica que obtengas quede registrada.
					</Card.Text>
				</Card.Body>
			</Card>
			<Card>
				<Card.Img
					variant="top"
					src={medicos}
				/>
				<Card.Body>
					<Card.Title>Medicos de calidad</Card.Title>
					<Card.Text>
						Eleji tu medico preferido de la plataforma y consegui un turno con
						el. Toda la informacion del mismo en +Salud.
					</Card.Text>
				</Card.Body>
			</Card>
			<Card>
				<Card.Img
					variant="top"
					src={data}
				/>
				<Card.Body>
					<Card.Title>Historia Clinica</Card.Title>
					<Card.Text>
						Toda tu informacion basica de salud y estudios a lo largo de la vida
						en una misma plataforma. Nos preocupamos para que cada centro de
						salud obtenga las herramientas necesarias para darte el mejor
						tratamiento.
					</Card.Text>
				</Card.Body>
			</Card>
		</CardGroup>
    </div>
	);
}

export default CardsTriple;
