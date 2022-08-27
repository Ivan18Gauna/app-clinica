import React from 'react';
/* import { Link, useParams } from "react-router-dom"; */
import { useSelector, /* useDispatch */ } from 'react-redux';
/* import { useEffect } from "react"; */
/* import { getPatientsDetail } from "../../redux/actions"; */
/* import { useAuth0 } from "@auth0/auth0-react"; */

export default function UserProfile() {
	/* const { user } = useAuth0() */
	/* const dispatch = useDispatch(); */
	const patient = useSelector((state) => state.user);

	// useEffect(() => {
	//     dispatch(getPatientsDetail(user.email))
	// }, [dispatch, user.email])

	// let patient_=patient.filter(el=>el.mail===user.email)
	console.log('userpr', patient);

<<<<<<< HEAD
    const patient = useSelector((state) => state.user)
    
    // useEffect(() => {
    //     dispatch(getPatientsDetail(user.email))
    // }, [dispatch, user.email])
    
    // let patient_=patient.filter(el=>el.mail===user.email)
    console.log('userpr', patient)


    return (
        <div>
            <aside>
                <p>Aca iría la foto</p>
                <img src="https://www.webespacio.com/wp-content/uploads/2012/01/foto-perfil.jpg" alt="" />
                <div>
                    <p>
                        Nombre:{patient.name}
                    </p>
                    <p>
                        Apellido: {patient.lastname}
                    </p>
                    <p>
                        Nro de documento:{patient.document}
                    </p>
                    <p>
                        Número de telefono: {patient.phone}
                    </p>
                    <p>
                        Email: {patient.mail}
                    </p>
                    <p>
                        Provincia: {patient.province}
                    </p>
                    <p>
                        Ciudad: {patient.city}
                    </p>
                    <p>
                        Calle: {patient.street}
                    </p>
                    <p>
                        Número: {patient.number}
                    </p>
                </div>
            </aside>
            <div>
                <h5>Información de salud básica: </h5>
                <p>Grupo Sanguineo:</p>
                {patient.blood ? patient.blood : 'Sin información'}
                <p>Obra Social:</p>
                {patient.oS}
                <p>Vacunas que posee aplicadas:</p>
                {patient.vaccine?patient.blood: 'Sin información'}
                <p>Alergias: </p>
                {patient.allergies?patient.allergies: 'Sin información'}
                <p>Enfermedades Crónicas: </p>
                {patient.chronicles?patient.chronicles: 'Sin información'}
                <p>Es donante?</p>
                {patient.donation?patient.donation: 'Sin información'}
                <p>Es transfundible?</p>
                {patient.transfusion?patient.transfusion: 'Sin información'}
                <p>Obra Social:</p>
                {patient.oS?patient.oS: 'Sin información'}

            </div>
        </div>
    )
}
=======
	return (
		<div>
			<aside>
				<p>Aca iría la foto</p>
				<img
					src="https://www.webespacio.com/wp-content/uploads/2012/01/foto-perfil.jpg"
					alt=""
				/>
				<div>
					<p>Nombre:{patient.name}</p>
					<p>Apellido: {patient.lastname}</p>
					<p>Nro de documento:{patient.document}</p>
					<p>Número de telefono: {patient.phone}</p>
					<p>Email: {patient.mail}</p>
					<p>Provincia: {patient.province}</p>
					<p>Ciudad: {patient.city}</p>
					<p>Calle: {patient.street}</p>
					<p>Número: {patient.number}</p>
				</div>
			</aside>
			<div>
				<h5>Información de salud básica: </h5>
				<p>Grupo Sanguineo:</p>
				{patient.blood ? patient.blood : 'Sin información'}
				<p>Obra Social:</p>
				{patient.oS}
				<p>Vacunas que posee aplicadas:</p>
				{patient.vaccine}
				<p>Alergias: </p>
				{patient.allergies}
				<p>Enfermedades Crónicas: </p>
				{patient.chronicles}
				<p>Es donante?</p>
				{patient.donation}
				<p>Es transfundible?</p>
				{patient.transfusion}
			</div>
		</div>
	);
}
>>>>>>> 4db9b3e706a008b63334f5297f24fa16cb9bcd15
