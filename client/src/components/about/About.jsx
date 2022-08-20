import React from 'react';
import './About.css';
import Loading from '../loading/Loading';

export default function About() {
	return (
    <div class="row" id='row'>
        <div class="col-4" id='NavBar-About'>
            <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end">
                <nav class="nav nav-pills flex-column">
                    <a class="nav-link" href="#item-1" id='Margin-Top-About'>¿Quiénes somos?</a>
                    <a class="nav-link" href="#item-2">¿Cuál es nuestro objetivo?</a>
                    <a class="nav-link" href="#item-3">¿Qué es +Salud y por qué usarlo?</a>
                    {/* <a class="nav-link" href="#item-4">Item 4</a>
                    <nav class="nav nav-pills flex-column">
                    <a class="nav-link ms-3 my-1" href="#item-4-1">Item 4-1</a>
                    <a class="nav-link ms-3 my-1" href="#item-4-2">Item 4-2</a>
                    </nav> */}
                </nav>
            </nav>
        </div>

        <div class="col-8">
            <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0" className='Info-About'>
                <div id="item-1">
                    <h4>¿Quiénes somos?</h4>
                    <p>
                        Somos un grupo de amigos que iniciamos este proyecto para ayudar a aquellos
                        individuos que, por su situación actual y la cantidad de estudios que tienen,
                        se les dificultaba tener todo lo necesario para que el profesional le diere un 
                        diagnóstico, haciendo que tuvieran que volver más adelante y prolongando su 
                        sufrimiento, tanto físico como mental.
                    </p>
                </div>
                <div id="item-2">
                    <h4>¿Cuál es nuestro objetivo?</h4>
                    <p>
                        Nuestro objetivo es generar una mejora sustancial en la salud de cada
                        individuo y en la salud general de la población permitiendo a cada
                        individuo pueda acceder a una historia clínica de calidad, documentada
                        y digitalizada.
                    </p>
                </div>
                <div id="item-3">
                    <h4>¿Qué es +Salud y por qué usarlo?</h4>
                    <p>
                        +Salud es un sistema que permite tener tu historia clínica o la de tus
                        pacientes al alcance de tu mano, pudiendo compartirla a través de
                        +Salud a los profesionales que usted desee a la hora de su consulta.
                        También, ofrecemos un sistema para gestionar los turnos de forma
                        online para que tus pacientes puedan reservarlos directamente las 24hs
                        del día sin necesidad de contactarse telefónicamente. El sistema es rápido y
                        sencillo, esta creado con lo último en tecnología y es muy
                        completo. +Salud tiene muchas funciones más, es un producto moldeable
                        a cada caso particular que requiera el cliente.
                    </p>
                </div>
                {/* <div id="item-4">
                    <h4>Item 4</h4>
                    <p>...</p>
                </div>
                <div id="item-4-1">
                    <h5>Item 4-1</h5>
                    <p>...</p>
                </div>
                <div id="item-4-2">
                    <h5>Item 4-2</h5>
                    <p>...</p>
                </div>
                <p>
                    Estamos convencidos de lo que hacemos, porque lo hacemos y para que lo hacemos.
                </p> */}
            </div>
        </div>
    </div>
	);
}
