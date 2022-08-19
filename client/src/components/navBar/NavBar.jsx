import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import "./navBar.css"

function navBarEdit() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <div className='Div-Salud'>
        <Navbar.Brand as={Link} to="/home">+Salud</Navbar.Brand>
      </div>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/price">Precios</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link as={Link} to="/professionals">Buscar Profecionales</Nav.Link>
            <Nav.Link as={Link} to="/signin">Registrarse</Nav.Link>
            <Nav.Link /* eventKey={2} */as={Link} to="/login" >
              Ingresar
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navBarEdit;