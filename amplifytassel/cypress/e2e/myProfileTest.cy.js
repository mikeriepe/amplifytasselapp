import { selectors } from '../selectors';


describe('Verify myProfile Elements Are Present', () => {
    beforeEach(function () {
        cy.visit('http://localhost:3000/');
        cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
        cy.get(selectors.LoginEmailInput).type("2001cnote@gmail.com");
        cy.get(selectors.LoginPasswordInput).type("Password");
        cy.get(selectors.LoginButton).contains('Login').click();
        cy.wait(4000);
        cy.visit('http://localhost:3000/myProfile');
    });

    it('displays full name of user', () => {
        cy.get(selectors.ProfileHeaderFullName).contains('Collin McColl');
    });
});
