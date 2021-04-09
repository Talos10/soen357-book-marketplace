import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import AddressForm from './AddressForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

export default function AdvancedSearch() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Enter book information', 'What price do you wish to pay?', 'Enter book condition', 'Enter school and course information'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return <AddressForm />;
//       case 1:
//         return <PaymentForm />;
//       case 2:
//         return <Review />;
//       default:
//         throw new Error('Unknown step');
//     }
//   }; 

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length - 1 ? (
          <div>
            <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
            >
                Back
            </Button> 
            <Button variant="contained" color="primary">
                Search
            </Button>
          </div>
        ) : (
          <div>
              <AddressForm/>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
