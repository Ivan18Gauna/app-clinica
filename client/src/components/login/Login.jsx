import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
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
import google from '../../Icons/google.svg';
import styles from './Login.module.css';
import stylesForm from '../formPatients/FormPatients.module.css';
import Cookies from "universal-cookie";

const schema = yup
	.object({
		email: yup
			.string()
			.email('Ingresa un correo valido')
			.required('Este campo es requerido'),
		password: yup.string().required('Este campo es requerido'),
	})
	.required();

export default function Login() {
	const cookies = new Cookies();
	const history = useHistory();
	const globalUser = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { loginWithPopup, isAuthenticated, logout } = useAuth0();
	const {
		setValue,
		getValues,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: '',
			showPassword: false,
		},
	});

	const values = getValues();
	const submitForm = (data) => {
		dispatch(getUserDetail(data.email));
		cookies.set("email",`${data.email}`,{patch:'/'});
		history.push('/home');
	};
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

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
									error={errors.email}
									className={styles.input}
									variant="outlined"
								>
									<InputLabel htmlFor="outlined-adornment-password">
										Correo electronico
									</InputLabel>
									<OutlinedInput
										id="outlined-adornment-password"
										label="Correo electronico"
										{...register('email')}
										endAdornment={
											<InputAdornment position="end">
												<PersonIcon />
											</InputAdornment>
										}
									/>
									{errors.email && (
										<FormHelperText>{errors.email.message}</FormHelperText>
									)}
								</FormControl>
							</Col>
							<Col className={styles.col} lg={9}>
								<FormControl
									error={errors.password}
									className={styles.input}
									variant="outlined"
								>
									<InputLabel htmlFor="outlined-adornment-password">
										Contraseña
									</InputLabel>
									<OutlinedInput
										id="outlined-adornment-password"
										label="Password"
										type={values.showPassword ? 'text' : 'password'}
										{...register('password')}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={() => {
														let values = getValues('showPassword');
														setValue('showPassword', !values, {
															shouldValidate: true,
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
									{errors.password && (
										<FormHelperText>{errors.password.message}</FormHelperText>
									)}
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
					<div className="loading-login">
						<Loading />
					</div>
					<div id="loading-num">
						{setTimeout(() => {
							dispatch(getUserDetail(values.email));
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
