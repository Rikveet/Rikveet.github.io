import React from 'react';
import {useNavigate} from "react-router-dom";
import {FunctionType} from "../../../Types";
import {IconType} from "react-icons";
import './Button.sass';

function Button(props: { id: string, isDisabled?: boolean, icon?: IconType, text?: string, link?: string, f?: FunctionType }) {
  const navigate = useNavigate();
  const {id, isDisabled, icon, text, link, f} = {...props};
  return (
    <button id={id} disabled={isDisabled} onClick={() => {
      if (f) {
        if (f.funcParameters) {
          f.func({...f.funcParameters});
        } else {
          f.func();
        }
      }
      if (link) {
        navigate(link)
      }
    }}>
      {icon && <div>{<>icon</>}</div>}
      {text && <div>{text}</div>}
    </button>
  );
}

export default Button;
