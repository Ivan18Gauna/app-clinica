import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerDoctors } from '../../redux/actions';


function validate(input) {
	let error = {}

	if (!/([A-z])/.test(input.name)) {
		error.name = 'Ingrese un nombre valido.'
	}
	if (!/([A-z])/.test(input.lastname)) {
		error.lastname = 'Ingrese un apellido valido.'
	}

	if (input.license <= 0) {
		error.license = 'Matrícula no valida.'
	}
	if (!/^\d{10}$$/.test(input.phone)) {
		error.phone = 'Número de telefono no valido.'
	}
	if (!/\S+@\S+\.\S+/.test(input.mail)) {
		error.mail = 'Dirección de correo no valida.'
	}
	if (!/[0-9]/.test(input.number)) {
		error.number = 'Número no valido.'
	}
	if (!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(input.password)) {
		error.password = 'La contraseña debe contener al menos 8 digitos, una mayúscula, un número y un caracter especial.'
	}
	let newDate = input.birth;
	let Date1 = new Date(newDate)
	let Date2 = new Date()

	if (Date1 >= Date2) {
		error.birth = 'La fecha de nacimiento no puede ser posterior a la actual.'
	}


	return error;
}

const provinces = ['Buenos Aires', 'Ciudad Autónoma de Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes',
	'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén',
	'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán']



export default function RegisterDoctor() {
	const dispatch = useDispatch();
	//tengo que tener las especialidades

	const [input, setInput] = useState({
		name: '',
		lastname: '',
		license: '',
		birth: '',
		phone: '',
		mail: '',
		province: '',
		city: '',
		number: '',
		street: '',
		username: '',
		password: ''
	});

	const [error, setError] = useState({})

	function handleInput(e) {
		setInput({
			...input,
			[e.target.name]: [e.target.value]
		})

		let objError = validate({
			...input,
			[e.target.name]: [e.target.value]
		})
		setError(objError);
	}

	function handleSelect(e) {

		setInput({
			...input,
			province: [e.target.value]
		})


	}
	console.log('input', input)


	function handleSubmit(e) {
		e.preventDefault();
		dispatch(registerDoctors(input));
		setInput({
			name: '',
			lastname: '',
			license: '',
			birth: '',
			phone: '',
			mail: '',
			province: '',
			city: '',
			number: '',
			street: '',
			username: '',
			password: ''
		});
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Nombre: </label>
					<input type="text" name="name" value={input.name} onChange={handleInput} />
					{input.name === '' ? <p>*</p> : ''}
					{error.name && <p> {error.name} </p>}

				</div>
				<div>
					<label> Apellido: </label>
					<input type="text" name="lastname" value={input.lastname} onChange={handleInput} />
					{input.lastname === '' ? <p>*</p> : ''}
					{error.lastname && <p> {error.lastname} </p>}
				</div>

				<div>
					<label>Matricula: </label>
					<input type="number" name="license" value={input.license} onChange={handleInput} />
					{input.license === '' ? <p>*</p> : ''}
					{error.license && <p> {error.license} </p>}
				</div>
				<div>
					<label>Fecha de Nacimiento: </label>
					<input type="date" name="birth" value={input.birth} onChange={handleInput} />
					{error.birth && <p> {error.birth} </p>}

				</div>
				<div>
					<label>Número de Telefono: </label>
					<input type="text" name="phone" value={input.phone} onChange={handleInput} />
					{input.phone === '' ? <p>*</p> : ''}
					{error.phone && <p> {error.phone} </p>}
				</div>
				<div>
					<label>Correo electronico: </label>
					<input type="text" name="mail" value={input.mail} onChange={handleInput} />
					{input.mail === '' ? <p>*</p> : ''}
					{input.mail && <p> {error.mail} </p>}
				</div>
				<div>
					<label>Provincia: </label>
					<select onChange={handleSelect} >

						{
							provinces.map(e => {
								return <option key={e} value={e} > {e} </option>
							})
						}

					</select>
					{input.province === '' ? <p>*</p> : ''}
				</div>
				<div>
					<label>Ciudad: </label>
					<input type="text" name="city" value={input.country} onChange={handleInput} />
					{input.city === '' ? <p>*</p> : ''}
				</div>
				<div>
					<label>Calle: </label>
					<input type="text" name="street" value={input.street} onChange={handleInput} />
					{input.street === '' ? <p>*</p> : ''}
				</div>
				<div>
					<label>Número: </label>
					<input type="number" name="number" value={input.number} onChange={handleInput} />
					{input.number === '' ? <p>*</p> : ''}
					{error.number && <p> {error.number} </p>}
				</div>
				<div>
					<label>Nombre de Usuario: </label>
					<input type="text" name="username" value={input.username} onChange={handleInput} />
					{input.username === '' ? <p>*</p> : ''}

				</div>
				<div>
					<label>Contraseña: </label>
					<input type="password" name="password" value={input.password} onChange={handleInput} />
					{input.password === '' ? <p>*</p> : ''}
					{error.password && <p> {error.password} </p>}
				</div>
				<div>
					<p>* Campos obligatorios</p>
				</div>
				{
					input.name === '' || input.lastname === '' || input.license === '' || input.phone === '' || input.mail === '' ||
						input.province === '' || input.city === '' || input.street === '' || input.number === '' || input.username === '' ||
						input.password === '' ?
						<button disabled={true} >Faltan datos por completar</button>
						:
						<button type="submit">Enviar</button>
				}
			</form>
		</div>
	);
}
