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

describe('Verify Opportunity Create/Delete Lifecycle', () => {
  it('Create New Opp', () => {
    cy.get(selectors.OppsCreateNewButton).click();
    cy.get(selectors.OppsFormTitle).type("Test Dummies Unite!");
    cy.get(selectors.OppsFormDescription).type("A new age for every dummy!");
    cy.get(selectors.OppsFormLocationAddress).type("123 Dummy Street");
    cy.get(selectors.OppsFormLocationCity).type("Dummy City");
    cy.get(selectors.OppsFormLocationState).type("Dummy State");
    cy.get(selectors.OppsFormLocationZip).type("95222");
    cy.get(selectors.OppsFormSubject).click();
    cy.get(selectors.OppsFormSubject0).click();
    cy.get(selectors.OppsFormOtherDetail).type("Smarties not welcome!");
    cy.get(selectors.OppsFormSaveButton).click();
    cy.wait(1000);
  });

  it('Delete the new opp just created', () => {
    cy.get(selectors.OpportunitiesTabCreated).click();
    cy.wait(1000);
    cy.get(selectors.OppsCreatedTabRedDeleteTestButton).click();
    cy.get(selectors.OppsDeleteModalDeleteButton).contains('Delete').click();
    cy.wait(1000);
  });

  it('Verify opp has been deleted', () => {
    cy.get(selectors.OpportunitiesTabCreated).click();
    cy.wait(1000);
    cy.get(selectors.OppsCreatedTabRedDeleteTestButton).should('not.exist');
  });


});