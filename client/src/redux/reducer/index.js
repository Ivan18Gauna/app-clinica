import {
<<<<<<< HEAD
  GET_DOCTORS,
  GET_DOCTORS_DETAIL,
  POST_REGISTER_DOCTOR,
  GET_SPECIALTIES,
  GET_CITIES,
  GET_OS,
  FILTER_CONVINADO
} from "../actions/actions";
=======
	GET_DOCTORS,
	GET_DOCTORS_DETAIL,
	FILTER_CONVINADO,
	POST_REGISTER_DOCTOR,
	GET_SPECIALTIES,
	GET_CITIES,
	GET_OS,
} from '../actions/actions';
>>>>>>> 7b6484cc0e515b85f9a0087c39f168b21e8b73fd

const initialState = {
  doctors: [],
  allDoc:[],
  detail: [],
  specialties:[],
  cities:[],
  os:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOCTORS:
      return { 
        ...state,
        doctors: action.payload ,
        alDoc: action.payload 
      };
    case GET_SPECIALTIES:
      return { ...state, specialties: action.payload  };
      case GET_CITIES:
      return { ...state, cities: action.payload };
      case FILTER_CONVINADO:
        var allDoctors = state.allDoc
        allDoctors = action.payload
      return { ...state, doctors: allDoctors };
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
