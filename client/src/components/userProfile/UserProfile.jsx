import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPatientsByName } from "../../redux/actions";



export default function UserProfile() {

    const dispatch = useDispatch();

    const patient = useSelector((state) => state.patient)

    useEffect(()=>{
        dispatch()
    },[dispatch])

}