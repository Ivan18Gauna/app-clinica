import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import doctorIcon from '../../Icons/user-doctor-solid.svg';
import styles from '../card/Card.module.css'


function CardEditPatients({ id, name, lastname, avatar, city, mail}) {

	return (
		<div className={`${styles.container}`}>
			<div className={styles.ImgUser}>
				<img src={avatar} alt="doctor"/>
				{console.log(avatar)}
			</div>
			<div className={styles.info}>
				<div>
					<img src={doctorIcon} alt="iconDoctor" />
					<h5>{name} {lastname}</h5>
				</div>
				<p>{city}</p>
				<h6> Soy un profesional especializado con años de experiencia y con muchas referencias </h6>
				<Link  to={`/detailPatAdmin/${id}`}> 
					<Button type="button">Ver detalle</Button>
				</Link>
			</div>
		</div>
	);
}

export default CardEditPatients;
