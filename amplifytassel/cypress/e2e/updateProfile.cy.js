import { selectors } from '../selectors';

beforeEach(function () {
    cy.visit('http://localhost:3000/');
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("kurira@socam.me");
    cy.get(selectors.LoginPasswordInput).type("Password");
    cy.get(selectors.LoginButton).contains('Login').click();
    cy.wait(4000);
    cy.visit('http://localhost:3000/updateProfile');
    cy.wait(2000);
});

describe('Verify updateProfile Elements Are Present', () => {

    it('Displays updateProfile Elements', () => {
        cy.get('[aria-label="Update Profile Grad Year"]');
        cy.get('[aria-label="Update Profile Major"]');
        cy.get('[aria-label="Update Profile Location"]');
        cy.get('[aria-label="Update Profile About"]');
        cy.get('[aria-label="Update Profile Work Experience"]');
        cy.get('[aria-label="Update Profile Volunteer Experience"]');
        cy.get('[aria-label="Update Profile Interests"]');
    });
});
