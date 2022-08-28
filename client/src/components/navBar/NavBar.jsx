import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import logo from '../../Icons/logo.svg'

function NavBarEdit() {
	const { isAuthenticated } = useAuth0();

	return (
		<Navbar
			className={styles.navbar}
			collapseOnSelect
			expand="lg"
			bg="primary"
			variant="dark"
		>
			<Navbar.Brand className={styles.titulo} as={Link} to="/home">
				<img src={logo} alt="logo" />
				<h4>SALUD</h4>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link as={Link} to="/about">
						Nosotros
					</Nav.Link>
					<Nav.Link as={Link} to="/price">
						Precios
					</Nav.Link>
				</Nav>
				<Nav>
					{!isAuthenticated ? (
						<Nav.Link as={Link} to="/login">
							Ingresar
						</Nav.Link>
					) : (
						<Nav.Link as={Link} to="/userProfile">
							Mi perfil
						</Nav.Link>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavBarEdit;
