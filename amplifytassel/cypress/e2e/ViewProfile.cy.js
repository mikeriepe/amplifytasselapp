import { selectors } from '../selectors';

beforeEach(function () {
    cy.visit('http://localhost:3000/');
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("kurira@socam.me");
    cy.get(selectors.LoginPasswordInput).type("Password");
    cy.get(selectors.LoginButton).contains('Login').click();
    cy.wait(4000);
    cy.visit('http://localhost:3000/profile/c01acf28-952d-4489-9a77-fc0a3aa41a29');
    cy.wait(15000);
});

describe('Verify ViewProfile Elements Are Present', () => {

    it('Displays ViewProfile Elements', () => {
        cy.get(selectors.ProfileHeaderFullName).contains('Test Dummy');
        cy.get(selectors.ProfileHeaderMajors).contains('Computer Science');
        cy.get(selectors.ProfileHeaderGraduationYear).contains('Class of 2001');
        cy.get(selectors.ProfileHeaderLocation).contains('Santa Cruz, CA');
        cy.get(selectors.ProfileAbout).contains("Can't feel pain...");
        cy.get(selectors.ProfileWorkExperience).contains('Stunt Doubles Inc.');
        cy.get(selectors.ProfileVolunteerExperience).contains('Garage Sales Inc.');
        cy.scrollTo('bottom');
        cy.get(selectors.ProfileKeywords).contains('Athletics');
    });
});
