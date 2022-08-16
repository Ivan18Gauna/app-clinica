import { GET_DOCTORS } from "../actions/actions";
import axios from "axios";

export function get_Doctors(){
    return async function(dispatch){
        const doctors = await axios("/professionals");

        return dispatch ({
            type: GET_DOCTORS,
            payload: doctors.data
        })
    }
}
