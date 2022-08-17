import React from 'react';
import Card from '../card/Card';


export default function Cards({doctors}){
    return( <div>
    
        {doctors.map((e)=>{
            return(
                <Card
                id= {e.id}
                name = {e.name}
                
 /*                specialties = {e.specialties} */
                />
            )
        })}
       </div>
    )
}
