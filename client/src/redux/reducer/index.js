import {
	GET_DOCTORS,
	GET_DOCTORS_DETAIL,
	FILTER_CONVINADO,
	POST_REGISTER_DOCTOR,
	GET_SPECIALTIES,
	GET_CITIES,
	GET_OS,
  GET_PATIENTS,
  GET_PATIENTS_NAME,
  GET_USER_MAIL,
  GET_CLINIC_HISTORY,
} from '../actions/actions';

const initialState = {
  doctors: [],
  allDoc:[],
  detail: [],
  specialties:[],
  cities:[],
  os:[],
  patients: [],
  user:[],
  clinicHistory: [],
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
        ...state,
        os: action.payload
      };

    case GET_PATIENTS:
      return{
        ...state,
        patients: action.payload
      };

    case GET_PATIENTS_NAME:
      return{
        ...state, 
        patients: action.payload
      };

    case GET_USER_MAIL:
/*       console.log('case')
 *//*       console.log(state.user)
 */      return{
        ...state,
        user: action.payload
      }; 

    case GET_CLINIC_HISTORY:
      return { ...state, clinicHistory: action.payload };

		default:
			return state;
	}
}

export default rootReducer;
