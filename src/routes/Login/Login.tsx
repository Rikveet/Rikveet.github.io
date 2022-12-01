import React, {useContext, useEffect} from 'react';
import Form from "../../components/core/Form/Form";
import Input from "../../components/core/Form/Input/Input";
import {useNavigate} from "react-router-dom";
import {fetchSignInMethodsForEmail, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {FirebaseContext} from "../../contexts/FirebaseContext";
import Video from "../../components/core/VedioBackground/Video";
// @ts-ignore
import BackgroundVideo from "../Backgrounds/loginSignUp.mp4";

function Login() {
  const firebaseApp = useContext(FirebaseContext);
  const auth = getAuth(firebaseApp);
  const nav = useNavigate();
  useEffect(
    () => {
      if (auth.currentUser && auth.currentUser.uid ) {
        nav('/user');
      }
    }
    , [auth.currentUser]);
  return (
    <div className={'mainDisplay'}>
      <Video source={BackgroundVideo}/>
      {auth.currentUser && auth.currentUser.uid ?
        <div>User Already Logged In, Redirecting To Home</div>
        :
        <>
          <Form heading={'Login'}
                navOptions={
                  <>
                    <button onClick={() => {
                      nav('/')
                    }}>Home
                    </button>
                    <button onClick={() => {
                      nav('/signup')
                    }}>Sign Up
                    </button>
                  </>
                }
                onSubmitFunc={async (e) => {
                  const target = e.target as typeof e.target & {
                    email: { value: string },
                    password: { value: string }
                  }
                  const email = target.email.value;
                  const password = target.password.value;
                  if (!email || !password)
                    throw new Error('One or more required fields are empty');
                  const auth = getAuth(firebaseApp);
                  const methods = await fetchSignInMethodsForEmail(auth, email);
                  if (methods.length <= 0)
                    throw Error('User does not exist');
                  try {
                    await signInWithEmailAndPassword(auth, email, password);
                  } catch (e) {
                    throw Error('Password or Email is incorrect');
                  }
                  nav('/')
                }
                }>
            <Input
              id={'email'}
              label={"E-Mail"}
              name={"email"}
              type={"email"}
              placeHolderValue={'enter email'}
              canAutoFocus={true}/>
            <Input
              id={'password'}
              label={"Password"}
              name={"password"}
              type={"password"}
              isPersistent={false}
              placeHolderValue={'enter password'}/>
          </Form>

        </>
      }
    </div>
  );
}

export default Login;
