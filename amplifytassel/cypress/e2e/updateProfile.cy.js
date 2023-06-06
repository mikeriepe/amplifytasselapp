import { selectors } from '../selectors';

beforeEach(function () {
    cy.visit('http://localhost:3000/');
    cy.get(selectors.logInButtonOnLandingPage).contains('Login').click();
    cy.get(selectors.LoginEmailInput).type("kurira@socam.me");
    cy.get(selectors.LoginPasswordInput).type("Password");
    cy.get(selectors.LoginButton).contains('Login').click();
    cy.wait(4000);
    cy.visit('http://localhost:3000/myprofile');
    cy.wait(4000);
    cy.visit('http://localhost:3000/updateprofile');
    cy.wait(4000);
});

describe('Verify updateProfile Elements Are Present', () => {
    it('Displays updateProfile Elements', () => {
        cy.get(selectors.UpdateProfileGradYear);
        cy.get(selectors.UpdateProfileMajor);
        cy.get(selectors.UpdateProfileLocation);
        cy.get(selectors.UpdateProfileAbout);
        cy.get(selectors.UpdateProfileWorkExperience);
        cy.get(selectors.UpdateProfileVolunteerExperience);
        cy.get(selectors.UpdateProfileInterests);
        cy.get(selectors.UpdateProfileRemoveWorkExperience).click();
        cy.get(selectors.WorkExperienceDeleteModalCancelButton).click();
        cy.get(selectors.UpdateProfileAddWorkExperience).click();
        cy.get(selectors.WorkExperienceFormCancelButton).click();
        cy.get(selectors.UpdateProfileWorkExperienceEditButton).click();
        cy.get(selectors.WorkExperienceEditModalCancelButton).click();
        cy.get(selectors.UpdateProfileRemoveVolunteerExperience).click();
        cy.get(selectors.VolunteerExperienceDeleteModalCancelButton).click();
        cy.get(selectors.UpdateProfileAddVolunteerExperience).click();
        cy.get(selectors.VolunteerExperienceFormCancelButton).click();
        cy.scrollTo('bottom');
        cy.get(selectors.UpdateProfileAthleticsChip).within(() => {
            cy.get('.MuiChip-deleteIcon').click();
        });
        cy.get(selectors.UpdateProfileAthleticsChip2).click();
    });
});
