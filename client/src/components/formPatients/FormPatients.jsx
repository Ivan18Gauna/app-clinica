import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function validate(input) {
	let error = {}

	if (!/([A-z])/.test(input.name)) {
		error.name = 'Ingrese un nombre valido.'
	}
	if (!/([A-z])/.test(input.lastname)) {
		error.lastname = 'Ingrese un apellido valido.'
	}
	if (!/^\d{8}$$/.test(input.document)) {
		error.document = 'Número de documento no valido.'
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
	else if (input.number <= 0) {
		error.number = 'Número no valida.'
	}

	if (!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(input.password)) {
		error.password = 'La contraseña debe contener al menos 8 digitos, una mayúscula, un número y un caracter especial.'
	}

	if (input.password !== input.new_password) {
		error.new_password = 'No coincide con la contraseña.'
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


export default function RegisterPatient() {
	const dispatch = useDispatch();

	const [input, setInput] = useState({
		name: '',
		lastname: '',
		document: '',
		birth: '',
		phone: '',
		mail: '',
		province: '',
		city: '',
		number: '',
		street: '',
		username: '',
		password: '',
		new_password: ''
	});

	const [error, setError] = useState({})

	function handleInput(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
		let objError = validate({
			...input,
			[e.target.name]: e.target.value
		})
		setError(objError);
	}
	console.log('input', input)
	console.log('error', error)

	function handleSelect(e) {

		setInput({
			...input,
			province: e.target.value
		})
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(); //falta action y reducer
		setInput({
			name: '',
			lastname: '',
			document: '',
			birth: '',
			phone: '',
			mail: '',
			province: '',
			city: '',
			number: '',
			street: '',
			username: '',
			password: '',
			new_password: ''
		});
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Nombre: </label>
					<input type="text" name="name" placeholder='Ingresa tu nombre' value={input.name} onChange={handleInput} />
					{input.name === '' ? <p>*</p> : ''}
					{error.name && <p> {error.name} </p>}
				</div>
				<div>
					<label> Apellido: </label>
					<input type="text" name="lastname" placeholder='Ingresa tu apellido' value={input.lastname} onChange={handleInput} />
					{input.lastname === '' ? <p>*</p> : ''}
					{error.lastname && <p> {error.lastname} </p>}
				</div>


				<div>
					<label>Documento de identidad: </label>
					<input type="number" name="document" placeholder='Nro de documento' value={input.document} onChange={handleInput} />
					{input.document === '' ? <p>*</p> : ''}
					{error.document && <p> {error.document} </p>}
				</div>
				<div>
					<label>Fecha de Nacimiento: </label>
					<input type="date" name="birth" value={input.birth} onChange={handleInput} />
					{input.birth === '' ? <p>*</p> : ''}
					{error.birth && <p> {error.birth} </p>}

				</div>
				<div>
					<label>Número de Telefono: </label>
					<input type="text" name="phone" placeholder='XXX-XXXXXX' value={input.phone} onChange={handleInput} />
					{input.phone === '' ? <p>*</p> : ''}
					{error.phone && <p> {error.phone} </p>}
				</div>
				<div>
					<label>Email: </label>
					<input type="text" name="mail" placeholder='Email' value={input.mail} onChange={handleInput} />
					{input.mail === '' ? <p>*</p> : ''}
					{error.mail && <p> {error.mail} </p>}
				</div>

				<div>
					<label>Provincia: </label>
					<select onChange={handleSelect} defaultValue='Seleccione una opción' >
						<option value="Seleccione una opción">Seleccione una opción</option>

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
					<input type="text" name="city" placeholder='Ciudad' value={input.city} onChange={handleInput} />
					{input.city === '' ? <p>*</p> : ''}
					{error.city && <p> {error.city} </p>}
				</div>
				<div>
					<label>Calle: </label>
					<input type="text" name="street" placeholder='Calle' value={input.street} onChange={handleInput} />
					{input.street === '' ? <p>*</p> : ''}
					{error.street && <p> {error.street} </p>}
				</div>
				<div>
					<label>Número: </label>
					<input type="number" name="number" placeholder='Número' value={input.number} onChange={handleInput} />
					{input.number === '' ? <p>*</p> : ''}
					{error.number && <p> {error.number} </p>}
				</div>

				<div>
					<label>Nombre de Usuario: </label>
					<input type="text" name="username" placeholder='Nombre de usuario' value={input.username} onChange={handleInput} />
					{input.username === '' ? <p>*</p> : ''}

				</div>
				<div>
					<label>Contraseña: </label>
					<input type="password" name="password" placeholder='Contraseña' value={input.password} onChange={handleInput} />
					{input.password === '' ? <p>*</p> : ''}
					{error.password && <p> {error.password} </p>}
				</div>

				<div>
					<label>Repetir contraseña: </label>
					<input type="password" name="new_password" placeholder='Repetir contraseña' value={input.new_password} onChange={handleInput} />
					{input.new_password === '' ? <p>*</p> : ''}
					{error.new_password && <p> {error.new_password} </p>}
				</div>

				<div>
					<p>* Campos obligatorios</p>
				</div>
				<div>
					{
						input.name === '' || input.lastname === '' || input.document === '' || input.phone === '' || input.mail === '' ||
							input.province === '' || input.city === '' || input.street === '' || input.number === '' || input.username === '' ||
							input.password === '' || input.new_password === '' || error.name || error.lastname || error.document || error.birth || error.phone
							|| error.mail || error.number || error.password || error.new_password ?
							<button disabled={true} >Faltan datos por completar</button>
							:
							<Link to="/healthData">
								<button type="submit">Siguiente</button>
							</Link>

					}
				</div>


			</form>
		</div>
	);
}
