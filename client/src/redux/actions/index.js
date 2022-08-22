import {
	GET_DOCTORS,
	GET_DOCTORS_DETAIL,
	GET_SPECIALTIES,
	GET_CITIES,
	GET_OS,
} from '../actions/actions';
import axios from 'axios';

const URL = 'http://localhost:3001';

export function get_Doctors() {
	return async function (dispatch) {
		const doctors = await axios(`/professionals/allProfessional`);
		return dispatch({
			type: GET_DOCTORS,
			payload: doctors.data,
		});
	};
}

export function get_specialties() {
	return async function (dispatch) {
		const specialties = await axios(`/especialties`);
		
		return dispatch({
			type: GET_SPECIALTIES,
			payload: specialties.data,
		});
	};
}

export function get_cities() {
	return async function (dispatch) {
		const data = await axios(`/professionals/allProfessional`);
		const cities = await data.data.map((e) => e.province);
		const citiesUnique = new Set(cities);
		return dispatch({
			type: GET_CITIES,
			payload: Array.from(citiesUnique),
		});
	};
}

export function filterConvinado(payload) {
	return async function (dispatch) {
		const doctors_detail = await axios(
			`${URL}/professionals?lastname=${payload.lastname}&filterEsp=${payload.filterEsp}&filterProfProv=${payload.filterProfProv}`
		);

		return dispatch({
			type: 'DILTER_CONVINADO',
			payload: doctors_detail.data,
		});
	};
}

export function get_DoctorsDetail(id) {
	return async function (dispatch) {
		const doctors_detail = await axios(`/professionals/${id}`);
		console.log('id', doctors_detail);
		return dispatch({
			type: GET_DOCTORS_DETAIL,
			payload: doctors_detail.data,
		});
	};
}

export function registerDoctors(payload) {
	console.log('post',payload)
	return async function () {
		const registerDoctors = await axios.post(`/professionals`, payload);
		return registerDoctors;
	};
}

export function getObrasSociales() {
	return async function (dispatch) {
		const apiObras = await axios.get(
			'https://obras-sociales-be310-default-rtdb.firebaseio.com/results.json'
		);
		return dispatch({
			type: GET_OS,
			payload: apiObras.data,
		});
	};
}
