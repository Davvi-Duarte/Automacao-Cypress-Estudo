import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js';

const loginPageObj = new LoginPage();
const dashboardPageObj = new DashboardPage();


describe( "Login Orange HRM Tests - E2E", () => {

    it('Login - Sucess', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userSucess.username, userData.userSucess.password)
        dashboardPageObj.checkDashboardPage()
    })

    it('Login - Space added to end in username (Fail)', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userSucess.username + ' ', userData.userSucess.password)
        loginPageObj.checkAcessInvalid()
    })

    it('Login - Fail (invalid username and password)', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userFail.username, userData.userFail.password)
        loginPageObj.checkAcessInvalid()
    })

    it('Login - Fail (invalid username)', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userFail.username, userData.userSucess.password)
        loginPageObj.checkAcessInvalid()
    })
    
    it('Login - Fail (invalid password)', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userSucess.username, userData.userFail.password)
        loginPageObj.checkAcessInvalid()
    })

    it('Login - Fail (empty username and password fields)', () => {
      loginPageObj.accessLoginPage()
      cy.get(loginPageObj.selectorsList().loginButton).click()
      cy.get(loginPageObj.selectorsList().inputErrorUsernameRequire).should('be.visible')
      cy.get(loginPageObj.selectorsList().inputErrorPasswordRequire).should('be.visible')
      cy.location('pathname').should('equals','/web/index.php/auth/login')
    })
})