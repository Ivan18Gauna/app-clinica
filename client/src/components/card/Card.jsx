import React from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import doctor from '../../Icons/iconfinder-icon.svg';
import doctorIcon from '../../Icons/user-doctor-solid.svg';
import styles from './Card.module.css';

function CardEdit({ id, name, lastname, specialties }) {

	const globalUser = useSelector(state => state.user);

	return (
		<div className={`${styles.container}`}>
			<div className={styles.ImgUser}>
				<img src={doctor} alt="doctor" />
			</div>
			<div className={styles.info}>
				<div>
					<img src={doctorIcon} alt="iconDoctor" />
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
				{ globalUser && globalUser.rolUser === 'admin' ?
					<Link  to={`/detailProfAdmin/${id}`}> 
						<Button type="button">Ver detalle</Button>
					</Link>
					:
					<Link to={`/details/${id}`}>
						<Button type="button">Ver detalle</Button>
					</Link>
				}
				
			</div>
		</div>
	);
}

export default CardEdit;
