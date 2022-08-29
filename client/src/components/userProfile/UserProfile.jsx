
import React from "react";
// import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPatients, getUserDetail } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from 'universal-cookie'

export default function UserProfile() {
  const dispatch = useDispatch()
  const cookie = new Cookies()
  const { user, logout } = useAuth0();
  const state = useSelector((state) => state.user)
  useEffect(() => {
    dispatch(getUserDetail(cookie.get('userEmail')))
  }, [])

  return (
    <div>
      {state.document ? (
        <div>
          <aside>
            <p>Aca iría la foto</p>
            <img
              src="https://www.webespacio.com/wp-content/uploads/2012/01/foto-perfil.jpg"
              alt=""
            />
            <div>
              <p>Nombre:{state.name}</p>
              <p>Apellido: {state.lastName}</p>
              <p>Nro de documento:{state.document}</p>
              <p>Número de telefono: {state.phone}</p>
              <p>Email: {state.mail}</p>
              <p>Provincia: {state.province}</p>
              <p>Ciudad: {state.city}</p>
              <p>Calle: {state.street}</p>
              <p>Número: {state.number}</p>
            </div>
          </aside>
          <div>
            <h5>Información de salud básica: </h5>
            <p>Grupo Sanguineo:</p>
            {state.blood ? state.blood : "Sin información"}
            <p>Vacunas que posee aplicadas:</p>
            {state.vaccine ? state.vaccine : "Sin información"}
            <p>Alergias: </p>
            {state.allergies ? state.allergies : "Sin información"}
            <p>Enfermedades Crónicas: </p>
            {state.chronicles ? state.chronicles : "Sin información"}
            <p>Es donante?</p>
            {state.donation ? state.donation : "Sin información"}
            <p>Es transfundible?</p>
            {state.transfusion
              ? state.transfusion
              : "Sin información"}
            <p>Obra Social:</p>
            {state.oS ? state.oS : "Sin información"}
          </div>
          <button onClick={logout}>Cerrar sesion</button>
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
}

