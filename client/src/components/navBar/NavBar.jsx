import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useHistory } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../Icons/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { getInvoice } from "../../redux/actions";

function NavBarEdit() {

  const dispatch = useDispatch();
  const history = useHistory();
  const cookies = new Cookies();
  const conf = cookies.get("userEmail");
  const { isAuthenticated, logout } = useAuth0();

  const globalUser = useSelector(state => state.user);
  const paid = useSelector(state => state.suscribed);
  console.log(paid, "paid");

  useEffect(() => {
    dispatch(getInvoice(globalUser.id));
  }, [dispatch, globalUser.id]);

  function handleClick() {
    if (isAuthenticated) {
      logout();
    }
    cookies.remove("userEmail", { path: "/" });
    history.push("/");
  }

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
      {globalUser && globalUser.rolUser ? (
        <button onClick={handleClick}>Cerrar sesión</button>
      ) : (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/about">
                Nosotros
              </Nav.Link>
              {globalUser && globalUser.license && !paid[0] ? (
                <Nav.Link as={Link} to="/price">
                  Precios
                </Nav.Link>
              ) : null}
            </Nav>
            <Nav>
              {isAuthenticated || (globalUser && globalUser.mail) || conf ? (
                <Nav.Link as={Link} to="/userProfile">
                  Mi perfil
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Ingresar
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
}

export default NavBarEdit;
