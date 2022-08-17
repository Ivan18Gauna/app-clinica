import { GET_DOCTORS, GET_DOCTORS_DETAIL } from "../actions/actions";

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

		default: return state
	}
}

export default rootReducer;