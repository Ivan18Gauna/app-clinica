import {
  GET_DOCTORS,
  GET_DOCTORS_DETAIL,
  FILTER_CONVINADO,
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
  GET_INVOICE,
  GET_PATIENTS_DETAIL,
  GET_FACTURA,
  GET_TOTAL_PROFESSIONALS,
  GET_TOTAL_PATIENTS,
  GET_TOTAL_TURNOS,
  GET_TOTAL_HISTORYS,
  SET


} from "../actions/actions";
import axios from "axios";

export function get_Doctors() {
  return async function(dispatch) {
    const doctors = await axios(`/professionals/allProfessional`);

    return dispatch({
      type: GET_DOCTORS,
      payload: doctors.data
    });
  };
}

export function get_factura(){
  return async function(dispatch){
    const facturacion = await axios.get(`/invoice`);

    return dispatch({
      type: GET_FACTURA,
      payload: facturacion.data
    });
  }
}

export function get_total_proffesionals(){
  return async function(dispatch){
    const totalProf = await axios.get(`/admin/professionals`)

      return dispatch({
      type: GET_TOTAL_PROFESSIONALS,
      payload: totalProf.data
  })}
}

export function get_total_patients(){
  return async function(dispatch){

    const totalPatients = await axios.get(`/admin/patients`)

    return dispatch({
      type: GET_TOTAL_PATIENTS,
      payload: totalPatients.data
    })
  }
}

export function get_total_turnos(){
  return async function(dispatch){
    const totalTurnos = await axios.get(`/admin/turnos`)

    return dispatch({
      type: GET_TOTAL_TURNOS,
      payload: totalTurnos.data
    })
  }
}

export function get_total_historys(){
  return async function(dispatch){
    const totalHistorys = await axios.get(`/admin/historiaclinica`)

    return dispatch({
      type: GET_TOTAL_HISTORYS,
      payload: totalHistorys.data
    })
  }
}
export function get_specialties() {
  return async function(dispatch) {
    const specialties = await axios(`/especialties`);

    return dispatch({
      type: GET_SPECIALTIES,
      payload: specialties.data
    });
  };
}

export function get_cities() {
  return async function(dispatch) {
    const data = await axios(`/professionals/allProfessional`);
    const cities = await data.data.map(e => e.province);
    const citiesUnique = new Set(cities);
    return dispatch({
      type: GET_CITIES,
      payload: Array.from(citiesUnique)
    });
  };
}

export function filterConvinado(payload) {
  return async function(dispatch) {
    try {
      const doctors_detail = await axios(
        `/professionals?lastname=${payload.lastname}&filterEsp=${payload.filterEsp}&filterProfProv=${payload.filterProfProv}&order=${payload.order}`
      );

      return dispatch({
        type: FILTER_CONVINADO,
        payload: doctors_detail.data
      });
    } catch (err) {
      return dispatch({
        type: FILTER_CONVINADO,
        payload: err.response.data
      });
    }
  };
}

export function get_DoctorsDetail(id) {
  return async function(dispatch) {
    const doctors_detail = await axios(`/professionals/detail/${id}`);

    return dispatch({
      type: GET_DOCTORS_DETAIL,
      payload: doctors_detail.data
    });
  };
}

export function get_PatientesDetail(id) {
  return async function(dispatch) {
    const patients_detail = await axios(`/patients/detail/${id}`);
    return dispatch({
      type: GET_PATIENTS_DETAIL,
      payload: patients_detail.data
    });
  };
}

export function registerDoctors(payload) {
  return async function() {
    const registerDoctors = await axios.post(`/professionals`, payload);

    return registerDoctors;
  };
}

export function getObrasSociales() {
  return async function(dispatch) {
    const apiObras = await axios.get(
      "https://obras-sociales-be310-default-rtdb.firebaseio.com/results.json"
    );

    return dispatch({
      type: GET_OS,
      payload: apiObras.data
    });
  };
}

export function getPatients() {
  return async function(dispatch) {
    const allPatients = await axios.get("/patients/allpatients");

    return dispatch({
      type: GET_PATIENTS,
      payload: allPatients.data
    });
  };
}

export function getInvoice(id) {
  return async function(dispatch) {
    const invoice = await axios.get("/invoice/detail/" + id);
    console.log('action', invoice.data)
    return dispatch({
      type: GET_INVOICE,
      payload: invoice.data
    });
  };
}

export function getPatientsByName(payload) {
  return async function(dispatch) {
    try {
      const patients = await axios.get("/patients/document/" + payload);
      return dispatch({
        type: GET_PATIENTS_NAME,
        payload: patients.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postHistory(payload) {
  console.log("payload", payload);
  return async function() {
    try {
      const res = await axios.post("/historiaclinica", payload);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
}

export function registerPatients(payload) {
  return async function() {
    const registerPatients = await axios.post(`/patients`, payload);
    return registerPatients;
  };
}

export function modifyUsers(payload, id, mail) {
  return async function(dispatch) {
    const healthData = await axios.put(`/patients/edit/${id}`, payload);
    dispatch(getUserDetail(mail));

    return healthData;
  };
}

export function modifyProfessionals(payload, id, mail) {
  return async function(dispatch) {
    const modifyProfessionals = await axios.put(
      `/professionals/edit/${id}`,
      payload
    );
    dispatch(getUserDetail(mail));

    return modifyProfessionals;
  };
}

export function getUserDetail(mail) {
  return async function(dispatch) {
    const userMail = await axios(`/user/${mail}`);

    return dispatch({
      type: GET_USER_MAIL,
      payload: userMail.data
    });
  };
}

export function getClinicHistory(id) {
  return async function(dispatch) {
    const clinicHistory = await axios("/historiaclinica/bypat/" + id);

    return dispatch({
      type: GET_CLINIC_HISTORY,
      payload: clinicHistory.data
    });
  };
}

export function getNotes(license) {
  return async function(dispatch) {
    try {
      const notes = await axios("/notes/" + license);

      return dispatch({
        type: GET_NOTES,
        payload: notes
      });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function postNotes(payload) {
  return async function() {
    try {
      const notes = await axios.post("/notes", payload);

      return notes;
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getTurnoProf(id) {
  return async function(dispatch) {
    try {
      const turno = await axios.get(`/turnos/profturnos/${id}`);
      return dispatch({
        type: GET_TURNO_PROF,
        payload: turno.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTurnoPat(id) {
  return async function(dispatch) {
    try {
      const turno = await axios.get(`/turnos/patturnos/` + id);

      return dispatch({
        type: GET_TURNO_PAT,
        payload: turno
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function newTurno(payload) {
  return async function() {
    try {
      const turno = await axios.post("/turnos", payload);
      return turno;
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteNotes(payload) {
  return async function() {
    try {
      const notes = await axios.delete("/notes/" + payload);

      return notes;
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function deletePatients(id) {
  return async function() {
    try {
      const patient = await axios.delete("/patients/delete/" + id);

      return patient;
    } catch (e) {
      console.log(e.message);
    }
  };
}


export function deleteProf(id) {
  return async function() {
    try {
      const professionalsDelete = await axios.delete("/professionals/delete/" + id);

      return professionalsDelete;
    } catch (e) {
      console.log(e.message);

export function set() {
  return async function(dispatch) {
    try {
      return dispatch({
        type: SET,
        payload: []
      });
    } catch (error) {
      console.log(error);

    }
  };
}

export function postTurnoMail(payload, mail) {
  return async function() {
    try {
      const patient = await axios.post(`/mailer/send-email/${mail}`, payload);
      return patient;
    } catch (e) {
      console.log(e.message);
    }
  };
}
