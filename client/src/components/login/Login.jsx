import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';

import Loading from '../loading/Loading';
import Auth0 from '../auth0/Auth0';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../redux/actions';
import img from '../../Icons/logo.svg';
import google from '../../Icons/google.svg';
import styles from './Login.module.css';
import stylesForm from '../formPatients/FormPatients.module.css';
import Cookies from "universal-cookie";
export let email;
export default function Login() {
	const cookies = new Cookies();
	const history = useHistory();
	const globalUser = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { loginWithPopup, isAuthenticated, logout ,user} = useAuth0();
	const [userr, setUser] = useState({
		email: '',
		password: '',
		showPassword: false,
	});
	
	if(isAuthenticated){
		email = user.email;
	}
	if(userr.email){
		email = userr.email;
	}

	function handleSubmit(e) {
		e.preventDefault();
		cookies.set("email",`${email}`,{patch:'/'});
		dispatch(getUserDetail(email));
		setUser({
			email: '',
			password: '',
			showPassword: false,
		});
		history.push('/home');
	}

	const handleChange = (prop) => (event) => {
		setUser({ ...userr, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setUser({
			...userr,
			showPassword: !userr.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	
	// console.log('soy user', user);



	return (
		<div>
			{!isAuthenticated ? (
				<div className={styles.container}>
					<Form className={styles.form} onSubmit={handleSubmit}>
						<div className={styles.titulo}>
							<h2>Inicia sesión</h2>
						</div>
						<Row className={styles.formGroup} lg={1}>
							<Col className={styles.col} lg={9}>
								<FormControl className={styles.input} variant="outlined">
									<InputLabel htmlFor="outlined-adornment-password">
										Correo electronico
									</InputLabel>
									<OutlinedInput
										id="outlined-adornment-password"
										label="Correo electronico"
										value={userr.email}
										onChange={handleChange('email')}
										endAdornment={
											<InputAdornment position="end">
												<PersonIcon />
											</InputAdornment>
										}
									/>
								</FormControl>
							</Col>
							<Col className={styles.col} lg={9}>
								<FormControl className={styles.input} variant="outlined">
									<InputLabel htmlFor="outlined-adornment-password">
										Contraseña
									</InputLabel>
									<OutlinedInput
										id="outlined-adornment-password"
										label="Password"
										type={userr.showPassword ? 'text' : 'password'}
										value={userr.password}
										onChange={handleChange('password')}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge="end"
												>
													{userr.showPassword ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Col>
							<Col className={styles.col} lg={9}>
								<Link to="/sincomponente">¿Olvidaste tu contraseña?</Link>
							</Col>
							<Col className={styles.col} lg={9}>
								<Form.Check name="connected" label="Mantenerme conectado" />
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
					<div className="loading-login">
						<Loading />
					</div>
					<div id="loading-num">
						{setTimeout(() => {
							dispatch(getUserDetail(user.email));
						}, 1000)}
						{setTimeout(() => {
							if (globalUser && globalUser.mail) {
								history.push('/home');
							} else {
								history.push('/signin');
							}
						}, 5000)}
						<Button className={stylesForm.button} onClick={logout}>
							Cerrar sesion
						</Button>
					</div>
				</div>
			)}
		</div>
	)}