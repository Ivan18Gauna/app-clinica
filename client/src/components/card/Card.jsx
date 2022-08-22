import React from "react";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';



function CardEdit({ name, lastname, id }) {
  return (
    <div className="m-0 row justify-content-center">
      <div className="col-8 text-center">
        <img src="https://thumbs.dreamstime.com/z/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-doctor-icon-avatar-physician-stethoscope-medicine-symbol-vector-illustration-217777812.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name} {lastname}</h5>
          <p className="card-text">
            Soy un profesional especializado con años de experiencia y con muchas referencias
          </p>
        </div>     
        <Link to={'/details/'+id}>
        <button type="button" className="btn btn-primary">Ver detalle</button>
        </Link>
      </div>
    </div>

  );
}

export default CardEdit;
