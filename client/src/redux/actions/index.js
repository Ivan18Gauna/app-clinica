import { GET_DOCTORS, GET_DOCTORS_DETAIL } from "../actions/actions";
import axios from "axios";

const URL = "http://localhost:3001"

export function get_Doctors() {
    return async function (dispatch) {
        const doctors = await axios(`/professionals`);
        console.log('doctors', doctors)
        return dispatch({
            type: GET_DOCTORS,
            payload: doctors.data
        })
    }
}

export function get_DoctorsDetail(id) {
    return async function (dispatch) {
        const doctors_detail = await axios(`/professionals/${id}`)
        console.log('id', doctors_detail)
        return dispatch({
            type: GET_DOCTORS_DETAIL,
            payload: doctors_detail.data
        })
    }
}

export function registerDoctors(payload) {
    return async function () {
        const registerDoctors = await axios.post(`/professionals`, payload)
        return registerDoctors;
    }
}