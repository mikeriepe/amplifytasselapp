import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {InputContext} from '../components/ThemedInput';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import ThemedButton from '../components/ThemedButton';
import ThemedInput from '../components/ThemedInput';
import LoginBanner from '../assets/LoginBanner.png';
import useAuth from '../util/AuthContext';
import '../stylesheets/LoginSignup.css';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Profile, WorkHistory } from '../../models';
import { ProfileStatus } from '../../models';

const PaperStyling = {
  display: 'flex',
  width: '1000px',
  height: '600px',
  borderRadius: '10px',
  filter: 'drop-shadow(0px 15px 40px rgba(192, 225, 255, 0.1))',
  color: '#3C4047',
};

const InputLabelStyling = {
  '.MuiTypography-root': {
    fontFamily: 'inherit',
    fontSize: '0.8rem',
    fontWeight: 'inherit',
    color: '#8B95A5',
  },
  'marginLeft': '1em',
};

/**
 * Creates login page
 * @return {HTML} login page
 */
export default function Login() {
  const navigate = useNavigate();
  const {user, setUser, setLoggedIn, setUserProfile} = useAuth();

  const [stepPage, setStepPage] = useState('login');
  const [values, setValues] = useState({
    'login': {
      useremail: '',
      userpassword: '',
    },
    'forgot1': {
      useremail: '',
    },
    'forgot2': {
      verifycode: '',
    },
    'forgot3': {
      newpassword: '',
      confirmpassword: '',
    },
    'verification': {
      completesignup: '',
    },
  });

  useEffect(() => {
    if (user != null) {
      getProfile();
    }
  }, [user]);

  const login = () => {
    Auth.signIn(values['login'].useremail, values['login'].userpassword)
      .then((user) => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          const { requiredAttributes } = user.challengeParam;
          console.log(user.challengeName);
          console.log(`requiredAttributes: ${requiredAttributes}`);
          Auth.completeNewPassword(
            user, // the Cognito User Object
            values['login'].userpassword
          )
          .then((user) => {
            // at this time the user is logged in if no MFA required
            console.log('new password completed!');
            console.log('login worked!');
            toast.success('Login Success', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setLoggedIn(true);
            // console.log(JSON.stringify(user));
            setUser(user.challengeParam.userAttributes);
          })
          .catch((e) => {
            console.log(e);
          });
        } else {
          console.log('login worked!');
          console.log(JSON.stringify(user));
          toast.success('Login Success', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoggedIn(true);
          console.log(`user.attributes: ${JSON.stringify(user.attributes)}`);
          setUser(user.attributes);
        }
      })
      .catch((error) => {
        if (error.name === 'UserNotConfirmedException') {
          handleNextPage('verification');
          resend();
        } else {
          console.log('error logging in:', error);
          alert('Invalid Username or Password. Please Try Again.');
        }
      });
  };

  const resend = async () => {	
    Auth.resendSignUp(values['login'].useremail)
      .catch((err) => {
        console.log('error resending code: ', err);
      })
  }

  const getProfile = async () => {
    console.log(values['login'].useremail);
    const profile = await DataStore.query(Profile, c => c.email.eq(values['login'].useremail));
    console.log(JSON.stringify(profile));
    console.log('profile:', JSON.stringify(profile));
    setUserProfile(profile[0]);
    profile[0].status === 'APPROVED' || profile[0].status === 'ADMIN' ? navigate(`/dashboard`) : navigate(`/myprofile`);
  };

  const handleNextPage = (step) => {
    setStepPage(step);
  };

  return (
    <InputContext.Provider value={[values, setValues]}>
      <Box className='page' aria-label='Login form'>
        <Paper className='card' elevation={0} sx={PaperStyling}>
          <div className='card-banner flow-small padding-64'>
            <p className='text-bold text-italic text-white'>Logo.</p>
            <h3 className='text-xbold text-white'>Welcome back!</h3>
            <div className='flow-tiny'>
              <img src={LoginBanner} />
              <p
                className='text-bold text-white text-tiny'
                style={{position: 'absolute', bottom: '8.5em'}}
              >
                Image from&nbsp;
                <a href="https://icons8.com/?utm_source=figma-plugin-icons8&utm_medium=cross-promo&utm_campaign=web-version">icons8.com</a>
              </p>
            </div>
          </div>
          <Box
            className='card-content padding-64'
            component='form'
            autoComplete='on'
            noValidate
          >
            <LoginForm
              active={stepPage === 'login'}
              handleNextPage={(e) => handleNextPage(e)}
              login={login}
              values={values}
            />
            <ForgotPasswordOne
              active={stepPage === 'forgot1'}
              handleNextPage={(e) => handleNextPage(e)}
              values={values}
            />
            <ForgotPasswordTwo
              active={stepPage === 'forgot2'}
              handleNextPage={(e) => handleNextPage(e)}
              values={values}
            />
             <ForgotPasswordThree
              active={stepPage === 'forgot3'}
              handleNextPage={(e) => handleNextPage(e)}
              values={values}
            />
            <ForgotPasswordFour 
              active={stepPage === 'forgot4'}
              handleNextPage={(e) => handleNextPage(e)}
            />
            <Verification
              active={stepPage === 'verification'}
              handleNextPage={(e) => handleNextPage(e)}
              values={values}
            />
          </Box>
        </Paper>
      </Box>
    </InputContext.Provider>
  );
}

/**
 * Login form
 * @return {JSX}
 */
function LoginForm({active, handleNextPage, login}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/signup');
  };

  return (
    <div className='flow-large' style={{display: active ? null : 'none'}}>
      <div className='grid-flow-large'>
        <div>
          <h2 className='text-normal'>Login</h2>
          <p className='text-light text-warning'>
            Required <span className='text-bold'>*</span>
          </p>
        </div>
        <p className='text-gray text-lineheight-24'>
          Enter your email address and password
          below to login to your account.
        </p>
      </div>
      <div className='grid-flow-large'>
        <div className='grid-flow-small'>
          <p className='text-bold'>
            Email <span className='text-bold text-warning'>*</span>
          </p>
          <ThemedInput
            placeholder={'bobsmith@gmail.com'}
            type={'text'}
            index={'useremail'}
            step={'login'}
            fill={'email'}
            label={'Login Email input field'}
          />
        </div>
        <div className='grid-flow-small'>
          <p className='text-bold'>
            Password <span className='text-bold text-warning'>*</span>
          </p>
          <ThemedInput
            placeholder={'Your password'}
            type={'password'}
            index={'userpassword'}
            step={'login'}
            label={'Login Password input field'}
          />
          <p
            className='text-blue clickable'
            onClick={(e) => handleNextPage('forgot1')}
          >
            Forgot your password?
          </p>
        </div>
      </div>
      <div className='grid-flow-small'>
        <div>
          <ThemedButton
            aria-label='Login button'
            color={'yellow'}
            variant={'themed'}
            type={'submit'}
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            Login
          </ThemedButton>
          <FormControlLabel
            label='Keep me logged in'
            control={<Checkbox disableRipple />}
            sx={InputLabelStyling}
          />
        </div>
        <p className='text-light'>
          Don&apos;t have an account?
          <span
            className='text-bold text-blue clickable'
            onClick={handleNavigate}
          >
            &nbsp;Register here
          </span>
        </p>
      </div>
    </div>
  );
}

/**
 * Part one of changing password
 * @return {JSX}
 */
function ForgotPasswordOne({active, handleNextPage, values}) {
  
  const handleForgotPW1 = (e) => {
    Auth.forgotPassword(values['forgot1'].useremail)
      .then((data) => {
        console.log(data);
        handleNextPage(e.target.value)
      })
      .catch((err) => {
        if (err.name === 'UserNotFoundException') {
          alert('Account with this email does not exist.')
        }
        console.log(err)
      });
  }
  
  return (
    <div className='flow-large' style={{display: active ? null : 'none'}}>
      <div className='grid-flow-large'>
        <h2 className='text-normal'>Forgot your password?</h2>
        <p className='text-gray text-lineheight-24'>
          Don&apos;t worry, we can help you out! If you remember
          your email address, you can quickly reset your password.
          Input your email address and we&apos;ll send you a link to your
          email that will allow you to reset your password.
        </p>
      </div>
      <div className='grid-flow-small'>
        <p className='text-bold'>Email</p>
        <ThemedInput
          placeholder={'bobsmith@gmail.com'}
          type={'text'}
          index={'useremail'}
          step={'forgot1'}
          fill={'email'}
        />
      </div>
      <div className='grid-flow-small'>
        <div className='flex-flow-large'>
          <ThemedButton
            color={'yellow'}
            variant={'cancel'}
            value={'login'}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Back
          </ThemedButton>
          <ThemedButton
            color={'yellow'}
            variant={'themed'}
            value={'forgot2'}
            onClick={(e) => {handleForgotPW1(e)}}
          >
            Request password change
          </ThemedButton>
        </div>
        <p className='text-light'>
          Need help? Contact us at
          <span className='text-bold text-blue'> tasselsupport@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Part two of changing password
 * @return {JSX}
 */
function ForgotPasswordTwo({active, handleNextPage, values}) {
  return (
    <div className='flow-large' style={{display: active ? null : 'none'}}>
      <div className='grid-flow-large text-center'>
        <h2 className='text-normal'>Verify your email</h2>
        <p className='text-gray text-lineheight-24'>
          We just sent you an email to verify your password change request. Please
          use the code in the email to move forward. 
        </p>
        <ThemedInput
          placeholder={'Verification Code'}
          type={'text'}
          index={'verifycode'}
          step={'forgot2'}
        />
      </div>
      <div className='grid-flow-small grid-center text-center'>
        <div className='flex-flow-small'>
          <ThemedButton
            color={'yellow'}
            variant={'themed'}
            value={'forgot3'}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Verify
          </ThemedButton>
        </div>
      </div>
    </div>
  );
}

/**
 * Part three of changing password
 * @return {JSX}
 */
function ForgotPasswordThree({active, handleNextPage, values}) {
  
  const handleForgotPW3 = () => {
    Auth.forgotPasswordSubmit(values['forgot1'].useremail, values['forgot2'].verifycode, values['forgot3'].newpassword)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  
  return (
    <div className='flow-large' style={{display: active ? null : 'none'}}>
      <div className='grid-flow-large'>
        <h2 className='text-normal'>Change your password</h2>
        <p className='text-gray text-lineheight-24'>
          Enter your new password below.
          We strongly advise you to store it safely.
        </p>
      </div>
      <div className='grid-flow-large'>
        <div className='grid-flow-small'>
          <p className='text-bold'>New Password</p>
          <ThemedInput
            placeholder={'8+ Characters, 1 Capital Letter'}
            type={'password'}
            index={'newpassword'}
            step={'forgot3'}
          />
        </div>
        <div className='grid-flow-small'>
          <p className='text-bold'>Confirm Password</p>
          <ThemedInput
            placeholder={'8+ Characters, 1 Capital Letter'}
            type={'password'}
            index={'confirmpassword'}
            step={'forgot3'}
          />
        </div>
      </div>
      <div className='grid-flow-small'>
        <div className='flex-flow-large'>
          <ThemedButton
            color={'yellow'}
            variant={'cancel'}
            value={'login'}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Cancel
          </ThemedButton>
          <ThemedButton
            color={'yellow'}
            variant={'themed'}
            value={'forgot4'}
            onClick={(e) => {handleNextPage(e.target.value); handleForgotPW3()}}
          >
            Change password
          </ThemedButton>
        </div>
        <p className='text-light'>
          Need help? Contact us at
          <span className='text-bold text-blue'> tasselsupport@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Part four of changing password
 * @return {JSX}
 */
function ForgotPasswordFour({active, handleNextPage}) {
  const navigate = useNavigate();

  return (
    <div className='flow-large' style={{display: active ? null : 'none'}}>
      <div className='grid-flow-large text-center'>
        <h2 className='text-normal'>Success!</h2>
        <p className='text-gray text-lineheight-24'>
          We have successfully changed your password.
          Click the button below to login to your account.
        </p>
      </div>
      <div className='grid-flow-small grid-center'>
        <div className='flex-flow-small'>
          <ThemedButton
            color={'yellow'}
            variant={'themed'}
            value={'login'}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Login
          </ThemedButton>
        </div>
        <p className='text-light'>
          Need help? Contact us at
          <span className='text-bold text-blue'> tasselsupport@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

function Verification({active, handleNextPage, values}) {

  const confirmSignUp = async () => {
    await Auth.confirmSignUp(values['login'].useremail, values['verification'].completesignup);
  }

  return (
    <div className='flow-large' style={{display: active ? null : 'none'}}>
      <div className='grid-flow-large text-center'>
        <h2 className='text-normal'>Verify your email</h2>
        <p className='text-gray text-lineheight-24'>
          You previously did not verify your email address. 
          We just sent you an email to verify your email address. Please
          use the code in the email to activate your account. 
        </p>
        <ThemedInput
          placeholder={'Verification Code'}
          type={'text'}
          index={'completesignup'}
          step={'verification'}
        />
      </div>
      <div className='grid-flow-small grid-center text-center'>
        <div className='flex-flow-small'>
          <ThemedButton
            color={'yellow'}
            variant={'themed'}
            value={'login'}
            onClick={(e) => {
              confirmSignUp();
              handleNextPage(e.target.value);
            }
            }
          >
            Verify
          </ThemedButton>
        </div>
      </div>
      <p className='text-gray text-center text-lineheight-24'>
        If you did not receive the email, please click the button below
        to resend another email.
      </p>
      {/*
      <div className='grid-flow-small grid-center text-center'>
        <div className='flex-flow-small'>
          <ThemedButton
            color={'yellow'}
            variant={'cancel'}
            value={step}
            onClick={handleResend}
          >
            Resend Email
          </ThemedButton>
        </div>
        <p className='text-light'>
          Need help? Contact us at
          <span className='text-bold text-blue'> tasselsupport@gmail.com</span>
        </p>
      </div>
          */}
    </div>
  );
}