import { GET_DOCTORS, GET_DOCTORS_DETAIL,GET_SPECIALTIES,GET_CITIES } from "../actions/actions";
import axios from "axios";

const URL = "http://localhost:3001"

export function get_Doctors() {
    return async function (dispatch) {
        const doctors = await axios(`${URL}/professionals`);
        console.log('doctors', doctors)
        return dispatch({
            type: GET_DOCTORS,
            payload: doctors.data
        })
    }
}


export function get_specialties() {
    return async function (dispatch) {
        const specialties = ['Anestesiología y reanimación','Alergología','Aparato digestivo','Cardiología','Geriatría']
        return dispatch({
            type: GET_SPECIALTIES,
            payload: specialties
        })
    }
}

export function get_cities() {
    return async function (dispatch) {
        const specialties = ['Corrientes','Cordoba','Buenos Aires','Tucuman','Misiones']
        return dispatch({
            type: GET_CITIES,
            payload: specialties
        })
    }
}



export function get_DoctorsDetail(id) {
    return async function (dispatch) {
        const doctors_detail = await axios(`${URL}/professionals/${id}`)
        console.log('id', doctors_detail)
        return dispatch({
            type: GET_DOCTORS_DETAIL,
            payload: doctors_detail.data
        })
    }
}

export function registerDoctors(payload) {
    return async function () {
        const registerDoctors = await axios.post(`${URL}/professionals`, payload)
        return registerDoctors;
    }
}