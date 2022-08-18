import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerDoctors } from '../../redux/actions';

export default function RegisterDoctor() {
	const dispatch = useDispatch();
	//tengo que tener las especialidades

	const [input, setInput] = useState({
		name: '',
		license: '',
		birth: '',
		phone: '',
		mail: '',
		country: '',
		city: '',
		number: '',
		street: '',
	});

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(registerDoctors(input));
		setInput({
			name: '',
			license: '',
			birth: '',
			phone: '',
			mail: '',
			country: '',
			city: '',
			number: '',
			street: '',
		});
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Nombre y Apellido: </label>
					<input type="text" name="name" value={input.name} />
				</div>
				<div>
					<label>Matricula: </label>
					<input type="text" name="license" value={input.license} />
				</div>
				<div>
					<label>Fecha de Nacimiento: </label>
					<input type="text" name="birth" value={input.birth} />
				</div>
				<div>
					<label>Número de Telefono: </label>
					<input type="text" name="phone" value={input.phone} />
				</div>
				<div>
					<label>Correo electronico: </label>
					<input type="text" name="mail" value={input.mail} />
				</div>
				<div>
					<label>País: </label>
					<input type="text" name="country" value={input.country} />
				</div>
				<div>
					<label>Ciudad: </label>
					<input type="text" name="city" value={input.city} />
				</div>
				<div>
					<label>Calle: </label>
					<input type="text" name="street" value={input.street} />
				</div>
				<div>
					<label>Número: </label>
					<input type="number" name="number" value={input.number} />
				</div>

				<button type="submit">Enviar</button>
			</form>
		</div>
	);
}
