import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { get_DoctorsDetail } from "../../redux/actions";

export default function Details() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const doctor = useSelector((state) => state.detail)
    console.log('detail',doctor)

    useEffect(() => {
        dispatch(get_DoctorsDetail(id))
    }, [dispatch, id])



    return (
        <div>
            <h1>Esto es el Details</h1>
            <h1>Nombre: {doctor.name } </h1>
            <h2>Especialidad: </h2>
            <h3>Matricula: {doctor.license} </h3>
            <h3>Ciudad: {doctor.city} </h3>
            <Link to={'/home'}>
                <button>Volver al inicio</button>
            </Link>

        </div>

    )
}