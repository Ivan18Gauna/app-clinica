import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import doctor from '../../Icons/iconfinder-icon.svg';
import doctorIcon from '../../Icons/user-doctor-solid.svg';
import styles from './Card.module.css';



function CardEdit({ name, lastname, id }) {
  return (
    <div class="m-0 row justify-content-center">
      <div class="col-8 text-center">
        <img src="https://thumbs.dreamstime.com/z/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-doctor-icon-avatar-physician-stethoscope-medicine-symbol-vector-illustration-217777812.jpg" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{name} {lastname}</h5>
          <p class="card-text">
            Soy un profecional especialisado con años de experiencia y con muchas referencias
          </p>
        </div>     
        <Link to={'/details/'+id}>
        <button type="button" class="btn btn-primary">Ver detalle</button>
        </Link>
      </div>
    </div>

  );
}

export default CardEdit;
