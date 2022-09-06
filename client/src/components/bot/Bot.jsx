import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
import "./Bot.css";

export default function Bot() {
  const steps = [
    {
      id: "0",
      message: "Hola como podemos ayudarte?",
      trigger: "1"
    },
    {
      id: "1",
      options: [
        { value: "l", label: "Soy nuevo", trigger: "login" },
        { value: "f", label: "Busco un medico", trigger: "filtros" },
        { value: "n", label: "Quienes somos?", trigger: "nosotros" }
      ]
    },
    {
      id: "login",
      message: "aca estaria el link del signin",
      trigger: "5"
    },
    {
      id: "filtros",
      message: "aca estaria el link del filtros",
      trigger: "5"
    },
    {
      id: "nosotros",
      message: "aca va el link de nosotros",
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
      message: "Bye!",
      end: true
    }
  ];
  const [active, setActive] = useState(false);
  const [activeIcon, setActiveIcon] = useState(false);
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
