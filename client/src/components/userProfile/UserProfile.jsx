import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPatientsDetail } from "../../redux/actions";


export default function UserProfile() {

    
    const dispatch = useDispatch();

    const patient = useSelector((state) => state.user)


    useEffect(() => {
        dispatch(getPatientsDetail())
    }, [dispatch])
    return (
        <div>
            <aside>
                <p>Aca iría la foto</p>
                <img src="https://www.webespacio.com/wp-content/uploads/2012/01/foto-perfil.jpg" alt="" />
            </aside>
            <div>
                <p>
                    Nombre:{patient.name}
                </p>
                <p>
                    Apellido: {patient.lastname}
                </p>
            </div>
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
    )
}
