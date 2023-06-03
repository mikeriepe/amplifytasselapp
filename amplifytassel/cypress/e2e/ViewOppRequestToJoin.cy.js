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
        cy.visit('http://localhost:3000/Opportunity/5ca704c0-1d6f-4624-a2e2-5ca7207ba21e');
        cy.wait(2000);
        cy.get(selectors.ViewOpportunityRequest).contains('Request to Join').click();
        cy.get(selectors.RequestModalSendRequest).contains('Send Request to Join').click();
        cy.wait(1000);
        cy.visit('http://localhost:3000/opportunities');
        cy.wait(2000);
        cy.get(selectors.OpportunitiesTabPending).click();
        cy.wait(1000);
        cy.get(selectors.OpportunityCardTitle6).contains('Banana Throwing Party');
        cy.get(selectors.OpportunityCardHost6).contains('Jimmy Neutron');
        cy.wait(1000);
    });
    it('Cancels the request', () => {
        // Click on the pending Tab
        cy.visit('http://localhost:3000/opportunities');
        cy.wait(2000);
        cy.get(selectors.OpportunitiesTabPending).click();
        //cy.scrollTo('bottom');
        // Click on delete button
        cy.get(selectors.DeleteRequests).click();
        cy.wait(1000);
        cy.get(selectors.OpportunitiesTabBrowse).click();
        cy.wait(1000);
        cy.get(selectors.OpportunityCardTitle6).contains('Banana Throwing Party');
        cy.get(selectors.OpportunityCardHost6).contains('Jimmy Neutron');
        cy.wait(1000);
      });
});

describe('Request to join a Specific Role', () => {
    it('Requests to join', () => {
        cy.visit('http://localhost:3000/Opportunity/5ca704c0-1d6f-4624-a2e2-5ca7207ba21e');
        cy.wait(2000);
        cy.scrollTo('bottom');
        cy.get(selectors.RoleRequest).click();
        cy.get(selectors.RequestModalSendRequest).contains('Send Request to Join').click();
        cy.wait(1000);
        cy.visit('http://localhost:3000/opportunities');
        cy.wait(2000);
        cy.get(selectors.OpportunitiesTabPending).click();
        cy.wait(1000);
        cy.get(selectors.OpportunityCardTitle6).contains('Banana Throwing Party');
        cy.get(selectors.OpportunityCardHost6).contains('Jimmy Neutron');
        cy.wait(1000);
    });
    it('Cancels the request', () => {
        // Click on the pending Tab
        cy.visit('http://localhost:3000/opportunities');
        cy.wait(2000);
        cy.get(selectors.OpportunitiesTabPending).click();
        cy.scrollTo('bottom');
        // Click on delete button
        cy.get(selectors.DeleteRequests).click();
        cy.wait(1000);
        cy.get(selectors.OpportunitiesTabBrowse).click();
        cy.wait(1000);
        cy.get(selectors.OpportunityCardTitle6).contains('Banana Throwing Party');
        cy.get(selectors.OpportunityCardHost6).contains('Jimmy Neutron');
        cy.wait(1000);
      });
});
