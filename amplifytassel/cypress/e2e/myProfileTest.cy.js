import { selectors } from '../selectors';

beforeEach(function () {
    cy.visit('http://localhost:3000/');
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("kurira@socam.me");
    cy.get(selectors.LoginPasswordInput).type("Password");
    cy.get(selectors.LoginButton).contains('Login').click();
    cy.wait(4000);
    cy.visit('http://localhost:3000/myProfile');
    cy.wait(2000);
});

describe('Verify myProfile Elements Are Present', () => {

    it('Displays Profile Elements', () => {
        // cy.get(selectors.ProfileAlertPending).contains('Your account is pending approval');
        cy.get(selectors.ProfileHeaderFullName).contains('Test Dummy');
        // cy.scrollTo(0, 500);
        cy.get(selectors.ProfileHeaderMajors).contains('Computer Science');
        cy.get(selectors.ProfileHeaderGraduationYear).contains('Class of 2001');
        cy.get(selectors.ProfileHeaderLocation).contains('Santa Cruz, CA');
        cy.get(selectors.ProfileAbout).contains("Can't feel pain...");
        cy.get(selectors.ProfileWorkExperience).contains('Stunt Doubles Inc.');
        // cy.scrollTo('bottom');
        cy.get(selectors.ProfileVolunteerExperience).contains('Garage Sales Inc.');
        cy.get(selectors.ProfileKeywords).contains('Athletics');
        cy.get(selectors.ProfileDeactivateAccount).contains('Deactivate Account');
    });
});
