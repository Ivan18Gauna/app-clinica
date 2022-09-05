import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { get_PatientesDetail, deletePatients } from '../../redux/actions';
import Button from 'react-bootstrap/esm/Button';
import Loading from '../loading/Loading';
import styles from '../detail/Details.module.css';
import img from '../../Icons/iconfinder-icon.svg';
import login from '../login/Login.module.css'
import swal from 'sweetalert';


export default function DetailsPatients() {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const patient = useSelector((state) => state.patientsDetail);

	useEffect(() => {
		dispatch(get_PatientesDetail(id));
	}, [dispatch, id]);

	function handleSubmit(e){
		dispatch(deletePatients(id))
		history.push("/admin")
		swal({
			icon: 'success',
			text:"Paciente suspendido con exito",
			timer:1500
		})
	} 

	

	return (
		<div>
		{ patient && patient.name ?
		<div className={styles.container}>
			<div className={styles.info}>
				<div className={styles.perfil}>
					<img src={img} />
					<h4>
						Sr {patient.name} {patient.lastname}
					</h4>
					<h6>
						{patient.city} - {patient.province}
					</h6>
					<h5>{patient.phone}</h5>
					
					<h5>{patient.mail}</h5>
					<h5>Documento: {patient.document}</h5>
						<Button onClick={handleSubmit} >Suspender</Button>
				</div>
				<div className={styles.text}>
					<p>
						Paciente actualmente activo
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
