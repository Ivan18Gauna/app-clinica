import {
	GET_DOCTORS,
	GET_DOCTORS_DETAIL,
	FILTER_CONVINADO,
	GET_SPECIALTIES,
	GET_CITIES,
	GET_OS,
	GET_PATIENTS,
	GET_PATIENTS_NAME,
	GET_USER_MAIL,
	GET_CLINIC_HISTORY,
	GET_NOTES
} from '../actions/actions';
import axios from 'axios';

//const URL = 'http://localhost:3001';

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
		try {
			const doctors_detail = await axios(
				`/professionals?lastname=${payload.lastname}&filterEsp=${payload.filterEsp}&filterProfProv=${payload.filterProfProv}&order=${payload.order}`
			);

			return dispatch({
				type: FILTER_CONVINADO,
				payload: doctors_detail.data,
			});
		} catch (err) {
			return dispatch({
				type: FILTER_CONVINADO,
				payload: err.response.data,
			});
		}
	};
}

export function get_DoctorsDetail(id) {
	return async function (dispatch) {
		const doctors_detail = await axios(`/professionals/detail/${id}`);

		return dispatch({
			type: GET_DOCTORS_DETAIL,
			payload: doctors_detail.data,
		});
	};
}

export function registerDoctors(payload) {
	return async function () {
		const registerDoctors = await axios.post(`/professionals`, payload);

		return registerDoctors;
	};
}

export function getObrasSociales() {
	return async function (dispatch) {
		const apiObras = await axios.get('https://obras-sociales-be310-default-rtdb.firebaseio.com/results.json');

		return dispatch({
			type: GET_OS,
			payload: apiObras.data,
		});
	};
}

export function getPatients() {
	return async function (dispatch) {
		const allPatients = await axios.get('/patients/allpatients');

		return dispatch({
			type: GET_PATIENTS,
			payload: allPatients.data,
		});
	};
}
export function getPatientsByName(payload) {

	return async function (dispatch) {
		try {
			const patients = await axios.get('/patients/document/' + payload);
			return dispatch({
				type: GET_PATIENTS_NAME,
				payload: patients.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function postHistory(payload) {
	return async function () {
		try {
			const res = await axios.post('/historiaclinica');
			return res;
		} catch (error) {
			console.log(error);
		}
	};
}

export function registerPatients(payload) {
	return async function () {
		const registerPatients = await axios.post(`/patients`, payload);
		return registerPatients;
	};
}

export function modifyUsers(payload, id, mail) {
	return async function (dispatch) {
		const healthData = await axios.put(`/patients/edit/${id}`, payload);
		dispatch(getUserDetail(mail));

		return healthData;
	};
}

export function modifyProfessionals(payload, id, mail){
	return async function (dispatch){
		const modifyProfessionals= await axios.put(`/professionals/edit/${id}`, payload);
		dispatch(getUserDetail(mail))
		return modifyProfessionals;
	}
}

export function getUserDetail(mail) {
	console.log('ejecuciones')
	return async function (dispatch) {
		const userMail = await axios(`/user/${mail}`);
		// console.log("soy user",userMail)
		return dispatch({
			type: GET_USER_MAIL,
			payload: userMail.data,
		});
	};
}



export function getClinicHistory(id) {
	return async function (dispatch) {
		const clinicHistory = await axios('/historiaclinica/bypat/' + id);

		return dispatch({
			type: GET_CLINIC_HISTORY,
			payload: clinicHistory.data
		});
	};
}

export function getNotes(license){
	return async function (dispatch) {
		try {
			const notes = await axios('/notes/' + license);

			return dispatch({
				type: GET_NOTES,
				payload: notes
			})
		} catch(e) {
			console.log(e.message)
		}
	}
}

export function postNotes(payload){
	return async function () {
		try {
			const notes = await axios.post('/notes', payload);
			
			return notes;
		} catch(e) {
			console.log(e.message)
		}
	}
}


export function deleteNotes(payload){
	return async function () {
		try {
			const notes = await axios.delete('/notes/' + payload);

			return notes;
		} catch(e) {
			console.log(e.message)
		}
	}
}
