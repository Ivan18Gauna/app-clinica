import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { get_DoctorsDetail } from "../../redux/actions";
import "./details.css"
import Button from "react-bootstrap/esm/Button";

export default function Details() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const doctor = useSelector((state) => state.detail)
     

    useEffect(() => {
        dispatch(get_DoctorsDetail(id))
    }, [dispatch, id])

    if (Array.isArray(doctor.specialties)) {
        var temp = doctor.specialties.map(e => e.name)
        
    } 

    return (
          <> 
        <div className="container">
            <div>
             <img src="https://cdn2.iconfinder.com/data/icons/coronavirus-8/512/stethoscope-doctor-health-medical-healthcare-512.png" alt="img not found" width="auto" height="auto" />   
            </div>
            <div className="text">
           
            <h3>Nombre: {doctor.name } </h3>
            <h3>Especialidad: {temp} </h3>
            <h3>Matricula: {doctor.license} </h3>
            <h3>Ciudad: {doctor.city} </h3>
            </div>
           </div>
            <div className="btnHome">
           <Link to={'/home'}>
           <Button variant="outline-primary">Volver</Button>{' '}
            </Link>
            </div>    
        </>
       

    )
}