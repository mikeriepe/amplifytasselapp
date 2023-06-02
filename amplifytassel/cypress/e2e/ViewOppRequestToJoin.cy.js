import { selectors } from '../selectors';

beforeEach(function () {
    cy.visit('http://localhost:3000/');
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("kurira@socam.me");
    cy.get(selectors.LoginPasswordInput).type("Password");
    cy.get(selectors.LoginButton).contains('Login').click();
    cy.wait(4000);
});

describe('Request to join as a General Participant', () => {
    it('Requests to join', () => {
        cy.visit('http://localhost:3000/Opportunity/91e4f69c-2aba-417d-94e0-db7546f4b923');
        cy.wait(2000);
        cy.get(selectors.ViewOpportunityRequest).contains('Request to Join').click();
        cy.get(selectors.RequestModalSendRequest).contains('Send Request to Join').click();
        cy.wait(4000);
        cy.visit('http://localhost:3000/opportunities');
        cy.wait(2000);
        cy.get(selectors.OpportunitiesTabPending).click();
        cy.wait(1000);
        cy.get(selectors.OpportunityCardTitle1).contains('Test Dummies Become Human');
        cy.get(selectors.OpportunityCardHost1).contains('Abdullah Kose');
        cy.wait(1000);
    });
    it('Cancels the request', () => {
        // Click on the pending Tab
        cy.get(selectors.OpportunitiesTabPending).click();
        cy.wait(1000);
        // Click on delete button
        cy.get(selectors.DeleteRequests).click();
        cy.wait(1000);
        cy.get(selectors.OpportunitiesTabBrowse).click();
        cy.wait(1000);
        cy.get(selectors.OpportunityCardTitle1).contains('Test Dummies Become Human');
        cy.get(selectors.OpportunityCardHost1).contains('Abdullah Kose');
        cy.wait(1000);
      });
});

describe('Request to join a Specific Role', () => {
    it('Requests to join', () => {
        cy.visit('http://localhost:3000/Opportunity/91e4f69c-2aba-417d-94e0-db7546f4b923');
        cy.wait(2000);
        cy.get(selectors.RoleRequest).contains('Request Specific Role').click();
        cy.get(selectors.RequestModalSendRequest).contains('Send Request to Join').click();
        cy.wait(4000);
        cy.visit('http://localhost:3000/opportunities');
        cy.wait(2000);
        cy.get(selectors.OpportunitiesTabPending).click();
        cy.wait(1000);
        cy.get(selectors.OpportunityCardTitle1).contains('Test Dummies Become Human');
        cy.get(selectors.OpportunityCardHost1).contains('Abdullah Kose');
        cy.wait(1000);
    });
    it('Cancels the request', () => {
        // Click on the pending Tab
        cy.get(selectors.OpportunitiesTabPending).click();
        cy.wait(1000);
        // Click on delete button
        cy.get(selectors.DeleteRequests).click();
        cy.wait(1000);
        cy.get(selectors.OpportunitiesTabBrowse).click();
        cy.wait(1000);
        cy.get(selectors.OpportunityCardTitle1).contains('Test Dummies Become Human');
        cy.get(selectors.OpportunityCardHost1).contains('Abdullah Kose');
        cy.wait(1000);
      });
});
