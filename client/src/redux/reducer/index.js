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
  GET_NOTES,
  GET_TURNO_PROF,
  GET_TURNO_PAT,
  GET_PATIENTS_DETAIL,
  GET_FACTURA,
  GET_TOTAL_PROFESSIONALS,
  GET_TOTAL_PATIENTS,
  GET_TOTAL_TURNOS,
  GET_TOTAL_HISTORYS,
  GET_INVOICE,
  SET,
  GET_PROF_DELETED,
} from "../actions/actions";

const initialState = {
  suscribed: [],
  doctors: [],
  allDoc: [],
  detail: [],
  specialties: [],
  cities: [],
  os: [],
  patients: [],
  user: [],
  clinicHistory: [],
  notes: [],
  turnos: [],
  patientsDetail: [],
  facturas: [],
  totalPatients: [],
  totalProf: [],
  totalTurnos: [],
  totalHistorys: [],
  patientsDelete: [],
  prof_deleted: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        suscribed: action.payload,
      }

      case GET_PROF_DELETED:
        return{
          ...state,
          prof_deleted: action.payload
         }

    case GET_INVOICE:
      return {
        ...state,
        suscribed: action.payload
      }

    case GET_TURNO_PROF:
      return {
        ...state,
        turnos: action.payload
      };
           
      case GET_TURNO_PAT:
      return {
        ...state,
        turnos: action.payload.data
      };


    case GET_DOCTORS:
      return {
        ...state,
        doctors: action.payload,
        alDoc: action.payload,
      };

      case GET_TOTAL_PROFESSIONALS: 
      return  {
        ...state, totalProf: action.payload
      };

      case GET_TOTAL_PATIENTS:
        return {
          ...state, totalPatients: action.payload
        }

        case GET_TOTAL_HISTORYS:
          return {
            ...state, totalHistorys: action.payload
          }

          case GET_TOTAL_TURNOS:
            return {
              ...state, totalTurnos: action.payload
            }

    case GET_SPECIALTIES:
      return { ...state, specialties: action.payload };

    case GET_CITIES:
      return { ...state, cities: action.payload };

    case FILTER_CONVINADO:
      var allDoctors = state.allDoc;
      allDoctors = action.payload;
      return { ...state, doctors: allDoctors };

    case GET_DOCTORS_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

      case GET_PATIENTS_DETAIL:
        return{
          ...state,
          patientsDetail: action.payload,
        }

    case POST_REGISTER_DOCTOR:
      return {
        ...state,
      };

    case GET_OS:
      return {
        ...state,
        os: action.payload,
      };

    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload,
      };

    case GET_PATIENTS_NAME:
      return {
        ...state,
        patients: action.payload,
      };

    case GET_USER_MAIL:
      return {
        ...state,
        user: action.payload,
      };

    case GET_CLINIC_HISTORY:
      return { ...state, clinicHistory: action.payload };

    case GET_NOTES: 
      return { ...state, notes: action.payload };

      case GET_FACTURA:
        return{
          ...state,
          facturas: action.payload,
        }

    default:
      return state;
  }
}

export default rootReducer;
