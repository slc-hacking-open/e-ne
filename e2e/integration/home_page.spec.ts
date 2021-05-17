/// <reference types = "cypress" />

describe('Authenticator:', function () {
  // Step 1: setup the application state
  beforeEach(function () {
    cy.visit('/')
  })

  describe('Sign In:', () => {
    it('allows a user to signin', () => {
      cy.intercept('GET', 'enecards').as('getTimeline')
      // Step 2: Take an action (Sign in)
      cy.get(selectors.signInSlot)
        .find(selectors.signInUsernameInput, { includeShadowDom: true })
        .type('Cypress')
      cy.get(selectors.signInSlot)
        .find(selectors.signInPasswordInput, { includeShadowDom: true })
        .type('Cypress123')
      cy.get(selectors.signInSlot)
        .find(selectors.signInSignInButton, { includeShadowDom: true })
        .contains('サインイン')
        .click()
      // Step 3: Make an assertion (Check for sign-out text)
      cy.get('div.main-sidebar').contains('サインアウト')
      cy.wait('@getTimeline')
      cy.matchImageSnapshot('login')
    })
  })
})
export const selectors = {
  // Auth component classes
  signInSlot: '[slot="sign-in"]',
  signInUsernameInput: '[data-test="sign-in-username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
}
