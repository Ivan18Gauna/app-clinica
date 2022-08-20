import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function CardEdit({name, lastname, id} ) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://cdn2.iconfinder.com/data/icons/coronavirus-8/512/stethoscope-doctor-health-medical-healthcare-512.png" alt="img not found" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Title>{lastname}</Card.Title>

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
