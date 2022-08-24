import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


export default function Profile(){
    const {user} = useAuth0()
    return(
        <div>
            <div>
                <img src={user.picture} alt={user.name} />
                <h1>{user.name}</h1>
                <p>{user.email}</p>
               
            </div>
        </div>
    )
}