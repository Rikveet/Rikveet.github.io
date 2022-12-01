import React, {ReactNode, useState} from 'react';
import {FormInputTypes, textValidation} from "../../../../Types";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {BiCommentError} from "react-icons/bi";
import {AiOutlineCloseCircle} from "react-icons/ai";
import './Input.sass';

function Input(props: {
  id: string,
  label: string,
  name: string,
  type: FormInputTypes,
  placeHolderValue: string,
  canAutoFocus?: boolean,
  isPersistent?: boolean
  textValidation?: textValidation,
  isRequired?: boolean
}) {
  const {id, label, name, type, placeHolderValue, isPersistent, canAutoFocus, textValidation, isRequired} = {...props};
  const local_value = window.localStorage.getItem(id);
  const [value, setValue] = useState<string>(local_value !== null && (isPersistent === undefined || isPersistent) ? local_value : '');
  const [passwordReveal, setPasswordReveal] = useState(false);
  const [showError, setShowError] = useState(false);
  const typeHandler = () => {
    switch (type) {
      case "email":
        return type;
      case "password":
        return passwordReveal ? 'text' : type;
      case "text":
        return type;
    }
    return type;
  }
  const testValue = (): ReactNode => {
    const validated = textValidation!(value);
    if (validated.result)
      return (<></>);
    const errorRules = (validated.desc.map((rule, key) => {
      return <div key={key}>{rule}</div>
    }))
    return (
      <>
        {
          showError ?
            <div className={'errorsContainer'}>
              <AiOutlineCloseCircle
                className={'close'}
                onClick={() => {
                  setShowError(false)
                }}/>
              <div className={'errors'}>
                <div>Must meet all the following conditions:</div>
                {errorRules}
              </div>
              <span className={'errorsContainerBackground'}/>
            </div> :
            <span className={'errorLabel'}>
              {validated.desc.toString().substring(0, Math.min(20, validated.desc.toString().length)) + '...'}
              <BiCommentError
                className={'errorRevealIcon'} onClick={() => {
                setShowError(true)
              }}/>
            </span>
        }
      </>
    )
  }
  return (
    <div className={'inputContainer'}>
      <label>{label}</label>
      <input
        className={'input'}
        type={typeHandler()}
        name={name}
        value={value}
        placeholder={placeHolderValue}
        autoFocus={canAutoFocus}
        onChange={(e) => {
          window.localStorage.setItem(id, e.target.value);
          setValue(e.target.value);
        }}
      />
      {
        (type === 'password') ?
          passwordReveal ? <FiEyeOff className={'reveal'} onClick={() => {
            setPasswordReveal(false)
          }}/> : <FiEye className={'reveal'} onClick={() => {
            setPasswordReveal(true)
          }}/> : ''
      }
      {value.length > 0 && textValidation
        &&
          <span>
            {testValue()}
          </span>
      }
      {
        isRequired && value.length > 0 && <span>*</span>
      }
    </div>
  );
}

export default Input;
