import { selectors } from '../selectors';

beforeEach(function () {
    cy.visit('http://localhost:3000/');
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("kurira@socam.me");
    cy.get(selectors.LoginPasswordInput).type("Password");
    cy.get(selectors.LoginButton).contains('Login').click();
    cy.wait(4000);
    cy.visit('http://localhost:3000/opportunities');
    cy.wait(2000);
});

describe('Apply to Tea Time Chat Opportunity', () => {
    it('Applies to the Opportunity', () => {
      cy.wait(1000);
      cy.get(selectors.OpportunitiesTabBrowse).click();
      cy.wait(1000);
      cy.get(selectors.OpportunityCardApplyTeaTime).click();
      cy.wait(1000);
      // Click send on the modal
      cy.get(selectors.RequestModalSendRequest).click();
      cy.wait(1000);
      // Go to pending tab and check if the opportunity exists
      cy.visit('http://localhost:3000/opportunities');
      cy.wait(2000);
      cy.get(selectors.OpportunitiesTabPending).click();
      cy.wait(1000);
      cy.get(selectors.OpportunityCardTitle5).contains('Tea Time Chat');
      cy.get(selectors.OpportunityCardHost5).contains('Jimmy Neutron');
    });
    it('Cancels the request', () => {
      // Click on the pending Tab
      cy.get(selectors.OpportunitiesTabPending).click();
      cy.wait(1000);
      // Click on delete button
      cy.get(selectors.OpportunityCardDeleteTeaTime).click();
      cy.wait(1000);
      cy.get(selectors.OpportunitiesTabBrowse).click();
      cy.wait(1000);
      cy.get(selectors.OpportunityCardTitle5).contains('Tea Time Chat');
      cy.get(selectors.OpportunityCardHost5).contains('Jimmy Neutron');  
    });
});
