import React, { useState } from 'react';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import  './Calendar.css'


const Calendar = () => {
const [fecha, setFecha]= useState(new Date())
console.log(fecha)
	return (
		<div className="contenedor">
			<div className="grupo">
				<label>Fecha</label>
        <DatePicker value={fecha} onChange={setFecha}/>
			</div>
      <div className="grupo">
				<label>Hora</label>
        <TimePicker value={fecha} onChange={setFecha}/>
			</div>
		</div>
	);
}
 
export default Calendar;
