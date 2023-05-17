import { selectors } from '../selectors';

beforeEach(function () {
    cy.visit('http://localhost:3000/');
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("kurira@socam.me");
    cy.get(selectors.LoginPasswordInput).type("Password");
    cy.get(selectors.LoginButton).contains('Login').click();
    cy.wait(4000);
    cy.visit('http://localhost:3000/Opportunity/c03749bb-24ec-42b8-8561-a5a5caf62e9d');
    cy.wait(2000);
});

describe('Verify ViewOpportunity Elements Are Present', () => {

    it('Displays ViewOpportunity Elements', () => {
        cy.get(selectors.ViewOpportunityTitle).contains('Car Crash Test');
        cy.get(selectors.ViewOpportunityHost).contains('Hosted by: Test Dummy');
        cy.get(selectors.ViewOpportunityStartDate).contains('May 21, 2025 10:02 PM');
        cy.get(selectors.ViewOpportunityEndDate).contains('May 27, 2025 10:02 PM');
        cy.get(selectors.ViewOpportunityDuration).contains('6 Days');
        cy.get(selectors.ViewOpportunityLocationType).contains('In-person');
        cy.get(selectors.ViewOpportunityLocation).contains('3500 Deer Creek Rd Palo Alto, CA 94304');
        cy.get(selectors.ViewOpportunityMembers).contains('Test Dummy');
        cy.get(selectors.ViewOpportunityDescription).contains('We need someone to floor it into a concrete');
        cy.get(selectors.ViewOpportunityRoles).contains('Crash Test Dummy');
        cy.scrollTo('bottom');
        // cy.wait(2000);
        cy.get(selectors.ViewOpportunityKeywords).contains('STEM');
    });
});
