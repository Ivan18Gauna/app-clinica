import React from "react";
import ChatBot from 'react-simple-chatbot';

export default function Bot (){
    const steps = [
        {
          id: '0',
          message: 'Hola como podemos ayudarte?',
          trigger: '1',
        },
        {
            id: "1",
            options: [
                {value:"l" ,label: "Soy nuevo", trigger: "login"},
                {value:"f" ,label: "Busco un medico", trigger: "filtros"},
                {value:"n" ,label: "Quienes somos?", trigger: "nosotros"},
            ]
        },
        {
          id: 'login',
          message: 'aca estaria el link del signin',
          trigger: '5',
        },
        {
            id: 'filtros',
            message: 'aca estaria el link del filtros',
            trigger: '5',
          },
          {
            id: 'nosotros',
            message: 'aca va el link de nosotros',
            trigger: '5',
          },
          {
            id: "5",
            options: [
                {value:"c" ,label: "Continuar", trigger: "1"},
                {value:"s" ,label: "Salir", trigger: "Bye"},
            ]
        },
        {
            id: 'Bye',
            message: 'Bye!',
            end: true,
          },
      ];
    return(
        <div>
            <ChatBot steps={steps} />
        </div>
    )
}