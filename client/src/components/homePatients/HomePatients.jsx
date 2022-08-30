import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import  "./HomePatients.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Loading from "../loading/Loading";
import styles from '../login/Login.module.css'

export default function HomePatients() {

  const userInfo = useSelector( state => state.user )
  // let userInfo = ["a+", "Covid",  "al Polen", "si, donante", "si, transfundible", "Hipertension", "Accord Salud 3.2"]

  return (
    <div>
      { userInfo && userInfo.document ?
    <div>
      <h1>Bienvenido {userInfo.name} a +Salud</h1>
      <div className="Info">
        <div className="info1">
          <Card style={{ width: '22rem' }}>
            <Card.Body>
              <Card.Title>Proximos Turno</Card.Title>
          
              <Card.Text>
                Recorda pedirle a tu medico que actualice tu historia clinica!
              </Card.Text>
              <ListGroup variant="flush">
              <ListGroup.Item>Dia: 24/08/2022</ListGroup.Item>
              <ListGroup.Item>Hora: 10:45</ListGroup.Item>
              <ListGroup.Item>Profesional: Dr Curreta</ListGroup.Item>
              <ListGroup.Item>Domicilio: Av Libertador 1521</ListGroup.Item>
            </ListGroup>
            

            <br />
          
              <Card.Link href="#">Cancelar turno</Card.Link>
              <Card.Link href="#">Pedir otro turno</Card.Link>
            </Card.Body>
          </Card>
        </div>

        <div>
          <Card style={{ width: '22rem' }}>
            <Card.Body>
              <Card.Title>Informacion basica</Card.Title>
          
              <Card.Text>
                Lleva tus principales detalles medicos
              </Card.Text>
              <ListGroup variant="flush">
              <ListGroup.Item>Grupo Sanguineo: {userInfo.blood}</ListGroup.Item>
              <ListGroup.Item>Vacunas: {userInfo.vaccines.length > 0 && userInfo.vaccines.map(el => <a>{el}/ </a>)}</ListGroup.Item>
              <ListGroup.Item>Alergias: {userInfo.allergies.length > 0 && userInfo.allergies.map(el => <a>{el}/ </a>)}</ListGroup.Item>
              <ListGroup.Item>Donante: {userInfo.donation}</ListGroup.Item>
              <ListGroup.Item>Transfundible: {userInfo.transfusion}</ListGroup.Item>
              <ListGroup.Item>Enfermedades crónicas: {userInfo.chronicles.length > 0 && userInfo.chronicles.map(el => <a>{el}/ </a>)}</ListGroup.Item>
              <ListGroup.Item>Obra Social: {userInfo.oS}</ListGroup.Item>
            </ListGroup>
            

            <br />
          
              <Card.Link href="#">Actualizar Informacion</Card.Link>
              
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ width: '22rem' }}>
            <Card.Body>
              <Card.Title>Ultima atención</Card.Title>
          
              <Card.Text>
                Recorda la ultima vez que utilizaste la plataforma!
              </Card.Text>
              <ListGroup variant="flush">
              <ListGroup.Item>Dia: 22/06/2022</ListGroup.Item>
              <ListGroup.Item>Hora: 07:45</ListGroup.Item>
              <ListGroup.Item>Profesional: Raul Bazanme</ListGroup.Item>
              <ListGroup.Item>Motivo: Mareos</ListGroup.Item>
            </ListGroup>
            

            <br />
          
              <Card.Link href="#">Repetir atención</Card.Link>

            </Card.Body>
          </Card>
        </div> 
      </div>
      <div className="botones">
        
        <div className="botones1">
          <Card className="text-center">
            <Card.Header>Historia Clinica</Card.Header>
            <Card.Body>
              <Card.Title>Accede a tu Historia Clinica</Card.Title>
              <Card.Text>
                Revisa cada consulta y detalle de tus ultimos estudios.
              </Card.Text> <Link to='/clinic_history'>
              <Button variant="primary">Llevame!</Button>
              </Link>
            </Card.Body>
            <Card.Footer className="text-muted">Ultima actualizacion: 2hs</Card.Footer>
          </Card>
        </div>

        <div className="botones2">
          <Card className="text-center">
          
            <Card.Header>Profesionales</Card.Header>
            <Card.Body>
              <Card.Title>¿Necesitas un medico?</Card.Title>
              <Card.Text>
              Busca el medico que necesitas para tus problemas, filtra por especialidad o nombre.
              </Card.Text>
              <Link to='/professionals'>
              <Button variant="primary">Buscar!</Button>
              </Link>
            </Card.Body>
            <Card.Footer className="text-muted">+Salud</Card.Footer>
          </Card>
        </div>
      </div>    
      </div>  

      : <div className="loading.login">
          <Loading />
        </div>
      }
      
    </div>     
  )
}

// allergies: []
// birth: "1990-01-01"
// blood: "A-"
// chronicles: []
// city: "La Plata"
// deletedAt: null
// document: 11333444
// donation: "no"
// id: 16
// lastname: "ferr"
// mail: "seba48484@gmail.com"
// name: "perri"
// number: 1
// oS: "OSPROTURA"
// phone: "22133344456"
// province: "Buenos Aires"
// street: "1"
// transfusion: "yes"
// vaccines: []
// [[Prototype]]: Obj
