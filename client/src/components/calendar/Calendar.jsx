 import React, { useState } from "react";
 import { DatePicker, TimePicker } from "@material-ui/pickers";
 import "./Calendar.css";
 import { useDispatch, useSelector } from "react-redux";
 import { getUserDetail, newTurno } from "../../redux/actions";
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
        dispatch(getUserDetail(cookies.get('userEmail')))
        console.log(cookies.get('userEmail'))
    }, [])

    const user = useSelector((state) => state.user)
    console.log(user)

   const [fecha, setFecha] = useState(new Date());
   const onChangeSetFecha = (e) => {
     setFecha(e);
   };

   const arr = fecha.toString().split(' ')
   const payload = {
 	   date: arr[0] + ' ' + arr[2] + ' ' + arr[1] + ' ' + arr[3] + ' ',
 	   time: arr[4],
 	   professional: professional,
 	   patient: user.id
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
