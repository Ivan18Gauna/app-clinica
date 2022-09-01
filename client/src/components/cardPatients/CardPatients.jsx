import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import doctor from '../../Icons/iconfinder-icon.svg';
import doctorIcon from '../../Icons/user-doctor-solid.svg';
import styles from '../card/Card.module.css'


function CardEditPatients({ name, lastname, city, mail}) {
	return (
		<div className={`${styles.container}`}>
			<div className={styles.ImgUser}>
				<img src={doctor} alt="doctor"/>
			</div>
			<div className={styles.info}>
				<div>
					<img src={doctorIcon} alt="iconDoctor" />
					<h5>
						{name} {lastname}
					</h5>
				</div>

						 <p>{city}</p>
					 
				<h6>
				Soy un profesional especializado con años de experiencia y con muchas referencias
				</h6>
				
					<Button type="button">Eliminar</Button>
				
			</div>
		</div>
	);
}

export default CardEditPatients;
