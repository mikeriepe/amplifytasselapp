import { selectors } from '../selectors';

// Step 1: setup the application state
beforeEach(function() {
  cy.visit('http://localhost:3000/');
});

describe('Sign In:', () => {
  it('allows a user to signin', () => {
    // Step 2: Take an action (Sign in)
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("ulekhtsi+1@ucsc.edu");
    cy.get(selectors.LoginPasswordInput).type("Abcd1234");
    cy.get(selectors.LoginButton).contains('Login').click();

    cy.wait(4000);

    cy.visit('http://localhost:3000/dashboard');

    cy.wait(1000);

    // Step 3: Make an assertion (Check for sign-out text)
    cy.get(selectors.DashboardHeader).contains('Welcome back');
  });
})

// export const selectors = {
//   // Auth component classes
//   logInButtonOnLandingPage: '[aria-label="Login page button"]',
//   LoginEmailInput: '[aria-label="Login Email input field"]',
//   LoginPasswordInput: '[aria-label="Login Password input field"]',
//   LoginButton: '[aria-label="Login button"]',
//   DashboardNavigateStarButton: '[data-testid="StarRoundedIcon"]',
//   DashboardHeader: '[aria-label="Dashboard Header"]'
// }