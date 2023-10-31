import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { InputContext, useInputContext } from '../components/ThemedInput';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ThemedButton from '../components/ThemedButton';
import ThemedInput from '../components/ThemedInput';
import ThemedStepper from '../components/ThemedStepper';
import SignupBanner from '../assets/SignupBanner.png';
// import verifyEmail from '../util/EmailVerification';
import '../stylesheets/LoginSignup.css';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { Profile } from '../../models';
import { ProfileStatus } from '../../models';

const PaperStyling = {
  display: 'flex',
  width: '1000px',
  height: '600px',
  borderRadius: '10px',
  filter: 'drop-shadow(0px 15px 40px rgba(192, 225, 255, 0.1))',
  color: '#3C4047',
};

/**
 * Creates signup page
 * @return {HTML} signup page
 */
export default function Signup() {
  const [stepNumber, setStepNumber] = useState(0);
  const [createdProfileData, setCreatedProfileData] = useState(null);
  const [values, setValues] = useState({
    0: {
      firstname: '',
      lastname: '',
    },
    1: {
      schoolemail: '',
      graduationyear: '',
    },
    2: {
      useremail: '',
      userpassword: '',
      active: 'false',
    },
    3: {
      verifycode: '',
    }
  });

  const createUser = () => {
    // create user in aws
    let username = values[2].useremail;
    let password = values[2].userpassword;
    let email = values[2].useremail;
    Auth.signUp({
      username,
      password,
      attributes: {
        "email": email,
        "given_name": values[0].firstname,
        "family_name": values[0].lastname,
      },
      autoSignIn: { // optional - enables auto sign in after user is confirmed
        enabled: true,
      }
    })
      .then((res) => {
        const { user } = res;
        console.log("Auth.signup Success! ", user);
        DataStore.save(
          new Profile({
            "email": email,
            "schoolEmail": values[1].schoolemail,
            "firstName": values[0].firstname,
            "lastName": values[0].lastname,
            "status": ProfileStatus.PENDING,
            "graduationYear": values[1].graduationyear,
            "active": true,
            "isAdmin": false,
            "isApproved": false,
          })
        );
      })
      .then(() => {
        toast.success('Account created', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setCreatedProfileData({
          "email": email,
          "schoolEmail": values[1].schoolemail,
          "firstName": values[0].firstname,
          "lastName": values[0].lastname,
          "status": ProfileStatus.PENDING,
          "graduationYear": values[1].graduationyear,
        });
        // verifyEmail(json);
        setValues((prevValues) => ({
          ...prevValues,
          [2]: {
            ...prevValues[2],
            useremail: prevValues[2].useremail,
            userpassword: '',
            active: 'false',
          },
        }));
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  };

  const checkValues = (object) => {
    return Object.values(object).every((v) => v && typeof v === 'object' ?
      checkValues(v) : v.length > 0,
    );
  };

  const isInputValid = (input, type) => {
    let regex;
    switch (type) {
      case 'schoolemail':
        regex = /^\S+@ucsc.edu$/;
        return regex.test(input);

      case 'graduationyear':
        const today = new Date();
        const beforeToday = today.getFullYear() - 50;
        const afterToday = today.getFullYear() + 10;
        return Number(input) >= beforeToday && Number(input) <= afterToday;

      case 'useremail':
        regex = /^\S+@\S+\.\S+$/;
        return regex.test(input);

      case 'userpassword':
        regex = /[A-Z]/;
        return regex.test(input) && input.length >= 8;
    }
  };

  const isFormValid = () => {
    const checkStep1 = checkValues(values[0]);
    const checkStep2 =
      checkValues(values[1]) &&
      isInputValid(values[1].schoolemail, 'schoolemail') &&
      isInputValid(values[1].graduationyear, 'graduationyear');
    const checkStep3 =
      checkValues(values[2]) &&
      isInputValid(values[2].useremail, 'useremail') &&
      isInputValid(values[2].userpassword, 'userpassword');

    return checkStep1 && checkStep2 && checkStep3;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      createUser();
      handleNextStep(3);
    } else {
      alert('Required fields need to be filled or invalid inputs');
    }
  };

  const handleResend = () => {
    console.log(createdProfileData);
    // verifyEmail(createdProfileData);
  };

  const handleNextStep = (step) => {
    setStepNumber(step);
  };

  return (
    <InputContext.Provider value={[values, setValues]}>
      <Box className='page' aria-label='Signup form'>
        <Paper className='card' elevation={0} sx={PaperStyling}>
          <div className='card-banner flow-small padding-64'>
            <p className='text-bold text-italic text-white'>Logo.</p>
            <h3 className='text-xbold text-white'>
              Grow your connection with the UCSC community!
            </h3>
            <div className='flow-tiny'>
              <img src={SignupBanner} />
              <p className='text-bold text-white text-tiny'>
                Image from&nbsp;
                <a href="https://icons8.com/?utm_source=figma-plugin-icons8&utm_medium=cross-promo&utm_campaign=web-version">icons8.com</a>
              </p>
            </div>
          </div>
          <Box className='card-content padding-64'>
            <SignupStepOne
              active={stepNumber === 0}
              step={0}
              handleNextStep={(e) => handleNextStep(e)}
            />
            <SignupStepTwo
              active={stepNumber === 1}
              step={1}
              handleNextStep={(e) => handleNextStep(e)}
              isInputValid={(input, type) => isInputValid(input, type)}
            />
            <SignupStepThree
              active={stepNumber === 2}
              step={2}
              handleNextStep={(e) => handleNextStep(e)}
              handleSubmit={handleSubmit}
              isInputValid={(input, type) => isInputValid(input, type)}
            />
            <SignupStepFour
              active={stepNumber === 3}
              step={3}
              handleNextStep={(e) => handleNextStep(e)}
              handleResend={handleResend}
              isInputValid={(input, type) => isInputValid(input, type)}
            />
          </Box>
        </Paper>
        <ThemedStepper
          steps={['Name', 'School', 'Email', 'Verification']}
          stepNumber={stepNumber}
          handleNextStep={(e) => handleNextStep(e)}
          nonLinear={true}
          width={'40em'}
          signupData={{
            values: values,
            checkValues: checkValues,
          }}
        />
      </Box>
    </InputContext.Provider>
  );
}

/**
 * Step one of signup
 * @return {JSX}
 */
function SignupStepOne({ active, step, handleNextStep }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <div className='flow-large' style={{ display: active ? null : 'none' }}>
      <div>
        <h2 className='text-normal'>Signup</h2>
        <p className='text-light text-warning'>
          Required <span className='text-bold'>*</span>
        </p>
      </div>
      <div className='grid-flow-large'>
        <div className='grid-flow-small'>
          <p className='text-bold'>
            First Name <span className='text-bold text-warning'>*</span>
          </p>
          <ThemedInput
            placeholder={'Bob'}
            type={'text'}
            index={'firstname'}
            step={step}
            fill={'given-name'}
          />
        </div>
        <div className='grid-flow-small'>
          <p className='text-bold'>
            Last Name <span className='text-bold text-warning'>*</span>
          </p>
          <ThemedInput
            placeholder={'Smith'}
            type={'text'}
            index={'lastname'}
            step={step}
            fill={'family-name'}
          />
        </div>
      </div>
      <div className='grid-flow-small'>
        <div className='flex-flow-small'>
          <ThemedButton
            aria-label='Next step button'
            color={'yellow'}
            variant={'themed'}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) + 1)}
          >
            Next Step
          </ThemedButton>
        </div>
        <p className='text-light'>
          Already have an account?
          <span
            className='text-bold text-blue clickable'
            onClick={handleNavigate}
          >
            &nbsp;Login here
          </span>
        </p>
      </div>
    </div>
  );
}

/**
 * Step two of signup
 * @return {JSX}
 */
function SignupStepTwo({ active, step, handleNextStep, isInputValid }) {
  const navigate = useNavigate();
  const value = useInputContext();
  const [values] = value;

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <div className='flow-large' style={{ display: active ? null : 'none' }}>
      <div>
        <h2 className='text-normal'>Signup</h2>
        <p className='text-light text-warning'>
          Required <span className='text-bold'>*</span>
        </p>
      </div>
      <div className='grid-flow-large'>
        <div className='grid-flow-small'>
          <div className='flex-space-between text-bold'>
            <p>School Email</p>
            <p
              className='text-warning'
              style={{
                opacity:
                  values[1].schoolemail.length > 0 &&
                    !isInputValid(values[1].schoolemail, 'schoolemail') ?
                    1 : 0,
              }}
            >
              Invalid UCSC email
            </p>
          </div>
          <ThemedInput
            placeholder={'bobsmith@ucsc.edu'}
            type={'text'}
            index={'schoolemail'}
            step={step}
            fill={'email'}
            error={
              values[1].schoolemail.length > 0 &&
              !isInputValid(values[1].schoolemail, 'schoolemail')
            }
          />
        </div>
        <div className='grid-flow-small'>
          <div className='flex-space-between text-bold'>
            <p>
              Year of Graduation <span className='text-warning'>*</span>
            </p>
            <p
              className='text-warning'
              style={{
                opacity:
                  values[1].graduationyear.length > 0 &&
                    !isInputValid(values[1].graduationyear, 'graduationyear') ?
                    1 : 0,
              }}
            >
              Invalid graduation year
            </p>
          </div>
          <ThemedInput
            placeholder={'1997'}
            type={'text'}
            index={'graduationyear'}
            step={step}
            error={
              values[1].graduationyear.length > 0 &&
              !isInputValid(values[1].graduationyear, 'graduationyear')
            }
          />
        </div>
      </div>
      <div className='grid-flow-small'>
        <div className='flex-flow-large'>
          <ThemedButton
            aria-label='Back step button'
            color={'yellow'}
            variant={'cancel'}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) - 1)}
          >
            Back
          </ThemedButton>
          <ThemedButton
            aria-label='Next step button'
            color={'yellow'}
            variant={'themed'}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) + 1)}
          >
            Next Step
          </ThemedButton>
        </div>
        <p className='text-light'>
          Already have an account?
          <span
            className='text-bold text-blue clickable'
            onClick={handleNavigate}
          >
            &nbsp;Login here
          </span>
        </p>
      </div>
    </div>
  );
}

/**
 * Step three of signup
 * @return {JSX}
 */
function SignupStepThree({
  active,
  step,
  handleNextStep,
  handleSubmit,
  isInputValid,
}) {
  const navigate = useNavigate();
  const value = useInputContext();
  const [values] = value;

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <Box
      className='flow-large'
      component='form'
      noValidate
      style={{ display: active ? null : 'none' }}
    >
      <div>
        <h2 className='text-normal'>Signup</h2>
        <p className='text-light text-warning'>
          Required <span className='text-bold'>*</span>
        </p>
      </div>
      <div className='grid-flow-large'>
        <div className='grid-flow-small'>
          <div className='flex-space-between text-bold'>
            <p>
              Email <span className='text-warning'>*</span>
            </p>
            <p
              className='text-warning'
              style={{
                opacity:
                  values[2].useremail.length > 0 &&
                    !isInputValid(values[2].useremail, 'useremail') ?
                    1 : 0,
              }}
            >
              Invalid email
            </p>
          </div>
          <ThemedInput
            placeholder={'bobsmith@gmail.com'}
            type={'text'}
            index={'useremail'}
            step={step}
            fill={'email'}
            error={
              values[2].useremail.length > 0 &&
              !isInputValid(values[2].useremail, 'useremail')
            }
          />
        </div>
        <div className='grid-flow-small'>
          <div className='flex-space-between text-bold'>
            <p>
              Password <span className='text-warning'>*</span>
            </p>
            <p
              className='text-warning'
              style={{
                opacity:
                  values[2].userpassword.length > 0 &&
                    !isInputValid(values[2].userpassword, 'userpassword') ?
                    1 : 0,
              }}
            >
              8+ Characters, 1 Capital Letter
            </p>
          </div>
          <ThemedInput
            placeholder={'8+ Characters, 1 Capital Letter'}
            type={'password'}
            index={'userpassword'}
            step={step}
            error={
              values[2].userpassword.length > 0 &&
              !isInputValid(values[2].userpassword, 'userpassword')
            }
          />
        </div>
      </div>
      <div className='grid-flow-small'>
        <div className='flex-flow-large'>
          <ThemedButton
            aria-label='Back step button'
            color={'yellow'}
            variant={'cancel'}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) - 1)}
          >
            Back
          </ThemedButton>
          <ThemedButton
            aria-label='Signup button'
            color={'yellow'}
            variant={'themed'}
            type={'submit'}
            onClick={(e) => { handleSubmit(e) }}
          >
            Create account
          </ThemedButton>
        </div>
        <p className='text-light'>
          Already have an account?
          <span
            className='text-bold text-blue clickable'
            onClick={handleNavigate}
          >
            &nbsp;Login here
          </span>
        </p>
      </div>
    </Box>
  );
}

/**
 * Step four of signup
 * @return {JSX}
 */
function SignupStepFour({ active, step, handleResend }) {
  
  const navigate = useNavigate();
  const value = useInputContext();
  const [values] = value;
  const confirmSignUp = async () => {
    Auth.confirmSignUp(values[2].useremail, values[3].verifycode)
      .then(() => {
        console.log("Passed");
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        alert('code incorrect');
      });
  }
  
  return (
    <div className='flow-large' style={{ display: active ? null : 'none' }}>
      <div className='grid-flow-large text-center'>
        <h2 className='text-normal'>Verify your email</h2>
        <p className='text-gray text-lineheight-24'>
          We just sent you an email to verify your email address. Please
          use the code in the email to activate your account.
        </p>
        <ThemedInput
          placeholder={'Verification Code'}
          type={'text'}
          index={'verifycode'}
          step={step}
        />
      </div>
      <div className='grid-flow-small grid-center text-center'>
        <div className='flex-flow-small'>
          <ThemedButton
            color={'yellow'}
            variant={'themed'}
            value={step}
            onClick={(e) => {confirmSignUp()}}
          >
            Verify
          </ThemedButton>
        </div>
      </div>
      {/* <p className='text-gray text-center text-lineheight-24'>
        If you did not receive the email, please click the button below
        to resend another email.
      </p>
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
      </div> */}
    </div>
  );
}
