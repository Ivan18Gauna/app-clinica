import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function HealthData() {
	const dispatch = useDispatch();

	const [input, setInput] = useState({
		blood: '',
		vaccines: '',
		allergies: '',
		donation: [],
		transfusion: [],
		chronicles: [],
	});

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(); //falta action y reducer
		setInput({
			blood: '',
			vaccines: [],
			allergies: '',
			donation: [],
			transfusion: [],
			chronicles: [],
		});
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<h4>Grupo Sanguineo:</h4>
					<select></select>
				</div>

				<div>
					<h4>Vacunas</h4>
					<select></select>
				</div>

				<div>
					<h4>Alergias</h4>
					<select></select>
				</div>

				<div>
					<h4>Donante: </h4>
					<select>
						<option value="yes">Sí</option>
						<option value="no">No</option>
					</select>
				</div>

				<div>
					<h4>Transfundible: </h4>
					<select>
						<option value="yes">Sí</option>
						<option value="no">No</option>
					</select>
				</div>

				<div>
					<h4>Enfermedades Crónicas: </h4>
				</div>

				<button type="submit">Enviar</button>
			</form>
		</div>
	);
}
