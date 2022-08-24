import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get_specialties, registerDoctors } from "../../redux/actions";

function validate(input) {
  let error = {};

  if (!/([A-z])/.test(input.name)) {
    error.name = "Ingrese un nombre valido.";
  }
  if (!/([A-z])/.test(input.lastname)) {
    error.lastname = "Ingrese un apellido valido.";
  }
  if (!/[0-9]/.test(input.license)) {
    error.license = "Matrícula no valida.";
  } else if (input.license <= 0) {
    error.license = "Matrícula no valida.";
  }
  if (!/^\d{10}$$/.test(input.phone)) {
    error.phone = "Número de telefono no valido.";
  }
  if (!/\S+@\S+\.\S+/.test(input.mail)) {
    error.mail = "Dirección de correo no valida.";
  }
  if (!/[0-9]/.test(input.number)) {
    error.number = "Número no valido.";
  } else if (input.number <= 0) {
    error.number = "Número no valida.";
  }

  if (
    !/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
      input.password
    )
  ) {
    error.password =
      "La contraseña debe contener al menos 8 digitos, una mayúscula, un número y un caracter especial.";
  }

  if (input.password !== input.new_password) {
    error.new_password = "No coincide con la contraseña.";
  }

  let newDate = input.birth;
  let Date1 = new Date(newDate);
  let Date2 = new Date();
  let Date3 = (Date2 - Date1) / (1000 * 60 * 60 * 24 * 365);

  if (Date1 >= Date2) {
    error.birth = "La fecha de nacimiento no puede ser posterior a la actual.";
  } else if (Date3 < 18.011) {
    error.birth = "Debes ser mayor de 18 años para registrarte.";
  }

  return error;
}

const provinces = [
  "Buenos Aires",
  "Ciudad Autónoma de Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

export default function RegisterDoctor() {
  const dispatch = useDispatch();
  const especialities_data = useSelector((state) => state.specialties);
  const history = useHistory();

  useEffect(() => {
    dispatch(get_specialties());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    specialities: [],
    license: "",
    birth: "",
    phone: "",
    mail: "",
    province: "",
    city: "",
    number: "",
    street: "",
    username: "",
    password: "",
    new_password: "",
  });

  const [error, setError] = useState({});

  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    let objError = validate({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(objError);
  }
  console.log("error", error);

  function handleSelectProvince(e) {
    setInput({
      ...input,
      province: e.target.value,
    });
  }

  function handleSelectSpecialities(e) {
    if (input.specialities.includes(e.target.value)) {
      alert("Ya se selecciono la especialidad.");
    } else {
      setInput({
        ...input,
        specialities: [...input.specialities, e.target.value],
      });
    }
  }
  console.log("input", input);

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      specialities: input.specialities.filter((el) => el !== e.target.value),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registerDoctors(input));
    setInput({
      name: "",
      lastname: "",
      specialities: [],
      license: "",
      birth: "",
      phone: "",
      mail: "",
      province: "",
      city: "",
      number: "",
      street: "",
      username: "",
      password: "",
      new_password: "",
    });
    history.push("/home");
  }

  return (
    <div>
      <div class="container p-5">
        <form onSubmit={handleSubmit} class="row">
          <div class="col-6">
            <div class="row">
              <div class="col-2">
                <label class="form-label">Nombre</label>
              </div>
              <div class="col">
                {input.name === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                type="text"
                name="name"
                class="form-control"
                placeholder="Ingresa tu nombre"
                value={input.name}
                onChange={handleInput}
              />
            </div>
            {error.name && <p class="text-danger"> {error.name} </p>}
          </div>

          <div class="col-6">
            <div class="row">
              <div class="col-2">
                <label class="form-label">Apellido</label>
              </div>
              <div class="col">
                {input.lastname === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                type="text"
                name="lastname"
                class="form-control"
                placeholder="Ingresa tu apellido"
                value={input.lastname}
                onChange={handleInput}
              />
            </div>
            {error.lastname && <p class="text-danger"> {error.lastname} </p>}
          </div>

          <div class="col-6">
            <div class="row">
              <div class="col-4">
                <label class="form-label">Matricula</label>
              </div>
              <div class="col">
                {input.license === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                class="form-control"
                type="number"
                name="license"
                placeholder="Número de matricula"
                value={input.license}
                onChange={handleInput}
              />
            </div>
            {error.license && <p class="text-danger"> {error.license} </p>}
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-4">
                <label class="form-label">Fecha de Nacimiento</label>
              </div>
              <div class="col">
                {input.birth === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                class="form-control"
                type="date"
                name="birth"
                value={input.birth}
                onChange={handleInput}
              />
            </div>
            {error.birth && <p class="text-danger"> {error.birth} </p>}
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-4">
                <label class="form-label">Número de Telefono</label>
              </div>
              <div class="col">
                {input.phone === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                class="form-control"
                type="text"
                name="phone"
                placeholder="XXX-XXXXXX"
                value={input.phone}
                onChange={handleInput}
              />
            </div>
            {error.phone && <p class="text-danger"> {error.phone} </p>}
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-1">
                <label class="form-label">Email: </label>
              </div>
              <div class="col">
                {input.mail === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                class="form-control"
                type="text"
                name="mail"
                placeholder="Email"
                value={input.mail}
                onChange={handleInput}
              />
            </div>
            {error.mail && <p class="text-danger"> {error.mail} </p>}
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-2">
                <label class="form-label">Provincia</label>
              </div>
              <div class="col">
                {input.province === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <select
                onChange={handleSelectProvince}
                defaultValue="Seleccione una opción"
                class="form-select"
              >
                <option hidden value="Seleccione una opción">
                  Seleccione una opción
                </option>
                {provinces.map((e) => {
                  return (
                    <option key={e} value={e}>
                      {" "}
                      {e}{" "}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-1">
                <label class="form-label">Ciudad</label>
              </div>
              <div class="col">
                {input.city === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                class="form-control"
                type="text"
                name="city"
                placeholder="Ciudad"
                value={input.city}
                onChange={handleInput}
              />
            </div>
            {error.city && <p class="text-danger"> {error.city} </p>}
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-1">
                <label class="form-label">Calle</label>
              </div>
              <div class="col">
                {" "}
                {input.street === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                class="form-control"
                type="text"
                name="street"
                placeholder="Calle"
                value={input.street}
                onChange={handleInput}
              />
            </div>
            {error.street && <p class="text-danger"> {error.street} </p>}
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-2">
                <label class="form-label">Número</label>
              </div>
              <div class="col">
                {input.number === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                class="form-control"
                type="number"
                name="number"
                placeholder="Número"
                value={input.number}
                onChange={handleInput}
              />
            </div>
            {error.number && <p class="text-danger"> {error.number} </p>}
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-4">
                <label class="form-label">Nombre de Usuario</label>
              </div>
              <div class="col">
                {input.username === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                class="form-control"
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                value={input.username}
                onChange={handleInput}
              />
            </div>
          </div>

          <div class="col-6"></div>
          <div class="col-6">
            <div class="row">
              <div class="col-2">
                <label class="form-label">Contraseña</label>
              </div>
              <div class="col">
                {input.password === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                class="form-control"
                type="password"
                name="password"
                placeholder="Contraseña"
                value={input.password}
                onChange={handleInput}
              />
            </div>
            {error.password && <p class="text-danger"> {error.password} </p>}
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-3">
                <label class="form-label">Repetir contraseña</label>
              </div>
              <div class="col">
                {input.new_password === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <input
                class="form-control"
                type="password"
                name="new_password"
                placeholder="Repetir contraseña"
                value={input.new_password}
                onChange={handleInput}
              />
            </div>
            {error.new_password && (
              <p class="text-danger"> {error.new_password} </p>
            )}
          </div>

          <div class="col-6">
            <div class="row">
              <div class="col-2">
                <label class="form-label">Especialidades</label>
              </div>
              <div class="col">
                {input.province === "" ? <p class="text-danger">*</p> : ""}
              </div>
            </div>
            <div class="col-6">
              <select
                onChange={handleSelectSpecialities}
                defaultValue="Seleccione una opción"
              >
                <option hidden value="Seleccione una opción">
                  Seleccione una opción
                </option>
                {especialities_data.map((e) => {
                  return (
                    <option key={e.id} value={e.name}>
                      {" "}
                      {e.name}{" "}
                    </option>
                  );
                })}
              </select>
              {input.specialities === "" ? <p class="text-danger">*</p> : ""}
            </div>
          </div>

          <div>
            <ul>
              <span>Especialidades Seleccionadas: </span>
              {input.specialities.map((e) => {
                return (
                  <li key={e} value={e}>
                    {" "}
                    {e}
                    <button value={e} onClick={handleDelete}>
                      X
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p class="text-danger">* Campos obligatorios</p>
          </div>
          <div>
            {input.name === "" ||
            input.lastname === "" ||
            input.license === "" ||
            input.phone === "" ||
            input.mail === "" ||
            input.province === "" ||
            input.city === "" ||
            input.street === "" ||
            input.number === "" ||
            input.username === "" ||
            input.password === "" ||
            input.new_password === "" ||
            input.specialities.length < 1 ||
            error.name ||
            error.lastname ||
            error.license ||
            error.phone ||
            error.mail ||
            error.number ||
            error.password ||
            error.new_password ? (
              <button disabled={true} class="btn btn-danger">
                Faltan datos por completar
              </button>
            ) : (
              <button type="submit" class="btn btn-success">Enviar</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
