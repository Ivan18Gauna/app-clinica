import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { get_specialties, registerDoctors } from '../../redux/actions';


function validate(input) {
	let error = {}

	if (!/([A-z])/.test(input.name)) {
		error.name = 'Ingrese un nombre valido.'
	}
	if (!/([A-z])/.test(input.lastname)) {
		error.lastname = 'Ingrese un apellido valido.'
	}
	if (!/[0-9]/.test(input.license)) {
		error.license = 'Matrícula no valida.'
	} else if (input.license <= 0) {
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
	let Date3 = ((Date2 - Date1) / (1000 * 60 * 60 * 24 * 365))

	if (Date1 >= Date2) {
		error.birth = 'La fecha de nacimiento no puede ser posterior a la actual.'
	} else if (Date3 < 18.011) {
		error.birth = 'Debes ser mayor de 18 años para registrarte.'
	}


	return error;
}

const provinces = ['Buenos Aires', 'Ciudad Autónoma de Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes',
	'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén',
	'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán']



export default function RegisterDoctor() {
	const dispatch = useDispatch();
	const especialities_data = useSelector((state) => state.specialties)
	const history = useHistory();


	useEffect(() => {
		dispatch(get_specialties())
	}, [dispatch])

	const [input, setInput] = useState({
		name: '',
		lastname: '',
		specialities: [],
		license: '',
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
	console.log('error', error)

	function handleSelectProvince(e) {

		setInput({
			...input,
			province: e.target.value,

		})


	}

	function handleSelectSpecialities(e) {
		if (input.specialities.includes(e.target.value)) {
			alert('Ya se selecciono la especialidad.')
		} else {
			setInput({
				...input,
				specialities: [...input.specialities, e.target.value]
			})
		}
	}
	console.log('input', input)

	function handleDelete(e) {
		e.preventDefault();
		setInput({
			...input,
			specialities: input.specialities.filter(el => el !== e.target.value)
		})
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(registerDoctors(input));
		setInput({
			name: '',
			lastname: '',
			specialities: [],
			license: '',
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
		history.push('/home')
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
					<label>Especialidades: </label>
					<select onChange={handleSelectSpecialities} defaultValue='Seleccione una opción' >
						<option value="Seleccione una opción">Seleccione una opción</option>

						{
							especialities_data.map(e => {
								return <option key={e.id} value={e.name} > {e.name} </option>
							})
						}

					</select>
					{input.specialities === '' ? <p>*</p> : ''}
				</div>
				<div>
					<ul>
						<span>Especialidades Seleccionadas: </span>
						{
							input.specialities.map((e) => {
								return <li key={e} value={e} > {e}
									<button value={e} onClick={handleDelete} >X</button>
								</li>
							})
						}
					</ul>
				</div>

				<div>
					<label>Matricula: </label>
					<input type="number" name="license" placeholder='Número de matricula' value={input.license} onChange={handleInput} />
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
					<input type="text" name="phone" placeholder='XXX-XXXXXXX' value={input.phone} onChange={handleInput} />
					{input.phone === '' ? <p>*</p> : ''}
					{error.phone && <p> {error.phone} </p>}
				</div>
				<div>
					<label>Email: </label>
					<input type="text" name="mail" placeholder='Ingresa tu email' value={input.mail} onChange={handleInput} />
					{input.mail === '' ? <p>*</p> : ''}
					{input.mail && <p> {error.mail} </p>}
				</div>
				<div>
					<label>Provincia: </label>
					<select onChange={handleSelectProvince} defaultValue='Seleccione una opción' >
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
					<input type="text" name="city" placeholder='Ciudad' value={input.country} onChange={handleInput} />
					{input.city === '' ? <p>*</p> : ''}
				</div>
				<div>
					<label>Calle: </label>
					<input type="text" name="street" placeholder='Calle' value={input.street} onChange={handleInput} />
					{input.street === '' ? <p>*</p> : ''}
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
						input.name === '' || input.lastname === '' || input.license === '' || input.phone === '' || input.mail === '' ||
							input.province === '' || input.city === '' || input.street === '' || input.number === '' || input.username === '' ||
							input.password === '' || input.new_password === '' || input.specialities.length < 1 || error.name || error.lastname || error.license || error.phone
							|| error.mail || error.number || error.password || error.new_password ?
							<button disabled={true} >Faltan datos por completar</button>
							:
							<button type="submit">Enviar</button>
					}
				</div>
			</form>
		</div>
	);
}
