import { GET_DOCTORS, GET_DOCTORS_DETAIL, POST_REGISTER_DOCTOR } from "../actions/actions";

const initialState = {
	doctors: [],
	detail: [],
}

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_DOCTORS:
			return { ...state, doctors: action.payload }

		case GET_DOCTORS_DETAIL:
			return {
				...state,
				detail: action.payload
			}
		case POST_REGISTER_DOCTOR:
			return{
				...state
			}

		default: return state
	}
}

export default rootReducer;