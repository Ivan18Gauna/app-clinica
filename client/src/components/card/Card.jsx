import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import doctor from '../../Icons/iconfinder-icon.svg';
import doctorIcon from '../../Icons/user-doctor-solid.svg';
import styles from './Card.module.css';

function CardEdit({ id, name, lastname, specialties }) {
	return (
		<div className={`${styles.container}`}>
			<div className={styles.ImgUser}>
				<img src={doctor} alt='doctor'/>
			</div>
			<div className={styles.info}>
				<div>
					<img src={doctorIcon} alt='iconDoctor'/>
					<h5>
						{name} {lastname}
					</h5>
				</div>
				{specialties
					? specialties.map((e, i) => {
							return <p key={i}>{e.name}</p>;
					  })
					: null}
				<h6>
					Soy un profesional especializado con años de experiencia y con muchas
					referencias
				</h6>
				<Link to={`/details/${id}`}>
					<Button type="button">Ver detalle</Button>
				</Link>
			</div>
		</div>
	);
}

export default CardEdit;
