import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import question from '../../Icons/question.svg'

function CardHistory() {
	return (
		<CardGroup>
			<Card>
				<Card.Img
					variant="top"
					src={question}
				/>
				<Card.Body>
					<Card.Title>¿Como funciona +Salud?</Card.Title>
					<Card.Text>Aprende en tres simples pasos a usar +Salud.</Card.Text>
				</Card.Body>
			</Card>
			<Card>
				<Card.Body>
					<Card.Title>1 Registrate</Card.Title>
					<Card.Text>
						Lo primero que debes hacer es registrarte gratuitamente en +Salud.
						Dale click al boton <a href="/login">registrarse</a> y comenza a
						crear tu historia clinica.
					</Card.Text>
				</Card.Body>
			</Card>
			<Card>
				<Card.Body>
					<Card.Title>2 Completa tus datos</Card.Title>
					<Card.Text>
						Al ingresar veras casilleros vacios en donde completaras tu
						informacion basica de salud y enfermedades preexistentes. Recorda
						que la historia clinica es tuya y solo permitiras el acceso de quien
						vos desees.
					</Card.Text>
				</Card.Body>
			</Card>
			<Card>
				<Card.Body>
					<Card.Title>3 Dale valor médico</Card.Title>
					<Card.Text>
						+Salud ideo una aplicacion para que cada vez que visites un
						profesional, este mismo pueda cargar tu atencion de manera facil y
						ordenada. Solo tenes que notificarle y permitirle el acceso.
						Descuida, si buscas y te atendes con un medico registrado en +Salud,
						no deberas notificarle nada, se cargara automaticamente.
					</Card.Text>
				</Card.Body>
			</Card>
		</CardGroup>
	);
}

export default CardHistory;
