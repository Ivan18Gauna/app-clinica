import React from 'react';
import "../about/About.css"
import * as FaIcons from "react-icons/fa";
import { useEffect, useState } from 'react';
import Cards from "../cards/Cards";
import CardsPatients from '../cardsPatients/CardsPatients';
import { useSelector, useDispatch } from "react-redux";
import { getPatients, get_Doctors, get_factura, get_total_historys, get_total_patients,
 get_total_turnos, get_total_proffesionals } from '../../redux/actions';
//import Pagination from '@mui/material/Pagination'
import Pagination from '../paginate/Pagination';
import PaginatePatients from '../paginatePatients/PaginatePatients';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement, 
  } from 'chart.js';
  import { Line, Doughnut  } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

export default function Sidebar(){

    const dispatch = useDispatch();
    const globalUser = useSelector(state => state.user);
    const doctors = useSelector((state) => state.doctors);
    const patients = useSelector((state) => state.patients);
    const facturas = useSelector((state) => state.facturas)
    const numProffesionals = useSelector((state) => state.totalProf)
    const numPatients = useSelector((state) => state.totalPatients)
    const numTurnos = useSelector((state) => state.totalTurnos)
    const numHistorys = useSelector((state) => state.totalHistorys)
    

    useEffect(() => {
		dispatch(get_Doctors());
        dispatch(getPatients());
        dispatch(get_factura());
        dispatch(get_total_proffesionals());
        dispatch(get_total_patients());
        dispatch(get_total_historys());
        dispatch(get_total_turnos());
	},[dispatch]);


    //console.log(numPatients, numProffesionals )
     
     let mesActual = facturas[0]? facturas[0].sumaFacturas : 0;
   
     const data = {
        labels: [ "Enero", "Febrero", "Marzo", "Actual"],
        datasets: [
          {
            label:"Ingresos por Mes",
            fill: false,
            backgroundColor: 'rgba(73,155,234,1)',
            borderColor:'rgba(73,155,234,1)',
            pointBorderColor:'rgba(73,155,234,1)',
            pointBorderWidth:1,
            pointHoverRadius:5,
            pointHoverBackgroundColor:'rgba(73,155,234,1)',
            pointHoverBorderColor:'rgba(73,155,234,1)',
            pointRadius: 1,
            pointHitRadius: 10,
            data: [15, 19, 156, mesActual]
            }
        ]
     };

     let PatientsTotal = numPatients[0]? numPatients[0] : 0;
     let ProfTotal = numProffesionals[0]? numProffesionals[0] : 0;
    
     const data2 = {
        labels: ['Pacientes', 'Profesionales',],
        datasets: [
          {
            label: 'Pacients vs Profesionales',
            data: [PatientsTotal, ProfTotal],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
                ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
    const [currentPage, setCurrentPage] = useState(1);

    const [doctorsPage, setDoctorsPage] = useState(6);


    const indexOfLastDoctor = currentPage * doctorsPage; //10
    const indexFirstDoctor = indexOfLastDoctor - doctorsPage; // 10 - 10 = 0
    
    const [currentPagePatients, setCurrentPagePatients] = useState(1);
    const [patientsPage, setPatientsPage] = useState(4);
    const indexOfLastPatients = currentPagePatients * patientsPage; //10
    const indexFirstPatients = indexOfLastPatients - patientsPage; // 10 - 10 = 0


    const currentDoctors = doctors.slice(
        indexFirstDoctor, // 0
        indexOfLastDoctor // 10
    );
    const currentPatients = patients.slice(
        indexFirstPatients, // 0
        indexOfLastPatients // 10
    );
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginadoPatients = (pageNumbersPatients) =>{
        setCurrentPagePatients(pageNumbersPatients)
    }


    return(

       
        <div class="row" id='row'>
           
            { globalUser && globalUser.rolUser === 'admin' ?  
            <>
            <div class="col-4" id='NavBar-About'>
                <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end">
                    <nav class="nav nav-pills flex-column">
                    <a class="nav-link" href="#item-1" id='Margin-Top-About'><FaIcons.FaBriefcaseMedical className="me-2" />
                    
                    Profesionales</a>

            
                    <a class="nav-link" href="#item-2"> <FaIcons.FaHospitalUser className="me-2"/>
                        Pacientes</a>
                        
                    
                    <a class="nav-link" href="#item-3"><FaIcons.FaChartLine className="me-2"/> Ingresos</a> 
                        
                
            
                </nav>
                </nav>
            </div>
            <div class="col-8">
                <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0" className='Info-About'>
                    <div id="item-1">
                        <h6>Doctores</h6>
                        <hr />
                    {/*    <Pagination count={10} color="primary" 
                    
                        /> */}
                        <Pagination 
                        doctorsPage={doctorsPage}
                        doctors={doctors.length}
                        paginado={paginado}
                        />
                        <br />
                        <hr />
                        <Cards doctors={currentDoctors}/>
                    </div>
                    <div id="item-2">
                    <hr />
                    <h6>Pacientes:</h6>

                    <PaginatePatients 
                        patientsPage={patientsPage}
                        patients={patients.length}
                        paginado={paginadoPatients}
                        />

                    <CardsPatients patients={currentPatients}/>
                    <hr />
                    </div>
                    <div id="item-3">
                    <br />
                        <h4>Dinero Ingresado a la fecha:</h4>
                        <br />
                        {facturas.length>=1 ?<div><p>${facturas[0].sumaFacturas}</p></div> : <p>$0</p>}
                        <p>

                        <Line data={data}/>
                        <br />
                        <hr />
                        <br />
                        <h4>Cantidad de pacientes y profesionales:</h4>
                        <Doughnut data={data2} />


                        </p>
                    </div>
                    </div>
            </div>
        </>
        : <p>Estas en el lugar equivocado, esta ruta no te pertenece</p>
                    }
        </div>
        
    )
}
