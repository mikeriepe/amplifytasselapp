import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InputContext, useInputContext } from "../components/ThemedInput";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ThemedButton from "../components/ThemedButton";
import ThemedInput from "../components/ThemedInput";
import ThemedStepper from "../components/ThemedStepper";
import SignupBanner from "../assets/SignupBanner.png";
import "../stylesheets/LoginSignup.css";
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { Profile } from "../../models";
import { ProfileStatus } from "../../models";

const PaperStyling = {
  display: "flex",
  width: "1000px",
  height: "600px",
  borderRadius: "10px",
  filter: "drop-shadow(0px 15px 40px rgba(192, 225, 255, 0.1))",
  color: "#3C4047",
};

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
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
      firstname: "",
      lastname: "",
    },
    1: {
      schoolemail: "",
      graduationyear: "",
    },
    2: {
      useremail: "",
      userpassword: "",
      active: "false",
    },
    3: {
      verifycode: "",
    },
  });

  // Tracks if the user should be shown the error 'Email already in use'
  const [isUserEmailTaken, setIsUserEmailTaken] = useState(false);
  useEffect(() => setIsUserEmailTaken(false), [values[2].useremail]);

  /*
    When the user clicks 'Create Account',
    this array will be filled with all bad inputs.
    Ex: errors = ['firstname', 'schoolemail', 'userpassword']
  */
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    const formErrors = getErrors();
    let err = [];
    errors.forEach((e) => {
      if (formErrors.includes(e)) err.push(e);
    });
    if (JSON.stringify(err) !== JSON.stringify(errors)) setErrors(err);
  }, [values, isUserEmailTaken, errors]);

  // Tracks if the user clicks 'Create Account', and the backend is
  // checking if the user's account can be created or not.
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  useEffect(() => {
    if (errors.includes("useremailtaken")) setIsCreatingAccount(false);
    if (createdProfileData) setIsCreatingAccount(false);
  }, [errors, createdProfileData]);

  // Tracks if the user clicks 'Resend Email', and the backend is
  // sending the user another verification email.
  const [isResendingVerification, setIsResendingVerification] = useState(false);

  // Tracks if the user clicks 'Verify', and the backend is
  // verifying the user's verification code.
  const [isVerifying, setIsVerifying] = useState(false);

  // Tracks if the user should be shown the error 'Incorrect verification code'
  const [isVerificationCodeWrong, setIsVerificationCodeWrong] = useState(false);
  useEffect(() => setIsVerificationCodeWrong(false), [values[3].verifycode]);

  // Called when the user clicks 'Create Account', and the form is filled out properly.
  const createUser = async () => {
    // create user in aws
    let username = values[2].useremail;
    let password = values[2].userpassword;
    let email = values[2].useremail;
    Auth.signUp({
      username,
      password,
      attributes: {
        email: email,
        given_name: values[0].firstname,
        family_name: values[0].lastname,
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    })
      .then((res) => {
        const { user } = res;
        console.log("Auth.signup Success! ", user);

        // This DataStore.save returns Error 400 (Bad Request)
        // if a profile with the email already exists on Amplify
        DataStore.save(
          new Profile({
            email: email,
            schoolEmail: values[1].schoolemail,
            firstName: values[0].firstname,
            lastName: values[0].lastname,
            status: ProfileStatus.PENDING,
            graduationYear: values[1].graduationyear,
            active: true,
            isAdmin: false,
            isApproved: false,
          })
        );
      })
      .then(() => {
        toast.success("Account created", toastOptions);
        setCreatedProfileData({
          email: email,
          schoolEmail: values[1].schoolemail,
          firstName: values[0].firstname,
          lastName: values[0].lastname,
          status: ProfileStatus.PENDING,
          graduationYear: values[1].graduationyear,
        });
        setValues((prevValues) => ({
          ...prevValues,
          [2]: {
            ...prevValues[2],
            useremail: prevValues[2].useremail,
            userpassword: "",
            active: "false",
          },
        }));
        handleNextStep(3);
      })
      .catch((err) => {
        console.error(err);
        console.error("Email: " + values[2].useremail + " already exists.");
        setIsUserEmailTaken(true);
        setErrors([...errors, "useremailtaken"]);
      });
  };

  const checkValues = (object) => {
    return Object.values(object).every((v) =>
      v && typeof v === "object" ? checkValues(v) : v.length > 0
    );
  };

  const isInputValid = (input, type) => {
    let regex;
    switch (type) {
      case "schoolemail":
        regex = /^\S+@ucsc.edu$/;
        return regex.test(input);

      case "graduationyear":
        const today = new Date();
        const beforeToday = today.getFullYear() - 50;
        const afterToday = today.getFullYear() + 10;
        return Number(input) >= beforeToday && Number(input) <= afterToday;

      case "useremail":
        regex = /^\S+@\S+\.\S+$/;
        return regex.test(input);

      case "userpassword":
        regex = /[A-Z]/;
        return regex.test(input) && input.length >= 8;
    }
  };

  // Called when the user clicks 'Create Account'.
  // Check if the form has any bad inputs, such as an invalid or empty email
  const getErrors = () => {
    let err = [];
    if (values[0].firstname.length === 0) err.push("firstname");
    if (values[0].lastname.length === 0) err.push("lastname");
    if (
      values[1].schoolemail.length > 0 &&
      !isInputValid(values[1].schoolemail, "schoolemail")
    )
      err.push("schoolemail");
    if (!isInputValid(values[1].graduationyear, "graduationyear"))
      err.push("graduationyear");
    if (!isInputValid(values[2].useremail, "useremail")) err.push("useremail");
    if (!isInputValid(values[2].userpassword, "userpassword"))
      err.push("userpassword");
    if (isUserEmailTaken) err.push("useremailtaken");
    return err;
  };

  // Called when the user clicks 'Create Account'
  // 1) If the form has errors, then handle errors accordingly
  // 2) Otherwise, call createUser()
  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = getErrors();
    if (formErrors.length === 0) {
      setIsCreatingAccount(true);
      createUser();
    } else {
      toast.error(
        "Please fix the following fields: " + formErrors.join(", "),
        toastOptions
      );
      setErrors(formErrors);
      for (const [stepNum, formFields] of Object.entries(values)) {
        if (
          Object.keys(formFields).some((formField) =>
            formErrors.includes(formField)
          )
        ) {
          setStepNumber(Number(stepNum));
          // console.error('Going to step', stepNum);
          break;
        }
      }
    }
  };

  // Called when the user clicks 'Resend Email'
  // NOTE: Be sure to check your spam folder for
  // these resent verification emails.
  const handleResend = async () => {
    setIsResendingVerification(true);
    const { email } = createdProfileData;
    console.log("Resending verification for " + email);
    Auth.resendSignUp(email)
      .then(() => {
        toast.success("Email verification sent", toastOptions);
        // Must wait 3 seconds before you can resend
        // another verification email.
        new Promise((r) => setTimeout(r, 3000)).then(() => {
          setIsResendingVerification(false);
        });
      })
      .catch((err) => {
        console.error(err);
        let errMsg = err.log ?? err.code ?? err.name;
        toast.error(errMsg, toastOptions);
        setIsResendingVerification(false);
      });
  };

  // Called when the user clicks 'Verify'
  const navigate = useNavigate();
  const handleVerify = async () => {
    setIsVerifying(true);
    Auth.confirmSignUp(values[2].useremail, values[3].verifycode)
      .then(() => {
        setIsVerifying(false);
        toast.success('Email verified!', toastOptions);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        let errMsg = err.log ?? err.code ?? err.name;
        if (errMsg.includes("CodeMismatchException")) {
          errMsg = "Incorrect verification code";
        }
        toast.error(errMsg, toastOptions);
        setIsVerifying(false);
        setIsVerificationCodeWrong(true);
      });
  };

  const handleNextStep = (step) => {
    setStepNumber(step);
  };

  return (
    <InputContext.Provider value={[values, setValues, errors]}>
      <Box className="page" aria-label="Signup form">
        <Paper className="card" elevation={0} sx={PaperStyling}>
          <div className="card-banner flow-small padding-64">
            <p className="text-bold text-italic text-white">Logo.</p>
            <h3 className="text-xbold text-white">
              Grow your connection with the UCSC community!
            </h3>
            <div className="flow-tiny">
              <img src={SignupBanner} />
              <p className="text-bold text-white text-tiny">
                Image from&nbsp;
                <a href="https://icons8.com/?utm_source=figma-plugin-icons8&utm_medium=cross-promo&utm_campaign=web-version">
                  icons8.com
                </a>
              </p>
            </div>
          </div>
          <Box className="card-content padding-64">
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
              isCreateAccountDisabled={isCreatingAccount}
            />
            <SignupStepFour
              active={stepNumber === 3}
              step={3}
              handleNextStep={(e) => handleNextStep(e)}
              handleResend={handleResend}
              handleVerify={handleVerify}
              isInputValid={(input, type) => isInputValid(input, type)}
              isResendingVerification={isResendingVerification}
              isVerifying={isVerifying}
              isVerificationCodeWrong={isVerificationCodeWrong}
            />
          </Box>
        </Paper>
        <ThemedStepper
          steps={["Name", "School", "Email", "Verification"]}
          stepNumber={stepNumber}
          handleNextStep={(e) => handleNextStep(e)}
          nonLinear={true}
          width={"40em"}
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
  const errors = useInputContext()[2] ?? [];

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="flow-large" style={{ display: active ? null : "none" }}>
      <div>
        <h2 className="text-normal">Signup</h2>
        <p className="text-light text-warning">
          Required <span className="text-bold">*</span>
        </p>
      </div>
      <div className="grid-flow-large">
        <div className="grid-flow-small">
          <p className="text-bold">
            First Name <span className="text-bold text-warning">*</span>
          </p>
          <ThemedInput
            placeholder={"Bob"}
            type={"text"}
            index={"firstname"}
            step={step}
            fill={"given-name"}
            error={errors.includes("firstname")}
          />
        </div>
        <div className="grid-flow-small">
          <p className="text-bold">
            Last Name <span className="text-bold text-warning">*</span>
          </p>
          <ThemedInput
            placeholder={"Smith"}
            type={"text"}
            index={"lastname"}
            step={step}
            fill={"family-name"}
            error={errors.includes("lastname")}
          />
        </div>
      </div>
      <div className="grid-flow-small">
        <div className="flex-flow-small">
          <ThemedButton
            aria-label="Next step button"
            color={"yellow"}
            variant={"themed"}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) + 1)}
          >
            Next Step
          </ThemedButton>
        </div>
        <p className="text-light">
          Already have an account?
          <span
            className="text-bold text-blue clickable"
            onClick={handleNavigate}
          >
            &nbsp;Login here
          </span>
        </p>
        <p className="text-light">
          View our:
          <span className="text-bold text-blue clickable">
            &nbsp;Privacy Policy
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
  const errors = useInputContext()[2] ?? [];
  const isSchoolEmailBad =
    errors.includes("schoolemail") ||
    (values[1].schoolemail.length > 0 &&
      !isInputValid(values[1].schoolemail, "schoolemail"));
  const isGraduationYearBad =
    errors.includes("graduationyear") ||
    (values[1].graduationyear.length > 0 &&
      !isInputValid(values[1].graduationyear, "graduationyear"));

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="flow-large" style={{ display: active ? null : "none" }}>
      <div>
        <h2 className="text-normal">Signup</h2>
        <p className="text-light text-warning">
          Required <span className="text-bold">*</span>
        </p>
      </div>
      <div className="grid-flow-large">
        <div className="grid-flow-small">
          <div className="flex-space-between text-bold">
            <p>School Email</p>
            <p
              className="text-warning"
              style={{ opacity: isSchoolEmailBad ? 1 : 0 }}
            >
              Invalid UCSC email
            </p>
          </div>
          <ThemedInput
            placeholder={"bobsmith@ucsc.edu"}
            type={"text"}
            index={"schoolemail"}
            step={step}
            fill={"email"}
            error={isSchoolEmailBad}
          />
        </div>
        <div className="grid-flow-small">
          <div className="flex-space-between text-bold">
            <p>
              Year of Graduation <span className="text-warning">*</span>
            </p>
            <p
              className="text-warning"
              style={{ opacity: isGraduationYearBad ? 1 : 0 }}
            >
              Invalid graduation year
            </p>
          </div>
          <ThemedInput
            placeholder={"1997"}
            type={"text"}
            index={"graduationyear"}
            step={step}
            error={isGraduationYearBad}
          />
        </div>
      </div>
      <div className="grid-flow-small">
        <div className="flex-flow-large">
          <ThemedButton
            aria-label="Back step button"
            color={"yellow"}
            variant={"cancel"}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) - 1)}
          >
            Back
          </ThemedButton>
          <ThemedButton
            aria-label="Next step button"
            color={"yellow"}
            variant={"themed"}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) + 1)}
          >
            Next Step
          </ThemedButton>
        </div>
        <p className="text-light">
          Already have an account?
          <span
            className="text-bold text-blue clickable"
            onClick={handleNavigate}
          >
            &nbsp;Login here
          </span>
        </p>
        <p className="text-light">
          View our:
          <span className="text-bold text-blue clickable">
            &nbsp;Privacy Policy
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
  isCreateAccountDisabled,
}) {
  const navigate = useNavigate();
  const value = useInputContext();
  const [values] = value;
  const errors = useInputContext()[2] ?? [];
  const isUserEmailTaken = errors.includes("useremailtaken");
  const isUserEmailBad =
    errors.includes("useremail") ||
    (values[2].useremail.length > 0 &&
      !isInputValid(values[2].useremail, "useremail"));
  const isUserPasswordBad =
    errors.includes("userpassword") ||
    (values[2].userpassword.length > 0 &&
      !isInputValid(values[2].userpassword, "userpassword"));

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <Box
      className="flow-large"
      component="form"
      noValidate
      style={{ display: active ? null : "none" }}
    >
      <div>
        <h2 className="text-normal">Signup</h2>
        <p className="text-light text-warning">
          Required <span className="text-bold">*</span>
        </p>
      </div>
      <div className="grid-flow-large">
        <div className="grid-flow-small">
          <div className="flex-space-between text-bold">
            <p>
              Email <span className="text-warning">*</span>
            </p>
            <p
              className="text-warning"
              style={{ opacity: isUserEmailTaken || isUserEmailBad ? 1 : 0 }}
            >
              {isUserEmailTaken ? "Email already in use" : "Invalid email"}
            </p>
          </div>
          <ThemedInput
            placeholder={"bobsmith@gmail.com"}
            type={"text"}
            index={"useremail"}
            step={step}
            fill={"email"}
            error={isUserEmailTaken || isUserEmailBad}
          />
        </div>
        <div className="grid-flow-small">
          <div className="flex-space-between text-bold">
            <p>
              Password <span className="text-warning">*</span>
            </p>
            <p
              className="text-warning"
              style={{ opacity: isUserPasswordBad ? 1 : 0 }}
            >
              8+ Characters, 1 Capital Letter
            </p>
          </div>
          <ThemedInput
            placeholder={"8+ Characters, 1 Capital Letter"}
            type={"password"}
            index={"userpassword"}
            step={step}
            error={isUserPasswordBad}
          />
          <p class="text-bold text-warning">
            Note: Your login to Tassel currently does not use a UCSC Gold
            Password, but we will hopefully transition to this in due course.
          </p>
        </div>
      </div>
      <div className="grid-flow-small">
        <div className="flex-flow-large">
          <ThemedButton
            aria-label="Back step button"
            color={"yellow"}
            variant={"cancel"}
            value={step}
            onClick={(e) => handleNextStep(Number(e.target.value) - 1)}
          >
            Back
          </ThemedButton>
          <ThemedButton
            aria-label="Signup button"
            color={"yellow"}
            variant={"themed"}
            type={"submit"}
            onClick={(e) => {
              handleSubmit(e);
            }}
            disabled={isCreateAccountDisabled}
          >
            Create account
          </ThemedButton>
        </div>
        <p className="text-light">
          Already have an account?
          <span
            className="text-bold text-blue clickable"
            onClick={handleNavigate}
          >
            &nbsp;Login here
          </span>
        </p>
        <p className="text-light">
          View our:
          <span className="text-bold text-blue clickable">
            &nbsp;Privacy Policy
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
function SignupStepFour({
  active,
  step,
  handleResend,
  handleVerify,
  isResendingVerification,
  isVerifying,
  isVerificationCodeWrong,
}) {
  return (
    <div className="flow-large" style={{ display: active ? null : "none" }}>
      <div className="grid-flow-large text-center">
        <h2 className="text-normal">Verify your email</h2>
        <p className="text-gray text-lineheight-24">
          We just sent you an email to verify your email address. Please use the
          code in the email to activate your account.
        </p>
        <ThemedInput
          placeholder={"Verification Code"}
          type={"text"}
          index={"verifycode"}
          step={step}
          error={isVerificationCodeWrong}
        />
      </div>
      <div className="grid-flow-small grid-center text-center">
        <div className="flex-flow-small">
          <ThemedButton
            color={"yellow"}
            variant={"themed"}
            value={step}
            onClick={handleVerify}
            disabled={isVerifying}
          >
            Verify
          </ThemedButton>
        </div>
      </div>
      <p className="text-gray text-center text-lineheight-24">
        If you did not receive the email, please click the button below to
        resend another email.
      </p>
      <div className="grid-flow-small grid-center text-center">
        <div className="flex-flow-small">
          <ThemedButton
            color={isResendingVerification ? "gray" : "yellow"}
            variant={"cancel"}
            value={step}
            onClick={handleResend}
            disabled={isResendingVerification}
          >
            Resend Email
          </ThemedButton>
        </div>
        <p className="text-light">
          Need help? Contact us at
          <span className="text-bold text-blue"> tasselsupport@gmail.com</span>
        </p>
      </div>
    </div>
  );
}
