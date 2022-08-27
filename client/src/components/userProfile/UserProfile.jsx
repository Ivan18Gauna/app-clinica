import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPatients } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

export default function UserProfile() {
  const { user } = useAuth0();

  const dispatch = useDispatch();

  const allPatient = useSelector((state) => state.patients);
  
  const patient = allPatient.filter((el) => el.mail === user.email);
  

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  console.log("allPatient", allPatient);
  console.log("patient", patient);
  console.log("user", user.picture);

  return (
    <div>
      {patient.length > 0 ? (
        <div>
          <aside>
            <p>Aca iría la foto</p>
            <img
              src="https://www.webespacio.com/wp-content/uploads/2012/01/foto-perfil.jpg"
              alt=""
            />
            <div>
              <p>Nombre:{patient[0].name}</p>
              <p>Apellido: {patient[0].lastname}</p>
              <p>Nro de documento:{patient[0].document}</p>
              <p>Número de telefono: {patient[0].phone}</p>
              <p>Email: {patient[0].mail}</p>
              <p>Provincia: {patient[0].province}</p>
              <p>Ciudad: {patient[0].city}</p>
              <p>Calle: {patient[0].street}</p>
              <p>Número: {patient[0].number}</p>
            </div>
          </aside>
          <div>
            <h5>Información de salud básica: </h5>
            <p>Grupo Sanguineo:</p>
            {patient[0].blood ? patient[0].blood : "Sin información"}
            <p>Vacunas que posee aplicadas:</p>
            {patient[0].vaccine ? patient[0].vaccine : "Sin información"}
            <p>Alergias: </p>
            {patient[0].allergies ? patient[0].allergies : "Sin información"}
            <p>Enfermedades Crónicas: </p>
            {patient[0].chronicles ? patient[0].chronicles : "Sin información"}
            <p>Es donante?</p>
            {patient[0].donation ? patient[0].donation : "Sin información"}
            <p>Es transfundible?</p>
            {patient[0].transfusion
              ? patient[0].transfusion
              : "Sin información"}
            <p>Obra Social:</p>
            {patient[0].oS ? patient[0].oS : "Sin información"}
          </div>
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
}
