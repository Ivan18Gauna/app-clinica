import {
  GET_DOCTORS,
  GET_DOCTORS_DETAIL,
  POST_REGISTER_DOCTOR,
  GET_SPECIALTIES,
  GET_PROFESSIONALS,
  GET_OS
} from "../actions/actions";

const initialState = {
  doctors: [],
  detail: [],
  specialties:[],
  professional:[],
  os:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOCTORS:
      return { ...state, doctors: action.payload };
    case GET_SPECIALTIES:
      return { ...state, specialties: action.payload };
      case GET_PROFESSIONALS:
      return { ...state, professional: action.payload };
    case GET_DOCTORS_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case POST_REGISTER_DOCTOR:
      return {
        ...state,
      };
      case GET_OS:
        return{
          state,
          os: action.payload
        };

    default:
      return state;
  }
}

export default rootReducer;
