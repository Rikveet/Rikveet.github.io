import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from "../../../contexts/FirebaseContext";
import Button from "../Button/Button";
import {getAuth, reload, sendEmailVerification} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import "./EmailVerify.sass";

function EmailVerify() {
    // don't need a user check here
    const firebaseApp = useContext(FirebaseContext);
    const [error, _setError] = useState('');
    const setError = (error: string) => {
        _setError(error);
        setTimeout(() => {
            _setError('');
        }, 5000)
    }
    const [isEmailSent, setEmailSent] = useState(false);
    const [waitBetweenEmailSent, setWaitBetweenEmailSent] = useState(15);
    const [waitBetweenSecondsCounter, setWaitBetweenSecondsCounter] = useState(waitBetweenEmailSent);
    const [emailVerified, setEmailVerified] = useState(false);
    const [emailVerifiedButtonVisible, setEmailVerifiedButtonVisible] = useState(false);

    const nav = useNavigate();

    useEffect(() => {
        if (isEmailSent) {
            setTimeout(() => {
                if (waitBetweenSecondsCounter <= 0) {
                    setEmailSent(false);
                    setWaitBetweenEmailSent(Math.min(waitBetweenEmailSent + 1, 30));
                }
                setWaitBetweenSecondsCounter(waitBetweenSecondsCounter - 1);
            }, 1000);
        }
    }, [isEmailSent, waitBetweenEmailSent, waitBetweenSecondsCounter])

    useEffect(() => {
        return () => {
            if (waitBetweenSecondsCounter <= 0) {
                setWaitBetweenSecondsCounter(waitBetweenEmailSent);
            }
        };
    }, [waitBetweenSecondsCounter]);

    return (
        <div className={"emailVerifyContainer"}>
            <div className={'emailVerify'}>
                <span className={'emailVerifyContainerBackground'}/>
                <div className={'heading'}>{
                    emailVerified ?
                        <>Email verified, You will be signed out now. Please re-login to continue.</> :
                        <>Before doing changes to your profile <br/> please confirm your email</>
                }</div>
                <>
                    {!emailVerified &&
                        <>
                            {emailVerifiedButtonVisible && <div className={'message'}>If confirmed click the email confirmed button</div>}
                            {isEmailSent &&
                                <div className={'message'}>Wait for {waitBetweenSecondsCounter} seconds to resend another email</div>}
                            <div className={'buttonContainer'}>
                                {<Button id={'email_verification'}
                                         isDisabled={isEmailSent}
                                         text={'Send Link'} f={{
                                    func: async () => {
                                        try {
                                            setEmailSent(true);
                                            setEmailVerifiedButtonVisible(true);
                                            await sendEmailVerification(getAuth(firebaseApp).currentUser!);
                                        } catch (e) {
                                            if (e instanceof Error)
                                                setError('Was unable to send a link.');
                                        }
                                    }
                                }}/>}
                                {
                                    emailVerifiedButtonVisible && !emailVerified &&
                                    <Button id={'email_confirm'} text={'Email Confirmed'} f={{
                                        func: async () => {
                                            if (getAuth(firebaseApp).currentUser?.uid) {
                                                await reload(getAuth(firebaseApp).currentUser!);
                                                if (getAuth(firebaseApp).currentUser?.emailVerified) {
                                                    setEmailVerified(true);
                                                    setTimeout(() => {
                                                        getAuth(firebaseApp).signOut().then(() => {
                                                            nav('/login', {replace: true})
                                                        });
                                                    }, 5000)
                                                } else {
                                                    setError('Our server records indicate email is not verified.')
                                                }
                                            }
                                        }
                                    }}/>
                                }
                            </div>
                        </>
                    }
                </>

                {error.length > 0 && <div className={"message error"}>{error}</div>}
            </div>

        </div>
    );
}

export default EmailVerify;
