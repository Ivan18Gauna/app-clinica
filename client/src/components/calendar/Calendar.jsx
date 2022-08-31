import React, { useState } from "react";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import "./Calendar.css";
import { useDispatch } from "react-redux";
import { newTurno } from "../../redux/actions";

const Calendar = () => {
	const dispatch = useDispatch();

  const [fecha, setFecha] = useState(new Date());

  const onChangeSetFecha = (e) => {
    setFecha(e);
  };

  const arr = fecha.toString().split(' ')
  const payload = {
	   date: arr[0] + ' ' + arr[2] + ' ' + arr[1] + ' ' + arr[3] + ' ',
	   time: arr[4],
	   professional: 1,
	   patient: 1
  }
  console.log(payload)

  const handleSubmit = (e) => {
	e.preventDefault(e)
	console.log('funciona')
	dispatch(newTurno(payload))
  }

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
