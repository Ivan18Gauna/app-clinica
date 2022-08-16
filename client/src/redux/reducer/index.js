import { GET_DOCTORS } from "../actions/actions";

const initialState = {
    doctors: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type){
        case GET_DOCTORS:
            return {...state, doctors: action.payload}

        default: return state
    }
}

export default rootReducer;