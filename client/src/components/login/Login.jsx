import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetail } from "../../redux/actions";
import google from "../../Icons/google.svg";
import styles from "./Login.module.css";
import Cookies from "universal-cookie";
import "../auth0/Auth0";
import Loading from '../loading/Loading'

const schema = yup
  .object({
    email: yup
      .string()
      .email("Ingresa un correo valido")
      .required("Este campo es requerido"),
    password: yup.string().required("Este campo es requerido")
  })
  .required();

export default function Login() {

  const cookies = new Cookies();
  const history = useHistory();
  const dispatch = useDispatch();
  const globalUser = useSelector(state => state.user);
  const { loginWithPopup, isAuthenticated, user } = useAuth0();
  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      showPassword: false
    }
  });
  const [errorsExiste, setErrorsExiste] = useState({
    email: "",
    password: ""
  });

  const values = getValues();
  const userForEmail = useSelector(state => state.user);
  const [email, setEmail] = useState({
    email: "",
    password: ""
  });
  function handleInput(e) {
    setEmail({
      ...email,
      [e.target.name]: e.target.value
    });
  }

  const submitForm = data => {
    if (userForEmail ? true : false) {
      if (data.password === userForEmail.password) {
        dispatch(getUserDetail(data.email));
        cookies.set("userEmail", `${data.email}`, { patch: "/" });
        history.push("/home");
      } else {
        setErrorsExiste({
          ...errorsExiste,
          password: "La contraseña es incorrecta"
        });
      }
    } else {
      setErrorsExiste({
        ...errorsExiste,
        email: "El correo ingresado no existe"
      });
    }
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  useEffect(() => {
    // dispatch(getPatients());
    // dispatch(get_Doctors());
    dispatch(getUserDetail(email.email));
  }, [dispatch, email.email]);

  if (isAuthenticated) {
    cookies.set("userEmail", user.email, { path: "/" });
  }

  return (
    <div>
      {!isAuthenticated ? (
        <div className={styles.container}>
          <Form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <div className={styles.titulo}>
              <h2>Inicia sesión</h2>
            </div>
            <Row className={styles.formGroup} lg={1}>
              <Col className={styles.col} lg={9}>
                <FormControl
                  onChange={e => handleInput(e)}
                  name="email"
                  error={!!errors.email || !!errorsExiste.email}
                  className={styles.input}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Correo electronico
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    label="Correo electronico"
                    {...register("email")}
                    endAdornment={
                      <InputAdornment position="end">
                        <PersonIcon />
                      </InputAdornment>
                    }
                  />
                  {errors.email ? (
                    <FormHelperText>{errors.email.message}</FormHelperText>
                  ) : errorsExiste.email ? (
                    <FormHelperText>{errorsExiste.email}</FormHelperText>
                  ) : null}
                </FormControl>
              </Col>
              <Col className={styles.col} lg={9}>
                <FormControl
                  onChange={e => handleInput(e)}
                  name="password"
                  error={!!errors.password || !!errorsExiste.password}
                  className={styles.input}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Contraseña
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    label="Password"
                    type={values.showPassword ? "text" : "password"}
                    {...register("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            let values = getValues("showPassword");
                            setValue("showPassword", !values, {
                              shouldValidate: true
                            });
                          }}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors.password ? (
                    <FormHelperText>{errors.password.message}</FormHelperText>
                  ) : errorsExiste.password ? (
                    <FormHelperText>{errorsExiste.password}</FormHelperText>
                  ) : null}
                </FormControl>
              </Col>
              <Col className={styles.col} lg={9}>
                <Link to="/sincomponente">¿Olvidaste tu contraseña?</Link>
              </Col>
            </Row>
            <div className={styles.btn}>
              <Button type="submit">Iniciar Sesion</Button>
            </div>
            <div className={styles.alternatives}>
              <p>También puedes ingresar con otras cuentas</p>
            </div>
            <div onClick={() => loginWithPopup()} className={styles.google}>
              <img src={google} alt="google" />
              <button>CONTINUAR CON GOOGLE</button>
            </div>
          </Form>
          <div className={styles.questions}>
            <div>
              <span>¿Eres nuevo? </span>
              <Link to="/signin">
                <span>Crear cuenta</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div id={styles.loadingLogin}>
            <Loading />
          </div>
          <div id={styles.loadingNum}>
            {setTimeout(() => {
							dispatch(getUserDetail(cookies.get('userEmail')));
						}, 1000)}
						{setTimeout(() => {
							if (globalUser && globalUser.mail) {
								return history.push('/home');
							} 
							if ((globalUser && !globalUser.mail) || !globalUser) {
								return history.push('/signin');
							}
						}, 2000)}
          </div>
        </div>
      )}
    </div>
  );
}
