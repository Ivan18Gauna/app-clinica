import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import "./info.css"

function CardsTriple() {
  return (
    <CardGroup className='top'>
      <Card>
        <Card.Img variant="top" src="https://img.freepik.com/vector-gratis/personal-medico-fue-vacunado-contra-covid19-al-paciente_40876-2494.jpg?w=2000" />
        <Card.Body>
          <Card.Title>Siempre actualizados</Card.Title>
          <Card.Text>
           +Salud brinda sus herramientas tecnologicas para que cada atencion medica que obtengas quede registrada.
          </Card.Text>
        </Card.Body>
       
      </Card>
      <Card>
        <Card.Img variant="top" src="https://img.freepik.com/vector-premium/linda-ilustracion-medico-dibujos-animados-estilo-handrawn_53734-77.jpg?w=740" />
        <Card.Body>
          <Card.Title>Medicos de calidad</Card.Title>
          <Card.Text>
           Eleji tu medico preferido de la plataforma y consegui un turno con el. Toda la informacion del mismo en +Salud.
          </Card.Text>
        </Card.Body>
      
      </Card>
      <Card>
        <Card.Img variant="top" src="https://png.pngtree.com/png-vector/20200410/ourlarge/pngtree-design-of-doctor-holding-a-medical-record-png-image_2180476.jpg" />
        <Card.Body>
          <Card.Title>Historia Clinica</Card.Title>
          <Card.Text>
            Toda tu informacion basica de salud y estudios a lo largo de la vida en una misma plataforma. Nos preocupamos para que cada centro de salud obtenga las herramientas necesarias para darte el mejor tratamiento.
          </Card.Text>
        </Card.Body>
        
      </Card>
    </CardGroup>
  );
}

export default CardsTriple;
