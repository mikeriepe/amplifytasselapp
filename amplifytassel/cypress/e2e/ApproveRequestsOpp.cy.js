import { selectors } from '../selectors';

beforeEach(function () {
    cy.visit('http://localhost:3000/');
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("kurira@socam.me");
    cy.get(selectors.LoginPasswordInput).type("Password");
    cy.get(selectors.LoginButton).contains('Login').click();
    cy.wait(4000);
    cy.visit('http://localhost:3000/Opportunity/4116be15-bd7f-48d4-babd-8fe2f3739ae7');
    cy.wait(2000);
});

describe('Apply to Tea Time Chat Opportunity', () => {
    it('Approve Sam Codeswell', () => {
      // Go to requests tab
      cy.get(selectors.OpportunityTabRequests).click();
      cy.wait(1000);
      // Click Sam Codeswell's checkbox
      cy.get(selectors.OpportunityRequestSamCheck).click();
      cy.wait(500);
      // Click approve
      cy.get(selectors.OpportunityRequestsApprove).click();
      cy.wait(500);
    });
    it('Deny Sam Codeswell', () => {
      // Go to requests tab
      cy.get(selectors.OpportunityTabRequests).click();
      cy.wait(1000);
      // Click Sam Codeswell's checkbox
      cy.get(selectors.OpportunityRequestSamCheck).click();
      cy.wait(500);
      // Click approve
      cy.get(selectors.OpportunityRequestsDeny).click();
      cy.wait(500);
    });
});
