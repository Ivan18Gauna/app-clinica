import {
  GET_DOCTORS,
  GET_DOCTORS_DETAIL,
  POST_REGISTER_DOCTOR,
  GET_SPECIALTIES,
  GET_CITIES,
} from "../actions/actions";

const initialState = {
  doctors: [],
  detail: [],
  specialties:[],
  cities:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOCTORS:
      return { ...state, doctors: action.payload };
    case GET_SPECIALTIES:
      return { ...state, specialties: action.payload };
      case GET_CITIES:
      return { ...state, cities: action.payload };
    case GET_DOCTORS_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case POST_REGISTER_DOCTOR:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;
