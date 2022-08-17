import { GET_DOCTORS, GET_DOCTORS_DETAIL } from "../actions/actions";
import axios from "axios";


export function get_Doctors() {
    return async function (dispatch) {
        const doctors = await axios("http://localhost:3001/professionals");
        console.log('doctors', doctors)
        return dispatch({
            type: GET_DOCTORS,
            payload: doctors.data
        })
    }
}

export function get_DoctorsDetail(id) {
    return async function (dispatch) {
        const doctors_detail = await axios(`http://localhost:3001/professionals/${id}`)
        console.log('id', doctors_detail)
        return dispatch({
            type: GET_DOCTORS_DETAIL,
            payload: doctors_detail.data
        })
    }
}