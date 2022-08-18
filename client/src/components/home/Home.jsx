import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_Doctors } from '../../redux/actions';
import Cards from '../cards/Cards';

export default function Home() {
	const dispatch = useDispatch();
	const doctors = useSelector((state) => state.doctors);
	useEffect(() => {
		dispatch(get_Doctors());
	}, [dispatch]);

	return (
		<div>
			<h1>Esto es el Home</h1>
			<form>
				<input type={'text'} placeholder={'Por nombre...'} />
				<select defaultValue={'especialidad'}>
					<option value="especialidad" hidden>
						Especialidad
					</option>
					<option value="actividad">Actividad Fisica</option>
					<option value="alergia">Alergia</option>
				</select>
				<select defaultValue={'ubicacion'}>
					<option value="ubicacion" hidden>
						Ubicacion
					</option>
					<option value="argentina">Argentina</option>
					<option value="canada">Canada</option>
				</select>
				<button type={'submit'}>Buscar</button>
			</form>
			<Cards doctors={doctors} />
		</div>
	);
}
