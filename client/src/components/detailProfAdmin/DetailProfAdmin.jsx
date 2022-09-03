import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { get_DoctorsDetail } from '../../redux/actions';
import Button from 'react-bootstrap/esm/Button';
import Loading from '../loading/Loading';
import styles from '../detail/Details.module.css';
import img from '../../Icons/iconfinder-icon.svg';
import login from '../login/Login.module.css'


export default function DetailsDrAdmin() {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const doctor = useSelector((state) => state.detail);

	useEffect(() => {
		dispatch(get_DoctorsDetail(id));
	}, [dispatch, id]);

	if (doctor.length > 0 && Array.isArray(doctor.specialties)) {
		var temp = doctor.specialties.map((e) => e.name);
	}
	console.log(doctor);

	return (
		<div>
		{ doctor && doctor.name ?
		<div className={styles.container}>
			<div className={styles.info}>
				<div className={styles.perfil}>
					<img src={img} />
					<h4>
						Dr. {doctor.name} {doctor.lastname}
					</h4>
					<h6>
						{doctor.city} - {doctor.province}
					</h6>
					<h5>{doctor.phone}</h5>
					<h5>{temp}</h5>
					<h5>{doctor.mail}</h5>
					<h5>Matricula: {doctor.license}</h5>
						<Button  variant="outline-success">Suspender</Button>
				</div>
				<div className={styles.text}>
					<p>
						Soy un profesional especializado <br /> con años de experiencia y
						con muchas referencias.
					</p>
				</div>
				<div className={styles.btnHome}>
					<Link to={'/admin'}>
						<Button variant="outline-primary">Volver</Button>
					</Link>
				</div>
			</div>
		</div>
		: <div className={login.loading-login}><Loading/></div>
		}
		</div>
	);
}
