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

describe('Verify page loads', () => {
    it('Displays the title', () => {
        cy.get(selectors.OpportunitiesPageHeader).contains('Opportunities');
        cy.get(selectors.OpportunitiesPageHeader).contains('View and join opportunities');
    });
    it('Displays the create opportunity button', () => {
      cy.get(selectors.OpportunitiesCreateOpportunity).contains('Create New Opportunity');
    });
    it('Displays the tabs', () => {
      cy.get(selectors.OpportunitiesTabUpcoming).contains('Upcoming');
      cy.get(selectors.OpportunitiesTabCreated).contains('Created');
      cy.get(selectors.OpportunitiesTabPending).contains('Pending');
      cy.get(selectors.OpportunitiesTabCompleted).contains('Completed');
      cy.get(selectors.OpportunitiesTabBrowse).contains('Browse');
    });
});

describe('Verify opportunities load', () => {
  it('Displays the upcoming opportunities', () => {
    cy.get(selectors.OpportunityCardTitle1).contains('Test Dummies Become Human');
    cy.get(selectors.OpportunityCardHost1).contains('Abdullah Kose');
  });
  it('Displays the created opportunities', () => {
    // Click on the Created tab
    cy.get(selectors.OpportunitiesTabCreated).click();
    cy.wait(1000);
    cy.get(selectors.OpportunityCardTitle2).contains('Natural Living');
    cy.get(selectors.OpportunityCardHost2).contains('Test Dummy');
  });
  it('Displays the pending opportunities', () => {
    // Click on the Pending tab
    cy.get(selectors.OpportunitiesTabPending).click();
    cy.wait(1000);
    cy.get(selectors.OpportunityCardTitle3).contains('Haircut Popup');
    cy.get(selectors.OpportunityCardHost3).contains('Jimmy Neutron');
  });
  it('Displays the completed opportunities', () => {
    // Click on the Completed tab
    cy.get(selectors.OpportunitiesTabCompleted).click();
    cy.wait(1000);
    cy.get(selectors.OpportunityCardTitle4).contains('Graduation Party');
    cy.get(selectors.OpportunityCardHost4).contains('Abdullah Kose');
  });
  it('Displays browse opportunities', () => {
    // Click on the Browse tab
    cy.get(selectors.OpportunitiesTabBrowse).click();
    cy.wait(1000);
    cy.get(selectors.OpportunityCardTitle5).contains('Tea Time Chat');
    cy.get(selectors.OpportunityCardHost5).contains('Jimmy Neutron');
  });
});
