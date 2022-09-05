import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from 'universal-cookie'
import { getUserDetail,postMercadoPago } from "../../redux/actions";


export default function Price() {
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const [url, setUrl] = useState('')
  
  useEffect(() => {
    dispatch(getUserDetail(cookies.get('userEmail')))
  }, [])


  const user = useSelector((state) => state.user)
  const id = user.id
  const mail = user.mail
  const price = 10
  const quantity = 1
  let fecha = new Date() 
  const arr = fecha.toString().split(' ')
  const date = arr[2] + '/' + arr[1] + '/' + arr[3];


  // const postMercadoPago = () =>{
  //   return async (dispatch)=>{
  //     try {
  //       const res = await axios.post(`${process.env.REACT_APP_API}/api/mercadopago`,
  //       {
  //         method: 'POST',
  //         body: data,
  //        })
  //        dispatch(postMercadopago(res.data));
  //     } catch (error) {
  //     }
  //   }
  // }

  useEffect(async() => {
    const res = await axios.post("/mercadopago",{id, mail, price, quantity, date});
    setUrl(res.data.id)
  }, [])
  
  
  
/*   const handleActivarPago = async(e) => {
    e.preventDefault();
  } */


  const checkRed =
    "https://previews.123rf.com/images/igoun/igoun1805/igoun180500088/101280971-icono-de-cruz-en-c%C3%ADrculo-se-puede-utilizar-como-bot%C3%B3n-de-eliminar-bloquear-cerrar-etc-eliminar-x-el-.jpg?fj=1";
  const checkGreen =
    "https://previews.123rf.com/images/kritchanut/kritchanut1409/kritchanut140900026/31219780-marca-de-verificaci%C3%B3n-o-garrapatas-icono-en-c%C3%ADrculo-verde.jpg?fj=1";
  return (
    <div class="text-center mt-1 p-5 table-responsive">
      <div class="row">
        <button type="button" class="btn btn-warning col-3">
          Caracteristicas
        </button>
        <button type="button" class="btn btn-outline-danger col-3">
          Premium
        </button>
      </div>
      <div class="row align-items-end">
        <div class="col-3">Turnos online</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Visibilidad Online del profesional</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Autogestión de turnos Online 24hs</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Cancelar y reagendar turnos</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Turnos online</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Asignación de sobreturnos</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Configuración días no laborales</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Recordatorio de turno vía e-mail</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Historia clínica completa del paciente</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Almacenamiento</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Plantillas configurables por especialidad</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Integración MercadoPago</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Cuenta corriente del paciente</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row">
        <button
         type="button" class="btn btn-warning col-3"></button>
        <a href={url} >
        <button  
        type="button" class="btn btn-outline-primary col-3">
        Solicitar pago
       </button>
       </a>
      </div>
    </div>
  );
}
