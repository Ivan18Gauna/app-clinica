

import {React, useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_Doctors } from "../../redux/actions";



export default function Home (){

    const dispatch = useDispatch();
    const doctors = useSelector(state => state.doctors);

    useEffect(()=>{
        dispatch(get_Doctors());
    }, [dispatch]);

    return(
        <div>
        <h1>Esto es el Home</h1>
       </div>
    )
}