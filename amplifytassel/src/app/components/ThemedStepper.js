import React from 'react';
import {styled} from '@mui/material/styles';
import MuiPaper from '@mui/material/Paper';
import MuiStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';

const Paper = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingInline: '30px',
  height: '4em',
  borderRadius: '10px',
  filter: 'drop-shadow(0px 15px 40px rgba(192, 225, 255, 0.1))',
  color: 'var(--text-dark)',
}));

const Stepper = ({activeStep, nonLinear, children}, props) => (
  <MuiStepper
    {...props}
    nonLinear={nonLinear}
    activeStep={activeStep}
    sx={{
      'width': '100%',
      '.MuiStepLabel-labelContainer span': {
        fontFamily: 'Montserrat',
        fontSize: '0.8rem',
        fontWeight: '600',
        color: 'var(--text-dark)',
      },
      '.MuiStepIcon-text': {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fill: 'white',
      },
      '.MuiStepIcon-root.Mui-active': {
        color: 'var(--secondary-yellow-main)',
      },
      '.MuiStepIcon-root.Mui-completed': {
        color: 'var(--secondary-yellow-main)',
      },
    }}
  >
    {children}
  </MuiStepper>
);

/**
 * Modular themed stepper.
 * @param {Array} steps Array with name of steps
 * @param {Number} stepNumber Active step index
 * @param {Function} handleNextStep Handles next step
 * @param {Boolean} completedCondition Condition statement for a completed step
 * @param {Boolean} nonLinear Restrict steps to go in order or not
 * @param {String} width Set the width of the stepper - Default is 100%
 * @param {Object} signupData Only use for signup - Otherwise, ignore parameter
 * @return {JSX} React component of a stepper
 */
export default function ThemedStepper({
  steps,
  stepNumber,
  handleNextStep,
  completedCondition,
  nonLinear,
  width,
  signupData,
}) {
  const values = signupData?.values;
  const checkValues = signupData?.checkValues;

  return (
    <Paper sx={{width: width || '100%'}}>
      <Stepper nonLinear={nonLinear} activeStep={stepNumber}>
        {signupData && steps.map((label, index) => (
          <Step
            key={`step-${label}`}
            completed={
              (index < 3 && checkValues(values[index])) || stepNumber === 3
            }
          >
            {index < 3 ?
              <StepButton
                color='inherit'
                onClick={stepNumber < 3 ? () => handleNextStep(index) : null}
                disableRipple
              >
                {label}
              </StepButton> :
              <StepLabel>{label}</StepLabel>
            }
          </Step>
        ))}
        {!signupData && steps.map((label, index) => (
          <Step key={`step-${label}`} completed={completedCondition}>
            <StepButton
              color='inherit'
              onClick={() => handleNextStep(index)}
              disableRipple
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
}
