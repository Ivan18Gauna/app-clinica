import React, { useState } from "react";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import "./Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, newTurno, postTurnoMail } from "../../redux/actions";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import swal from "sweetalert";

const Calendar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const professional = location.state;

  useEffect(() => {
    const cookies = new Cookies();
    dispatch(getUserDetail(cookies.get("userEmail")));
  }, [dispatch]);

  const user = useSelector(state => state.user);


  const [fecha, setFecha] = useState(new Date());
  const onChangeSetFecha = e => {
    setFecha(e);
  };

  const arr = fecha.toString().split(" ");
  const date = new Date(fecha).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  // console.log(arr);
  // console.log(date);
  const payload = {
    date: date,
    time: arr[4].split(":")[0] + ":00",
    professional: professional,
    patient: user.id
  };

  const handleSubmit = e => {
    e.preventDefault(e);
    let turno = dispatch(newTurno(payload))
      .then(res => {
        if (res != undefined) {
          dispatch(postTurnoMail(payload, user.mail))
          swal({
            icon:'success',
            title:'El turno fue creado correctamente',
            timer: 2000})
        } else {
          swal({
            icon:'warning',
            title:'Horario no disponible',
          })
        }
      })
    //   err => console.log('err', err))

    console.log('turno', turno)
    // ;

  };

  return (
    <div>
      <div className="contenedor">
        <div className="grupo">
          <label>Fecha</label>
          <DatePicker value={fecha} onChange={onChangeSetFecha} />
        </div>
        <div className="grupo">
          <label>Hora</label>
          <TimePicker value={fecha} onChange={onChangeSetFecha} />
        </div>
      </div>
      <button onClick={handleSubmit}>Solicitar turno</button>
    </div>
  );
};

export default Calendar;
