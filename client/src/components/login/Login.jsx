import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from './pngwing.com.png';
import { useAuth0 } from '@auth0/auth0-react';
import Cookie from 'universal-cookie'
import { useDispatch } from 'react-redux';
import { getUserDetail } from '../../redux/actions';

export default function Login() {
	const dispatch = useDispatch()
	const { loginWithPopup, isAuthenticated } = useAuth0();
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	function handleInput(e) {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	}
	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getUserDetail(cookie.get('userEmail')))
		const cookie = new Cookie()
		cookie.set('userEmail', user.email, {path: '/'})
		cookie.set('userPassword', user.password, {path: '/'})
		window.location.href = '../homePatients/HomePatients.jsx'
		console.log(user);
		// dispatch(funcion a definir(user));
/* 		setUser({
			email: '',
			password: '',
		}); */
	}
	return (
		<div>
			{!isAuthenticated ? (
				<div className="container w-75 mt-5">
					<div className="row">
						<div className="col d-none d-lg-block">
							<img
								src="https://thumbs.dreamstime.com/z/retrato-dise-o-minimalista-exhausto-continuo-de-la-sola-mano-del-dibujo-lineal-doctor-un-forma-vida-linear-aislada-solo-s%C3%ADmbolo-146395118.jpg"
								alt="not img"
								width="700"
								height="700"
								className="col-12"
							/>
						</div>
  return (
    <div>
      {!isAuthenticated && !eluser.email ? (
        <div className="container w-75 mt-5">
          <div className="row">
            <div className="col d-none d-lg-block">
              <img
                src="https://thumbs.dreamstime.com/z/retrato-dise-o-minimalista-exhausto-continuo-de-la-sola-mano-del-dibujo-lineal-doctor-un-forma-vida-linear-aislada-solo-s%C3%ADmbolo-146395118.jpg"
                alt="not img"
                width="700"
                height="700"
                className="col-12"
              />
            </div>

            <div className="col">
              <div className="text-end">
                <img src={img} alt="not img" width="100px" />
              </div>
              <h2 className="fw-bold text-center py-5">Ingresa a +Salud</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Correo electronico
                  </label>
                  <input
                    value={user.name}
                    onChange={handleInput}
                    type="email"
                    className="form-control"
                    name="email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    value={user.name}
                    onChange={handleInput}
                    type="password"
                    className="form-control"
                    name="password"
                  />
                </div>
                <div className="mb-4 form-check">
                  <input
                    type="checkbox"
                    name="connected"
                    className="form-check-input"
                  />
                  <label htmlFor="connected" className="form-check-label">
                    Mantenerme conectado
                  </label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Iniciar Sesion
                  </button>
                </div>
                <div className="my-3">
                  <span>¿nuevo en +Salud? </span>
                  <Link to="/signin">
                    <span>Resgistrate</span>
                  </Link>
                </div>
                <div className="my-3">
                  <span>¿olvidaste tu contraseña? </span>
                  <Link to="/sincomponente">
                    <span>Recupera tu contraseña</span>
                  </Link>
                </div>
              </form>
              <div className="container w-100 my-5">
                <div className="row text-center">
                  <div className="col-12">Otra manera de iniciar sesión</div>
                </div>
                <div className="row">
                  <div className="col">
                    <br />
                    <button onClick={() => loginWithPopup()}>Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Bienvenido a +Salud</h1>
          <Link to="/signin">
            <button>Continuar</button>
          </Link>
        </div>
      )}
    </div>
  );
}
