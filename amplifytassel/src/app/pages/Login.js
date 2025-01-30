import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InputContext } from "../components/ThemedInput";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import ThemedButton from "../components/ThemedButton";
import ThemedInput from "../components/ThemedInput";
import LoginBanner from "../assets/sammy-ocean.png";
import useAuth from "../util/AuthContext";
import "../stylesheets/LoginSignup.css";
import { Auth } from "aws-amplify";

const PaperStyling = {
  display: "flex",
  width: "1000px",
  height: "600px",
  borderRadius: "10px",
  filter: "drop-shadow(0px 15px 40px rgba(192, 225, 255, 0.1))",
  color: "#3C4047",
};

const InputLabelStyling = {
  ".MuiTypography-root": {
    fontFamily: "inherit",
    fontSize: "0.8rem",
    fontWeight: "inherit",
    color: "#8B95A5",
  },
  marginLeft: "1em",
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
 * Creates login page
 * @return {HTML} login page
 */
export default function Login() {
  const { setLoadingAuth } = useAuth();

  const [stepPage, setStepPage] = useState("login");
  const [values, setValues] = useState({
    login: {
      useremail: "",
      userpassword: "",
    },
    forgot1: {
      useremail: "",
    },
    forgot2: {
      verifycode: "",
    },
    forgot3: {
      newpassword: "",
      confirmpassword: "",
    },
    verification: {
      completesignup: "",
    },
  });

  // Tracks if the user's page contains input fields that were invalid when
  // the form was submitted. The input boxes are highlighted in red.
  const [isInputBad, setIsInputBad] = useState(false);
  useEffect(() => {
    if (stepPage !== "forgot2") setIsInputBad(false);
  }, [values, stepPage]);

  // Tracks if Amplify is running user authentication. Causes certain
  // buttons to be disabled, like 'Login' or 'Verify'
  const [isBackendLoading, setIsBackendLoading] = useState(false);
  useEffect(() => setIsBackendLoading(false), [values, stepPage]);

  // Tracks if the user clicks 'Resend Email', and the backend is
  // sending the user another verification email.
  const [isResendingVerification, setIsResendingVerification] = useState(false);

  // Tracks if the user's new password on the 'Forgot Password' page is valid.
  const [isPasswordBad, setIsPasswordBad] = useState(null);
  useEffect(() => setIsPasswordBad(null), [values, stepPage]);

  // Called when the user clicks 'Login'
  // 1) If the user's email or password is incorrect, then display an error message
  // 2) If the user's email is not verified, then redirect to the verification page
  // 3) Otherwise, the user's login is successful
  const login = async () => {
    //const keepLoggedIn = document.getElementById('keepLoggedIn').checked;
    setIsBackendLoading(true);
    Auth.signIn(values["login"].useremail, values["login"].userpassword)
      .then((user) => {
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          const { requiredAttributes } = user.challengeParam;
          console.log(user.challengeName);
          console.log(`requiredAttributes: ${requiredAttributes}`);
          Auth.completeNewPassword(
            user, // the Cognito User Object
            values["login"].userpassword
          )
            .then((user) => {
              // at this time the user is logged in if no MFA required
              console.log("new password completed!");
              console.log("login worked!");
              toast.success("Login Success", toastOptions);
            })
            .catch((e) => {
              console.error(e);
              toast.error(e, toastOptions);
            });
        } else {
          // if (keepLoggedIn) {
          //   // Store a token or session to remember the user
          //   localStorage.setItem('accessToken', user.accessToken);
          // }
          console.log("login worked!");
          // console.log(JSON.stringify(user));
          try {
            toast.success("Login Success", toastOptions);
          } catch (e) {
            console.error(e);
          }
        }
        setLoadingAuth(true);
        setIsBackendLoading(false);
      })
      .catch((error) => {
        if (error.name === "UserNotConfirmedException") {
          handleNextPage("verification");
          handleResend();
        } else {
          setIsInputBad(true);
          setIsBackendLoading(false);
          toast.error("Invalid username or password", toastOptions);
        }
      });
  };

  // Called when the user clicks 'Resend'
  // NOTE: Be sure to check your spam folder for
  // these resent verification emails.
  const handleResend = async () => {
    setIsResendingVerification(true);
    const email = values["login"].useremail;
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
        console.error("Error resending email verification", err);
        setIsResendingVerification(false);
        let errMsg = err.log ?? err.msg ?? err.name;
        if (errMsg.includes("LimitExceededException")) {
          errMsg =
            "Exceeded daily email limit for the operation or the account.";
        }
        toast.error(errMsg, toastOptions);
      });
  };

  // Called when the user clicks 'Verify'
  const navigate = useNavigate();
  const handleVerify = async () => {
    setIsBackendLoading(true);
    Auth.confirmSignUp(
      values.login.useremail,
      values.verification.completesignup
    )
      .then(() => {
        setIsBackendLoading(false);
        toast.success("Email verified!", toastOptions);
        navigate("/dashboard");
      })
      .catch((err) => {
        let errMsg = err.log ?? err.code ?? err.name;
        if (errMsg.includes("CodeMismatchException")) {
          errMsg = "Incorrect verification code";
        }
        toast.error(errMsg, toastOptions);
        setIsBackendLoading(false);
        setIsInputBad(true);
      });
  };

  // Called when the user clicks 'Change password'
  const handleConfirmChangePassword = async () => {
    const { newpassword, confirmpassword } = values.forgot3;
    const regex = /[A-Z]/;
    if (!regex.test(newpassword) || newpassword.length < 8) {
      setIsPasswordBad("8+ Characters, 1 Capital Letter");
      handleNextPage("forgot3");
      return;
    }
    if (newpassword !== confirmpassword) {
      setIsPasswordBad("Passwords do not match");
      handleNextPage("forgot3");
      return;
    }
    setIsBackendLoading(true);
    Auth.forgotPasswordSubmit(
      values.forgot1.useremail,
      values.forgot2.verifycode,
      newpassword
    )
      .then(() => {
        setIsBackendLoading(false);
        toast.success("Password reset successfully!", toastOptions);
        handleNextPage("forgot4");
      })
      .catch((err) => {
        setIsBackendLoading(false);
        setIsInputBad(true);
        handleNextPage("forgot2");
        let errMsg = err.log ?? err.code ?? err.name;
        if (err.name === "CodeMismatchException") {
          errMsg = "Incorrect verification code";
        }
        toast.error(errMsg, toastOptions);
      });
  };

  const handleNextPage = (step) => {
    setStepPage(step);
  };

  return (
    <InputContext.Provider value={[values, setValues]}>
      <Box className="page" aria-label="Login form">
        <Paper className="card" elevation={0} sx={PaperStyling}>
          <div className="card-banner flow-small padding-64">
            <h3 className="text-xbold text-white">Welcome back!</h3>
            <div className="flow-tiny">
              <img src={LoginBanner} alt="login banner" />
            </div>
          </div>
          <Box
            className="card-content padding-64"
            component="form"
            autoComplete="on"
            noValidate
          >
            <LoginForm
              active={stepPage === "login"}
              handleNextPage={(e) => handleNextPage(e)}
              login={login}
              values={values}
              isInputBad={isInputBad}
              isLoginDisabled={isBackendLoading}
            />
            <ForgotPasswordOne
              active={stepPage === "forgot1"}
              handleNextPage={(e) => handleNextPage(e)}
              values={values}
              isInputBad={isInputBad}
              setIsInputBad={setIsInputBad}
              isBackendLoading={isBackendLoading}
              setIsBackendLoading={setIsBackendLoading}
            />
            <ForgotPasswordTwo
              active={stepPage === "forgot2"}
              handleNextPage={(e) => handleNextPage(e)}
              isInputBad={isInputBad}
            />
            <ForgotPasswordThree
              active={stepPage === "forgot3"}
              handleNextPage={(e) => handleNextPage(e)}
              handleConfirmChangePassword={handleConfirmChangePassword}
              isPasswordBad={isPasswordBad}
              isBackendLoading={isBackendLoading}
            />
            <ForgotPasswordFour
              active={stepPage === "forgot4"}
              handleNextPage={(e) => handleNextPage(e)}
            />
            <Verification
              active={stepPage === "verification"}
              handleResend={handleResend}
              handleVerify={handleVerify}
              isResendingVerification={isResendingVerification}
              isVerifying={isBackendLoading}
              isInputBad={isInputBad}
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
function LoginForm({
  active,
  handleNextPage,
  login,
  isInputBad,
  isLoginDisabled,
}) {
  const [keepLoggedIn, setKeepLoggedIn] = useState(
    () => localStorage.getItem("rememberUser") === "true"
  );

  const navigate = useNavigate();

  const handleLogin = () => {
    // Store the user's preference in local storage
    localStorage.setItem("rememberUser", keepLoggedIn);

    // Perform the login
    login();
  };

  const handleNavigate = () => {
    navigate("/signup");
  };

  return (
    <div className="flow-large" style={{ display: active ? null : "none" }}>
      <div className="grid-flow-large">
        <div>
          <h2 className="text-normal">Login</h2>
          <p className="text-light text-warning">
            Required <span className="text-bold">*</span>
          </p>
        </div>
        <p className="text-gray text-lineheight-24">
          Enter your email address and password below to login to your account.
        </p>
      </div>
      <div className="grid-flow-large">
        <div className="grid-flow-small">
          <p className="text-bold">
            Email <span className="text-bold text-warning">*</span>
          </p>
          <ThemedInput
            placeholder={"bobsmith@gmail.com"}
            type={"text"}
            index={"useremail"}
            step={"login"}
            fill={"email"}
            label={"Login Email input field"}
            error={isInputBad}
          />
        </div>
        <div className="grid-flow-small">
          <p className="text-bold">
            Password <span className="text-bold text-warning">*</span>
          </p>
          <ThemedInput
            placeholder={"Your password"}
            type={"password"}
            index={"userpassword"}
            step={"login"}
            label={"Login Password input field"}
            error={isInputBad}
          />
          <p
            className="text-blue clickable"
            onClick={(e) => handleNextPage("forgot1")}
          >
            Forgot your password?
          </p>
        </div>
      </div>
      <div className="grid-flow-small">
        <div>
          <ThemedButton
            aria-label="Login button"
            color={"yellow"}
            variant={"themed"}
            type={"submit"}
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
              // login();
            }}
            disabled={isLoginDisabled}
          >
            Login
          </ThemedButton>
          <FormControlLabel
            label="Keep me logged in"
            control={
              <Checkbox
                disableRipple
                checked={keepLoggedIn}
                onChange={(e) => {
                  setKeepLoggedIn(e.target.checked);
                  localStorage.setItem(
                    "keepLoggedIn",
                    e.target.checked ? "true" : "false"
                  );
                }}
              />
            }
            sx={InputLabelStyling}
          />
        </div>
        <p className="text-light">
          Don&apos;t have an account?
          <span
            className="text-bold text-blue clickable"
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
function ForgotPasswordOne({
  active,
  handleNextPage,
  values,
  isInputBad,
  setIsInputBad,
  isBackendLoading,
  setIsBackendLoading,
}) {
  // Called when the user clicks 'Request password change'
  const handleForgotPW1 = (e) => {
    setIsBackendLoading(true);
    Auth.forgotPassword(values.forgot1.useremail)
      .then((data) => {
        // console.log(data);
        handleNextPage(e.target.value);
        setIsBackendLoading(false);
      })
      .catch((err) => {
        setIsBackendLoading(false);
        setIsInputBad(true);
        let errMsg = err.log ?? err.code ?? err.name;
        if (err.name === "UserNotFoundException") {
          errMsg = "Account with this email does not exist.";
        }
        errMsg = errMsg.replace("Username", "Email");
        toast.error(errMsg, toastOptions);
      });
  };

  return (
    <div className="flow-large" style={{ display: active ? null : "none" }}>
      <div className="grid-flow-large">
        <h2 className="text-normal">Forgot your password?</h2>
        <p className="text-gray text-lineheight-24">
          Don&apos;t worry, we can help you out! If you remember your email
          address, you can quickly reset your password. Input your email address
          and we&apos;ll send you a link to your email that will allow you to
          reset your password.
        </p>
      </div>
      <div className="grid-flow-small">
        <p className="text-bold">Email</p>
        <ThemedInput
          placeholder={"bobsmith@gmail.com"}
          type={"text"}
          index={"useremail"}
          step={"forgot1"}
          fill={"email"}
          error={isInputBad}
        />
      </div>
      <div className="grid-flow-small">
        <div className="flex-flow-large">
          <ThemedButton
            color={"yellow"}
            variant={"cancel"}
            value={"login"}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Back
          </ThemedButton>
          <ThemedButton
            color={"yellow"}
            variant={"themed"}
            value={"forgot2"}
            onClick={(e) => {
              handleForgotPW1(e);
            }}
            disabled={isBackendLoading}
          >
            Request password change
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

/**
 * Part two of changing password
 * @return {JSX}
 */
function ForgotPasswordTwo({ active, handleNextPage, isInputBad }) {
  return (
    <div className="flow-large" style={{ display: active ? null : "none" }}>
      <div className="grid-flow-large text-center">
        <h2 className="text-normal">Verify your email</h2>
        <p className="text-gray text-lineheight-24">
          We just sent you an email to verify your password change request.
          Please use the code in the email to move forward.
        </p>
        <ThemedInput
          placeholder={"Verification Code"}
          type={"text"}
          index={"verifycode"}
          step={"forgot2"}
          error={isInputBad}
        />
      </div>
      <div className="grid-flow-small grid-center text-center">
        <div className="flex-flow-small">
          <ThemedButton
            color={"yellow"}
            variant={"themed"}
            value={"forgot3"}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Next
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
function ForgotPasswordThree({
  active,
  handleNextPage,
  handleConfirmChangePassword,
  isPasswordBad,
  isBackendLoading,
}) {
  return (
    <div className="flow-large" style={{ display: active ? null : "none" }}>
      <div className="grid-flow-large">
        <h2 className="text-normal">Change your password</h2>
        <p className="text-gray text-lineheight-24">
          Enter your new password below. We strongly advise you to store it
          safely.
        </p>
      </div>
      <div className="grid-flow-large">
        <div className="grid-flow-small">
          <div className="flex-space-between text-bold">
            <p className="text-bold">New Password</p>
            <p
              className="text-warning"
              style={{
                opacity: isPasswordBad && isPasswordBad.includes("8+") ? 1 : 0,
              }}
            >
              {isPasswordBad}
            </p>
          </div>
          <ThemedInput
            placeholder={"8+ Characters, 1 Capital Letter"}
            type={"password"}
            index={"newpassword"}
            step={"forgot3"}
            error={isPasswordBad && isPasswordBad.includes("8+")}
          />
        </div>
        <div className="grid-flow-small">
          <div className="flex-space-between text-bold">
            <p className="text-bold">Confirm Password</p>
            <p
              className="text-warning"
              style={{
                opacity:
                  isPasswordBad && isPasswordBad.includes("do not match")
                    ? 1
                    : 0,
              }}
            >
              {isPasswordBad}
            </p>
          </div>
          <ThemedInput
            placeholder={"8+ Characters, 1 Capital Letter"}
            type={"password"}
            index={"confirmpassword"}
            step={"forgot3"}
            error={isPasswordBad && isPasswordBad.includes("do not match")}
          />
        </div>
      </div>
      <div className="grid-flow-small">
        <div className="flex-flow-large">
          <ThemedButton
            color={"yellow"}
            variant={"cancel"}
            value={"login"}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Cancel
          </ThemedButton>
          <ThemedButton
            color={"yellow"}
            variant={"themed"}
            value={"forgot4"}
            onClick={handleConfirmChangePassword}
            disabled={isBackendLoading}
          >
            Change password
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

/**
 * Part four of changing password
 * @return {JSX}
 */
function ForgotPasswordFour({ active, handleNextPage }) {
  return (
    <div className="flow-large" style={{ display: active ? null : "none" }}>
      <div className="grid-flow-large text-center">
        <h2 className="text-normal">Success!</h2>
        <p className="text-gray text-lineheight-24">
          We have successfully changed your password. Click the button below to
          login to your account.
        </p>
      </div>
      <div className="grid-flow-small grid-center">
        <div className="flex-flow-small">
          <ThemedButton
            color={"yellow"}
            variant={"themed"}
            value={"login"}
            onClick={(e) => handleNextPage(e.target.value)}
          >
            Login
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

function Verification({
  active,
  handleResend,
  handleVerify,
  isResendingVerification,
  isVerifying,
  isInputBad,
}) {
  return (
    <div className="flow-large" style={{ display: active ? null : "none" }}>
      <div className="grid-flow-large text-center">
        <h2 className="text-normal">Verify your email</h2>
        <p className="text-gray text-lineheight-24">
          You previously did not verify your email address. We just sent you an
          email to verify your email address. Please use the code in the email
          to activate your account.
        </p>
        <ThemedInput
          placeholder={"Verification Code"}
          type={"text"}
          index={"completesignup"}
          step={"verification"}
          error={isInputBad}
        />
      </div>
      <div className="grid-flow-small grid-center text-center">
        <div className="flex-flow-small">
          <ThemedButton
            color={"yellow"}
            variant={"themed"}
            value={"login"}
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
