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
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [pricer] = useState({
    basic: 8,
    standar: 20,
    premium: 40
  });
  const quantity = 1;
  let fecha = new Date();
  const arr = fecha.toString().split(" ");
  const date = arr[2] + "/" + arr[1] + "/" + arr[3];

  useEffect(() => {
    const cookies = new Cookies();
    dispatch(getUserDetail(cookies.get("userEmail")));
  }, [dispatch]);

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
                  <span className="h2">$8</span>/Mes
                  <br />
                </div>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" /> Dapibus ac
                  Cras justo odio
                </ListGroup.Item>
                <ListGroup.Item>
                  <CloseIcon
                    sx={{ fontSize: 15, color: "red" }}
                    color="success"
                  />{" "}
                  Cras justo odio Dapibus ac
                </ListGroup.Item>
                <ListGroup.Item>
                  <CloseIcon
                    sx={{ fontSize: 15, color: "red" }}
                    color="success"
                  />{" "}
                  Cras justo odio Vestibulum
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
                  <span className="h2">$20</span>/Mes
                  <br />
                </div>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" /> Cras justo
                  odio
                </ListGroup.Item>
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" /> Dapibus ac
                  facilisis in
                </ListGroup.Item>
                <ListGroup.Item>
                  <CloseIcon
                    sx={{ fontSize: 15, color: "red" }}
                    color="success"
                  />{" "}
                  Vestibulum at eros
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
                  <span className="h2">$40</span>/Mes
                  <br />
                </div>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" /> Cras justo
                  odio
                </ListGroup.Item>
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" /> Dapibus ac
                  facilisis in
                </ListGroup.Item>
                <ListGroup.Item>
                  <CheckIcon sx={{ fontSize: 15 }} color="success" /> Vestibulum
                  at eros
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
