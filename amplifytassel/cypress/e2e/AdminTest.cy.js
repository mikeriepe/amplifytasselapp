// import { cy } from 'date-fns/locale';
import { selectors } from '../selectors';

beforeEach(function () {
    cy.visit('http://localhost:3000/');
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("kurira@socam.me");
    cy.get(selectors.LoginPasswordInput).type("Password");
    cy.get(selectors.LoginButton).contains('Login').click();
    cy.wait(4000);
    cy.visit('http://localhost:3000/approvals');
    cy.wait(2000);
});

describe('Verify Approvals Elements Are Present', () => {

    it('Displays Approvals Elements', () => {
        cy.get(selectors.ApprovalsTitle).contains('Approvals');
        cy.get(selectors.ApprovalsSubtitle).contains('Approve or reject accounts and opportunities');
        cy.get(selectors.ApprovalsTabs).contains('Accounts');
        cy.get(selectors.ApprovalsTabs).contains('Opportunities');
        cy.get(selectors.ApprovalsAccountActions).contains('Approve');
        cy.get(selectors.ApprovalsAccountActions).contains('Request More Info');
        cy.get(selectors.ApprovalsAccountActions).contains('Deny');
        cy.get(selectors.ApprovalsAccountActions).contains('Promote Admin');
        cy.get(selectors.ApprovalsAccountsColumnLabels).contains('Name');
        cy.get(selectors.ApprovalsAccountsColumnLabels).contains('Email');
        cy.get(selectors.ApprovalsAccountsColumnLabels).contains('Grad Yr');
        cy.get(selectors.ApprovalsAccountsColumnLabels).contains('Status');
        cy.get(selectors.ApprovalsAccountsRows).contains('Test Dummy');
        cy.get(selectors.ApprovalsAccountsRows).contains('kurira@socam.me');
        cy.get(selectors.ApprovalsAccountsRows).contains('2001');
        cy.get(selectors.ApprovalsOpportunitiesTab).click();
        cy.wait(4000);
        cy.get(selectors.ApprovalsOpportunityActions).contains('Approve');
        cy.get(selectors.ApprovalsOpportunityActions).contains('Request More Info');
        cy.get(selectors.ApprovalsOpportunityActions).contains('Deny');
        cy.get(selectors.ApprovalsOpportunitiesColumnLabels).contains('Opportunity');
        cy.get(selectors.ApprovalsOpportunitiesColumnLabels).contains('Description');
        cy.get(selectors.ApprovalsOpportunitiesColumnLabels).contains('Creator');
        cy.get(selectors.ApprovalsOpportunitiesColumnLabels).contains('Status');
        cy.get(selectors.ApprovalsOpportunitiesRows).contains('Car Crash Test');
        cy.get(selectors.ApprovalsOpportunitiesRows).contains('We need someone to floor it');
        cy.get(selectors.ApprovalsOpportunitiesRows).contains('Test Dummy');
    });
});
