import {
	GET_DOCTORS,
	GET_DOCTORS_DETAIL,
	FILTER_CONVINADO,
	GET_SPECIALTIES,
	GET_CITIES,
	GET_OS,
	GET_PATIENTS,
	GET_PATIENTS_NAME,
	GET_PATIENTS_DOC
} from '../actions/actions';
import axios from 'axios';

//const URL = 'http://localhost:3001';

export function get_Doctors() {
	return async function (dispatch) {
		const doctors = await axios(`/professionals/allProfessional`);
		console.log('action prof', doctors);
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
				`/professionals?lastname=${payload.lastname}&filterEsp=${payload.filterEsp}&filterProfProv=${payload.filterProfProv}`
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
	console.log('post prof', payload)
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

export function getPatients() {
	return async function (dispatch) {
		const allPatients = await axios.get('/patients/allpatients')
		// console.log("soy patients", allPatients)
		return dispatch({
			type: GET_PATIENTS,
			payload: allPatients.data
		})
	}
}
export function getPatientsByName(payload) {
	console.log("soy payload", payload)
	return async function (dispatch) {
		try {
			const patients = await axios.get("/patients/document/" + payload)
			// console.log("soy patients",patients)
			return dispatch({
				type: GET_PATIENTS_NAME,
				payload: patients.data
			}
			)
		} catch (error) {
			console.log(error)
		}
	}
}

export function postHistory(payload) {
	return async function () {
		try {
			console.log("soy payload history", payload)
			const res = await axios.post("/historiaclinica")
			return res;
		} catch (error) {
			console.log(error)
		}
	}
}

export function registerPatients(payload) {
	console.log('post patie', payload)
	return async function () {
		const registerPatients = await axios.post(`/patients`, payload);
		return registerPatients;
	};
}

export function registerHealthData(payload, id) {
	console.log('put health', payload)
	return async function () {
		const healthData = await axios.put(`/patients/edit/${id}`, payload);
		return healthData;
	};
}

// export function getPatientsDetail(email) {
// 	return async function (dispatch) {
// 		const patients = (await axios(`/patients`)).data
// 		console.log('action', patients)
// 		const patient_data = patients.find(el => el.mail === email)
// 		return dispatch({
// 			type: GET_PATIENTS_MAIL,
// 			payload: patient_data
// 		})
// 	}
// }

// export function getPatientsDoc(document) {
// 	return async function (dispatch) {
// 		const patients_doc = await axios(`/patients/document/${document}`)
// 		return dispatch({
// 			type: GET_PATIENTS_DOC,
// 			payload: patients_doc.data
// 		})
// 	}
// }