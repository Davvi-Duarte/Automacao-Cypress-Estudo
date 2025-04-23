import userData from '../fixtures/users/user-data.json'

describe('Orange HRM Tests', () => {
  
  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    loginErrorMessage: ".oxd-alert",
    dashboardGrid: ".orangehrm-dashboard-grid",
    inputErrorUsernameRequire: ":nth-child(2) > .oxd-input-group > .oxd-text",
    inputErrorPasswordRequire: ":nth-child(3) > .oxd-input-group > .oxd-text",
  }

  it('Login - Sucess', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSucess.username)
    cy.get(selectorsList.passwordField).type(userData.userSucess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equals','/web/index.php/dashboard/index')
    cy.get('.oxd-topbar-header-breadcrumb-module')
  })

  it('Login - Space add to end in username (Sucess)', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSucess.username + ' ')
    cy.get(selectorsList.passwordField).type(userData.userSucess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equals','/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid)
  })

  it('Login - Fail (invalid username and password)', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.loginErrorMessage).should('be.visible')
    cy.location('pathname').should('equals','/web/index.php/auth/login')
  })

  it('Login - Fail (invalid username)', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userSucess.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.loginErrorMessage).should('be.visible')
    cy.location('pathname').should('equals','/web/index.php/auth/login')
  })
  
  it('Login - Fail (invalid password)', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSucess.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.loginErrorMessage).should('be.visible')
    cy.location('pathname').should('equals','/web/index.php/auth/login')
  })

  it('Login - Fail (empty username and password fields)', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.inputErrorUsernameRequire).should('be.visible')
    cy.get(selectorsList.inputErrorPasswordRequire).should('be.visible')
    cy.location('pathname').should('equals','/web/index.php/auth/login')
  })

})