import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from 'universal-cookie'
import { getUserDetail } from "../../redux/actions";


export default function Price() {
  const dispatch = useDispatch()
  const cookies = new Cookies()
  
  useEffect(() => {
    dispatch(getUserDetail(cookies.get('userEmail')))
    
  }, [])
  const user = useSelector((state) => state.user)
  console.log(user)


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
        <button type="button" class="btn btn-outline-primary col-3">
          Gold
        </button>
        <button type="button" class="btn btn-outline-success col-3">
          Standar
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
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Visibilidad Online del profesional</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Autogestión de turnos Online 24hs</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Cancelar y reagendar turnos</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Turnos online</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Asignación de sobreturnos</div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Configuración días no laborales</div>
        <div class="col">
          <img src={checkRed} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Recordatorio de turno vía e-mail</div>
        <div class="col-3">
          <img src={checkRed} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Historia clínica completa del paciente</div>
        <div class="col-3">
          <img src={checkRed} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Almacenamiento</div>
        <div class="col-3">
          <img src={checkRed} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkRed} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Plantillas configurables por especialidad</div>
        <div class="col-3">
          <img src={checkRed} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkRed} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Integración MercadoPago</div>
        <div class="col-3">
          <img src={checkRed} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkRed} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row align-items-end">
        <div class="col-3">Cuenta corriente del paciente</div>
        <div class="col-3">
          <img src={checkRed} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkRed} alt="not img" width="50px" />
        </div>
        <div class="col-3">
          <img src={checkGreen} alt="not img" width="50px" />
        </div>
      </div>

      <div class="row">
        <button
         type="button" class="btn btn-warning col-3"></button>
        {/* <a href ="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808482f3adeb0182f5836c0700e6"> */}
        <a href ="https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=152294652-6e7dbdba-6d26-409d-a965-a1e077cbd85c">
        <button 
        type="button" class="btn btn-outline-primary col-3">
        Comprar
       </button>
       </a>
       {/* <a>p</a> */}
        {/* <button type="button" class="btn btn-outline-success col-3">
          Comprar
        </button>
        <button type="button" class="btn btn-outline-danger col-3">
          Comprar
        </button> */}
      </div>
    </div>
  );
}
