import React, {useContext, useEffect} from 'react';
import {FirebaseContext} from "../../contexts/FirebaseContext";
import {createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import Input from "../../components/core/Form/Input/Input";
import Form from "../../components/core/Form/Form";
// types
import {emailValidation, passwordValidation} from "../../Types";
import Video from "../../components/core/VedioBackground/Video";
// @ts-ignore
import BackgroundVideo from "../Backgrounds/loginSignUp.mp4";


function SignUp() {
  const firebaseApp = useContext(FirebaseContext);
  const auth = getAuth(firebaseApp);
  const nav = useNavigate();
  useEffect(
    () => {
      if (auth.currentUser && auth.currentUser.uid ) {
        nav('/login');
      }
    }
    , [auth.currentUser]);

  return (
    <div className={'mainDisplay'}>
      <Video source={BackgroundVideo}/>
      {auth.currentUser && auth.currentUser.uid  ?
        <div>User Logged In, Redirecting To Home</div>
        :
        <>
          <Form heading={'Sign Up'}
                navOptions={
                  <>
                    <button onClick={() => {
                      nav('/')
                    }}>Home
                    </button>
                    <button onClick={() => {
                      nav('/login')
                    }}>Log In
                    </button>
                  </>}
                onSubmitFunc={
                  async (e) => {
                    const target = e.target as typeof e.target & {
                      email: { value: string },
                      password: { value: string },
                      confirm_password: { value: string }
                    }
                    const email = target.email.value;
                    const password = target.password.value;
                    const confirm_password = target.confirm_password.value;
                    if (!email || !password || !confirm_password)
                      throw new Error('One or more required fields are empty');
                    if (password !== confirm_password)
                      throw new Error('Passwords did not match');
                    if (!passwordValidation(password).result || !emailValidation(email).result)
                      return;
                    const auth = getAuth(firebaseApp);
                    const methods = await fetchSignInMethodsForEmail(auth, email);
                    console.log(methods);
                    if (methods.length > 0)
                      throw new Error('Account already exists');
                    try {
                      await createUserWithEmailAndPassword(auth, email, password);
                    } catch (e) {
                      console.log(e);
                      throw new Error('Server Refused The Request')
                    }
                  }}>
            <Input
              id={'email'}
              label={"E-Mail"}
              name={"email"}
              type={"email"}
              canAutoFocus={true}
              placeHolderValue={'Enter email'}
              textValidation={emailValidation}/>
            <Input
              id={'password'}
              label={"Password"}
              name={"password"}
              type={"password"}
              isPersistent={false}
              textValidation={passwordValidation}
              placeHolderValue={'Enter password'}/>
            <Input
              id={'confirm_password'}
              label={"Confirm Password"}
              name={"confirm_password"}
              type={"password"}
              isPersistent={false}
              textValidation={passwordValidation}
              placeHolderValue={'Confirm password'}/>
          </Form>

        </>
      }
    </div>

  );
}

export default SignUp;
