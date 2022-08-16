import React from 'react';
import Card from '../card/Card';


export default function Cards({doctors}){

 /*    const allProfessional = [{name: "Dr Ruperto",specialties: "Cirujano"},
    {name: "Dr Salamanca",specialties: "Cardiologo"},
    {name: "Dr Ahorro",specialties: "Clinico"},
    {name: "Dra Misil",specialties: "Dermatologo"},
] */
    return( <div>
        {doctors.map((e)=>{
            return(
                <Card
                name = {e.name}
                
 /*                specialties = {e.specialties} */
                />
            )
        })}
       </div>
    )
}
