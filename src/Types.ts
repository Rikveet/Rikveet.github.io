import React from "react";
import {FieldValue} from "firebase/firestore";

export type ReactRef<T> = React.MutableRefObject<T>
export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>

export type FormInputTypes = 'text' | 'email' | 'password';

export type FunctionType = { func: Function, funcParameters?: {} }

export type UID = string | undefined
export type User = {
    uid: UID,
    setUid: ReactSetState<UID>
};
export type UserInfo = {
    displayName: string,
    imageUrl: string,
    description: string,
    github: string,
    linkedIn: string,
    social: string,
    timestamp: FieldValue
}

export type ProjectT = {
    projectID: number,
    projectName: string,
    projectDesc: string,
    images: string[],
    liveLink?: string,
    codeLink?: string,
    timestamp: FieldValue
}

export type textValidationT = { result: true } | { result: false, desc: string[] };

export interface textValidation {
    (text: string): textValidationT
}

export function emailValidation(text: string): textValidationT {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(text) ? {result: true} : {
        result: false,
        desc: ['Email is not valid']
    }
}

export function passwordValidation(text: string): textValidationT {
    const regex = /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/g;
    return regex.test(text) ?
        {result: true} :
        {
            result: false,
            desc: ['Length must be in-between 8 and 32',
                'At least one alphabet',
                'At least one special character',
                'At least one digit']
        };
}
