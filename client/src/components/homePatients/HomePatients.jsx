import React from "react";
import Cookie from "universal-cookie";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTurnoPat, getUserDetail } from "../../redux/actions";
import "./HomePatients.css";

export default function HomePatients({ userInfo }) {
  const dispatch = useDispatch();
  const turnos = useSelector(state => state.turnos);

  useEffect(() => {
    const cookies = new Cookie();
    dispatch(getUserDetail(cookies.get("userEmail")));
    dispatch(getTurnoPat(userInfo.id));
  }, [dispatch, userInfo.id]);

  turnos && console.log("turno:", turnos);
  // let userInfo = ["a+", "Covid",  "al Polen", "si, donante", "si, transfundible", "Hipertension", "Accord Salud 3.2"]
  return (
    <div>
      {userInfo && userInfo.document ? (
        <div>
          <h1>Bienvenido {userInfo.name} a +Salud</h1>
          <div className="Info">
            <div className="info1">
              <Card style={{ width: "22rem" }}>
                <Card.Body>
                  <Card.Title>Proximos Turnos</Card.Title>
                  <Card.Text>
                    Recorda pedirle a tu medico que actualice tu historia
                    clinica!
                  </Card.Text>
                  ------------------------------------
                  {turnos.slice(0, 1).map((e, i) => {
                    return (
                      <ListGroup key={i} variant="flush">
                        <ListGroup.Item key={i}>
                          Fecha: {e ? e.date : ""}
                        </ListGroup.Item>
                        <ListGroup.Item key={i + 1}>
                          Hora: {e ? e.time : ""}
                        </ListGroup.Item>
                        <ListGroup.Item key={i + 2}>
                          Profesional: {e ? e.professional.name : ""}
                        </ListGroup.Item>
                        <ListGroup.Item key={i + 3}>
                          Domicilio: Av Libertador 1521
                        </ListGroup.Item>
                        ------------------------------------
                        <br />
                      </ListGroup>
                    );
                  })}
                  <br />
                  {/* <Card.Link href="#">Cancelar turno</Card.Link>
                  <Card.Link href="#">Pedir otro turno</Card.Link> */}
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card style={{ width: "22rem" }}>
                <Card.Body>
                  <Card.Title>Informacion basica</Card.Title>
                  <Card.Text>Lleva tus principales detalles medicos</Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      Grupo Sanguineo: {userInfo.blood}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Vacunas:{" "}
                      {userInfo.vaccines?.length > 0 &&
                        userInfo.vaccines.map((el, i) => (
                          <span key={i}>{el}/ </span>
                        ))}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Alergias:{" "}
                      {userInfo.allergies?.length > 0 &&
                        userInfo.allergies.map((el, i) => <span key={i}>{el}/ </span>)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Donante: {userInfo.donation}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Transfundible: {userInfo.transfusion}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Enfermedades crónicas:{" "}
                      {userInfo.chronicles?.length > 0 &&
                        userInfo.chronicles.map((el, i) => <span key={i}>{el}/ </span>)}
                    </ListGroup.Item>
                    <ListGroup.Item>Obra Social: {userInfo.oS}</ListGroup.Item>
                  </ListGroup>

                  <br />

                  <Card.Link href="/userProfile">Actualizar Informacion</Card.Link>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card style={{ width: "22rem" }}>
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
                  </Card.Text>{" "}
                  <Link to="/clinic_history">
                    <Button variant="primary">Llevame!</Button>
                  </Link>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Ultima actualizacion: 2hs
                </Card.Footer>
              </Card>
            </div>

            <div className="botones2">
              <Card className="text-center">
                <Card.Header>Profesionales</Card.Header>
                <Card.Body>
                  <Card.Title>¿Necesitas un medico?</Card.Title>
                  <Card.Text>
                    Busca el medico que necesitas para tus problemas, filtra por
                    especialidad o nombre.
                  </Card.Text>
                  <Link to="/professionals">
                    <Button variant="primary">Buscar!</Button>
                  </Link>
                </Card.Body>
                <Card.Footer className="text-muted">+Salud</Card.Footer>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading.login">
          <Loading />
        </div>
      )}
    </div>
  );
}
