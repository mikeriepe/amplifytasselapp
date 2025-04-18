import { selectors } from '../selectors';

beforeEach(function () {
    cy.visit('http://localhost:3000/');
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("puletitreta-3930@yopmail.com");
    cy.get(selectors.LoginPasswordInput).type("Dogdogdog");
    cy.get(selectors.LoginButton).contains('Login').click();
    cy.wait(4000);
    cy.get(selectors.NavBarOpportunityButton).click();
    // cy.visit('http://localhost:3000/opportunities');
    cy.wait(2000);
});

// npx cypress run --spec "cypress/e2e/OppsFunctionality_Create_Delete.cy.js"
describe('Verify Opportunity Create/Delete Lifecycle', () => {
  it('Can create test opportunity', { scrollBehavior: false }, () => {
    cy.get(selectors.OppsCreateNewButton).click();
    cy.get(selectors.OppsFormTitle).type("Student Bike Day");
    cy.get(selectors.OppsFormDescription).type("A new age for every dummy!");
    cy.get(selectors.OppsFormLocationAddress).type("123 Dummy Street");
    cy.get(selectors.OppsFormLocationCity).type("Dummy City");
    cy.get(selectors.OppsFormLocationState).type("Dummy State");
    cy.get(selectors.OppsFormRecurringEventDropdown).parent().click();
    cy.get('li').contains('Weekly').click(); 
    cy.get(selectors.OppsFormFrequencyOptionsDropdown).parent().click();
    cy.get('li').contains('3').click(); 

    cy.get(selectors.OppsFormLocationZip).type("95222");
    cy.get(selectors.OppsFormSubject).scrollIntoView().click();
    cy.get(selectors.OppsFormSubject0).scrollIntoView().click();
    cy.get(selectors.OppsFormOtherDetail).scrollIntoView().type("Smarties not welcome!");
    cy.get(selectors.OppsFormSaveButton).scrollIntoView().click();
    cy.wait(1000);

  });

  describe('Opportunity Creation Tests', () => {
  const commonSelectors = selectors;

  it('creates Campus Clean-Up opportunity', { scrollBehavior: false }, () => {
    cy.get(commonSelectors.OppsCreateNewButton).click();
    cy.get(commonSelectors.OppsFormTitle).type('Campus Clean-Up');
    cy.get(commonSelectors.OppsFormDescription).type('Join us for a Campus Clean-Up event!');
    cy.get(commonSelectors.OppsFormLocationAddress).type('123 Dummy Street');
    cy.get(commonSelectors.OppsFormLocationCity).type('Dummy City');
    cy.get(commonSelectors.OppsFormLocationState).type('Dummy State');
    cy.get(commonSelectors.OppsFormRecurringEventDropdown).parent().click();
    cy.get('li').contains('Weekly').click();
    cy.get(commonSelectors.OppsFormFrequencyOptionsDropdown).parent().click();
    cy.get('li').contains('3').click();
    cy.get(commonSelectors.OppsFormLocationZip).type('95222');
    cy.get(commonSelectors.OppsFormSubject).scrollIntoView().click();
    cy.get(commonSelectors.OppsFormSubject0).scrollIntoView().click();
    cy.get(commonSelectors.OppsFormOtherDetail).scrollIntoView().type('Smarties not welcome!');
    cy.get(commonSelectors.OppsFormSaveButton).scrollIntoView().click();
    cy.wait(1000);
  });

  it('creates Hack the Future opportunity', { scrollBehavior: false }, () => {
    cy.get(commonSelectors.OppsCreateNewButton).click();
    cy.get(commonSelectors.OppsFormTitle).type('Hack the Future');
    cy.get(commonSelectors.OppsFormDescription).type('48-hour hackathon focused on social impact tech!');
    cy.get(commonSelectors.OppsFormLocationAddress).type('456 Code Lane');
    cy.get(commonSelectors.OppsFormLocationCity).type('Demo City');
    cy.get(commonSelectors.OppsFormLocationState).type('Demo State');
    cy.get(commonSelectors.OppsFormRecurringEventDropdown).parent().click();
    cy.get('li').contains('Weekly').click();
    cy.get(commonSelectors.OppsFormFrequencyOptionsDropdown).parent().click();
    cy.get('li').contains('3').click();
    cy.get(commonSelectors.OppsFormLocationZip).type('12345');
    cy.get(commonSelectors.OppsFormSubject).scrollIntoView().click();
    cy.get(commonSelectors.OppsFormSubject0).scrollIntoView().click();
    cy.get(commonSelectors.OppsFormOtherDetail).scrollIntoView().type('Bring your own laptop!');
    cy.get(commonSelectors.OppsFormSaveButton).scrollIntoView().click();
    cy.wait(1000);
  });

  it('creates Student Bike Day opportunity', { scrollBehavior: false }, () => {
    cy.get(commonSelectors.OppsCreateNewButton).click();
    cy.get(commonSelectors.OppsFormTitle).type('Student Bike Day');
    cy.get(commonSelectors.OppsFormDescription).type('Group ride with food, prizes, and safety workshops!');
    cy.get(commonSelectors.OppsFormLocationAddress).type('789 Cycle Blvd');
    cy.get(commonSelectors.OppsFormLocationCity).type('Testville');
    cy.get(commonSelectors.OppsFormLocationState).type('Test State');
    cy.get(commonSelectors.OppsFormRecurringEventDropdown).parent().click();
    cy.get('li').contains('Weekly').click();
    cy.get(commonSelectors.OppsFormFrequencyOptionsDropdown).parent().click();
    cy.get('li').contains('3').click();
    cy.get(commonSelectors.OppsFormLocationZip).type('67890');
    cy.get(commonSelectors.OppsFormSubject).scrollIntoView().click();
    cy.get(commonSelectors.OppsFormSubject0).scrollIntoView().click();
    cy.get(commonSelectors.OppsFormOtherDetail).scrollIntoView().type('Helmets required!');
    cy.get(commonSelectors.OppsFormSaveButton).scrollIntoView().click();
    cy.wait(1000);
  });
});


  /*
  it('Can delete test opporutnity', () => {
    cy.get(selectors.OpportunitiesTabCreated).click();
    cy.wait(1000);
    cy.get(selectors.OppsCreatedTabRedDeleteTestButton).click();
    cy.get(selectors.OppsDeleteModalDeleteButton).contains('Delete').click();
    cy.wait(1000);
  });
  */




  /*
  it('Create New Opp', { scrollBehavior: false }, () => {
    cy.get(selectors.OppsCreateNewButton).click();
    cy.get(selectors.OppsFormTitle).type("Test Dummies Unite!");
    cy.get(selectors.OppsFormDescription).type("A new age for every dummy!");
    cy.get(selectors.OppsFormLocationAddress).type("123 Dummy Street");
    cy.get(selectors.OppsFormLocationCity).type("Dummy City");
    cy.get(selectors.OppsFormLocationState).type("Dummy State");

    cy.get(selectors.OppsCreateNewButton).click(selectors.OppsFormRecurringEventDropdown);
    cy.get('li').contains('Weekly').click(); 

    cy.get(selectors.OppsCreateNewButton).click(selectors.OppsFormFrequencyOptionsDropdown);
    cy.get('li').contains('3').click(); 

    cy.get(selectors.OppsFormLocationZip).type("95222");
    cy.get(selectors.OppsFormSubject).click();
    cy.get(selectors.OppsFormSubject0).click();
    cy.get(selectors.OppsFormOtherDetail).type("Smarties not welcome!");
    cy.get(selectors.OppsFormSaveButton).click();
    cy.wait(1000);
  });

  it
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
  */


});