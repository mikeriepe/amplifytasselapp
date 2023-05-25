import { selectors } from '../selectors';

beforeEach(function () {
    cy.visit('http://localhost:3000/');
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("kurira@socam.me");
    cy.get(selectors.LoginPasswordInput).type("Password");
    cy.get(selectors.LoginButton).contains('Login').click();
    cy.wait(4000);
    cy.visit('http://localhost:3000/dashboard');
    cy.wait(2000);
});

describe('Verify Dashboard Elements Are Present', () => {

  it('Displays Dashboard Elements', () => {
      cy.get(selectors.DashboardHeader);
      cy.get(selectors.DashboardHeaderCount);
      cy.get(selectors.DashboardUpcoming);
      cy.get(selectors.DashboardPendingTitle);
      cy.get(selectors.DashboardPendingDropdown);
      cy.get(selectors.DashboardBrowseButton);
      cy.get(selectors.DashboardCreateButton);
  });
});
