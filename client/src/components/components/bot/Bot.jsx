import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
import "./Bot.css";

export default function Bot() {
  const steps = [
    {
      id: "0",
      message: "Hola ¿cómo podemos ayudarte?",
      trigger: "1"
    },
    {
      id: "1",
      options: [
        { value: "l", label: "Soy nuevo", trigger: "login" },
        { value: "f", label: "Busco un médico", trigger: "filtros" },
        { value: "n", label: "¿Quiénes somos?", trigger: "nosotros" }
      ]
    },
    {
      id: "login",
      message: "Dale clic al botón Ingresar (arriba, a la derecha)",
      trigger: "5" 
    },
    {
      id: "filtros",
      message: "Los puedes buscar en la página principal",
      trigger: "5"
    },
    {
      id: "nosotros",
      message: "Dale clic al botón NOSOTROS (arriba, ala izquierda)",
      trigger: "5"
    },
    {
      id: "5",
      options: [
        { value: "c", label: "Continuar", trigger: "1" },
        { value: "s", label: "Salir", trigger: "Bye" }
      ]
    },
    {
      id: "Bye",
      message: "Adiós, esperamos poder haber sido de ayuda!",
      end: true
    }
  ];
  const [active, setActive] = useState(false);
  const [activeIcon, setActiveIcon] = useState(false);
  console.log(active);
  console.log(activeIcon);
  return (
    <>
      <div className={`bot ${active ? "active" : "disabled"}`}>
        <ChatBot steps={steps} />
      </div>
      <div
        className={'btnMessage'}
        onClick={() => {
          setActive(!active);
          setActiveIcon(!activeIcon);
        }}
      >
        {active ? (
          <CloseIcon className={`iconClose`} fontSize="large" />
        ) : (
          <MessageIcon className={`icon`} />
        )}
      </div>
    </>
  );
}
