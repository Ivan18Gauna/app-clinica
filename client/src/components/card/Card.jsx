import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function CardEdit({name , id} ) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://c8.alamy.com/compes/2dtw8p3/estetoscopio-vector-salud-medico-logotipo-medico-2dtw8p3.jpg" alt="img not found" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Somos todos desarolladores exclavizados por el tincho 
          y oligarca de Martin Figueroa
        </Card.Text>
        <Button as={Link} to={'/details/'+id} variant="primary">Saber Mas</Button>
      </Card.Body>
    </Card>
  );
}

export default CardEdit;