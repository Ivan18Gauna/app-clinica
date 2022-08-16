import React from "react";
import { Link } from "react-router-dom";

export default function Login (){
    return(
        <div>
            <div>
                aca va a estar el logo 
            </div>
            <div>
                <div>
                    <h1>Ingresa a +Salud</h1>
                </div>
                <p>E-mail</p>
                <input type="email" />
                <p>password</p>
                <input type="password" />
                <button>Continuar</button>
            </div>
            <div>
                <p>¿nuevo en +salud?</p>
                <Link to='/signin'>
                    <h5>Crear cuenta</h5>
                </Link>
            </div>
        </div>
    )
}