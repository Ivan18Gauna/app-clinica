import React from 'react';
import data from '../../Icons/medicalHis.png';
import medicos from '../../Icons/medicos.svg';
import update from '../../Icons/update.svg';
import gear from '../../Icons/gear.svg';
import clipboard from '../../Icons/clipboard.svg';
import doctorIcon from '../../Icons/doctorIcon.svg';
import styles from './Info.module.css';

function CardsTriple() {
	return (
		<div className={styles.contenedor}>
			<div className={styles.card}>
				<div className={styles.texto}>
					<img src={gear} alt="update" />
					<h2>Siempre actualizados</h2>
					<p>
						+Salud brinda sus herramientas tecnologicas para que cada atencion
						medica que obtengas quede registrada.
					</p>
					<div className={styles.divide}></div>
				</div>
				<div className={styles.imagen}>
					<img src={update} alt="update" />
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.imagen}>
					<img src={medicos} alt="update" />
				</div>
				<div className={styles.texto}>
					<img src={doctorIcon} alt="update" />
					<h2>Medicos de calidad</h2>
					<p>
						Eleji tu medico preferido de la plataforma y consegui un turno con
						el. Toda la informacion del mismo en +Salud.
					</p>
					<div className={styles.divide}></div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.texto}>
					<img src={clipboard} alt="update" />
					<h2>Historia Clinica</h2>
					<p>
						Toda tu informacion basica de salud y estudios a lo largo de la vida
						en una misma plataforma. Nos preocupamos para que cada centro de
						salud obtenga las herramientas necesarias para darte el mejor
						tratamiento.
					</p>
					<div className={styles.divide}></div>
				</div>
				<div className={styles.imagen}>
					<img src={data} alt="update" />
				</div>
			</div>
		</div>
	);
}

export default CardsTriple;
