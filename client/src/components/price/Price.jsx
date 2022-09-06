import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { getUserDetail } from "../../redux/actions";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function Price() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [pricer] = useState({
    basic: 15,
    standar: 20,
    premium: 40
  });
  const quantity = 1;
  let fecha = new Date();
  const arr = fecha.toString().split(" ");
  const date = arr[2] + "/" + arr[1] + "/" + arr[3];

  useEffect(() => {
    dispatch(getUserDetail(cookies.get("userEmail")));
  }, []);

  const onClickBuy = async e => {
    const res = await axios.post("/mercadopago", {
      id: user.id,
      mail: user.mail,
      price: e.target.value,
      quantity,
      date
    });
    window.location.href = `${res.data.id}`;
  };

  return (
    <div
      className="container-fluid"
      style={{
        height: "89.4%"
      }}
    >
      <div className="container p-5 w-100 h-100">
        <div className="row h-100">
          <div className="col-lg-4 col-md-12">
            <div className="card h-100 shadow-lg">
              <div className="card-body">
                <div className="text-center p-3">
                  <h5 className="card-title">Basico</h5>
                  <small>Individual</small>
                  <br />
                  <span className="h2">$15</span>/Mes
                  <br />
                </div>
                <p className="card-text">
                  Registra de manera segura, eficiente e inteligente tu servicio de control de turnos y seguimiento de pacientes.
                </p>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" />
                  Tomar turnos
                </ListGroup.Item>
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" />
                  Registrar historias clinicas
                </ListGroup.Item>
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" />
                  Acceso directo a tus pacientes
                </ListGroup.Item>
              </ListGroup>
              <div className="card-body text-center">
                <Button
                  variant="outline-primary"
                  size="md"
                  value={pricer.basic}
                  onClick={e => onClickBuy(e)}
                  style={{ borderRadius: "30px" }}
                >
                  Comprar ahora
                </Button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="card h-100 shadow-lg">
              <div className="card-body">
                <div className="text-center p-3">
                  <h5 className="card-title">Estandar</h5>
                  <small>Small Business</small>
                  <br />
                  <span className="h2">$20</span>/Bimentral
                  <br />
                </div>
                <p className="card-text">
                Registra de manera segura, eficiente e inteligente tu servicio de control de turnos y seguimiento de pacientes.
                </p>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" />
                  Tomar turnos
                </ListGroup.Item>
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" />
                  Registrar historias clinicas
                </ListGroup.Item>
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" />
                  Acceso directo a tus pacientes
                </ListGroup.Item>
              </ListGroup>
              <div className="card-body text-center">
                <Button
                  variant="outline-primary"
                  size="md"
                  style={{ borderRadius: "30px" }}
                  value={pricer.standar}
                  onClick={e => onClickBuy(e)}
                >
                  Comprar ahora
                </Button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="card h-100 shadow-lg">
              <div className="card-body">
                <div className="text-center p-3">
                  <h5 className="card-title">Premium</h5>
                  <small>Large Companies</small>
                  <br />
                  <span className="h2">$40</span>/Semestral
                  <br />
                </div>
                <p className="card-text">
                Registra de manera segura, eficiente e inteligente tu servicio de control de turnos y seguimiento de pacientes.
                </p>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" />
                  Tomar turnos
                </ListGroup.Item>
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" />
                  Registrar historias clinicas
                </ListGroup.Item>
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" />
                  Acceso directo a tus pacientes
                </ListGroup.Item>
              </ListGroup>
              <div className="card-body text-center">
                <Button
                  variant="outline-primary"
                  size="md"
                  style={{ borderRadius: "30px" }}
                  value={pricer.premium}
                  onClick={e => onClickBuy(e)}
                >
                  Comprar ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
