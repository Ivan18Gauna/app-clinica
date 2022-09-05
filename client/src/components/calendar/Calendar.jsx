import React, { useState } from "react";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import "./Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail, newTurno, postTurnoMail } from "../../redux/actions";
import { useHistory, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect } from "react";

const Calendar = () => {
  const cookies = new Cookies();
  const history = useHistory();
  const location = useLocation();
  const professional = location.state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetail(cookies.get("userEmail")));
  }, []);

  const user = useSelector(state => state.user);
  console.log("user", user);

  const [fecha, setFecha] = useState(new Date());
  const onChangeSetFecha = e => {
    setFecha(e);
  };

  const arr = fecha.toString().split(" ");
  const date = new Date(arr).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  console.log(arr)
  console.log(date)
  const payload = {
    date: date,
    time: arr[4].split(":")[0] + ":00",
    professional: professional,
    patient: user.id
  };

  const handleSubmit = e => {
    e.preventDefault(e);
    dispatch(newTurno(payload));
    dispatch(postTurnoMail(payload, user.mail));
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
