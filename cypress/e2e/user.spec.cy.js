import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js';
import MenuPage from '../pages/menuPage.js';

const loginPageObj = new LoginPage();
const dashboardPageObj = new DashboardPage();
const menuPageObj = new MenuPage();

describe( "Orange HRM Tests - User E2E", () => {

    const selectorsList = {
    
        firstnameField: "[name='firstName']",
        middlenameField: "[name='middleName']",
        lastnameField: "[name='lastName']",
        genericInputField: ".oxd-input--active",
        employeeContentGrid: ".orangehrm-edit-employee",
        dateField: "[placeholder='yyyy-mm-dd']",
        womanRadioButton: ":nth-child(2) > :nth-child(2) > .oxd-radio-wrapper > label > .oxd-radio-input",
        maleRadioButton: ":nth-child(1) > :nth-child(2) > .oxd-radio-wrapper > label > .oxd-radio-input",
        submitButton: "[type='submit']",
        genericComboBox: ".oxd-select-text--arrow",
        itemComboBox2: ".oxd-select-dropdown > :nth-child(2)",
        itemComboBox15: ".oxd-select-dropdown > :nth-child(15)",
        
    }

    it('Login - Sucess', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userSucess.username, userData.userSucess.password)
        dashboardPageObj.checkDashboardPage()
    })

    it('Login - Space add to end in username (Fail)', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userSucess.username + ' ', userData.userSucess.password)
        cy.get(loginPageObj.selectorsList().loginErrorMessage).should('be.visible')
        cy.location('pathname').should('equals','/web/index.php/auth/login')
    })

    it('Login - Fail (invalid username and password)', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userFail.username, userData.userFail.password)
        cy.get(loginPageObj.selectorsList().loginErrorMessage).should('be.visible')
        cy.location('pathname').should('equals','/web/index.php/auth/login')
    })

    it('Login - Fail (invalid username)', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userFail.username, userData.userSucess.password)
        cy.get(loginPageObj.selectorsList().loginErrorMessage).should('be.visible')
        cy.location('pathname').should('equals','/web/index.php/auth/login')
    })
    
    it('Login - Fail (invalid password)', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userSucess.username, userData.userFail.password)
        cy.get(loginPageObj.selectorsList().loginErrorMessage).should('be.visible')
        cy.location('pathname').should('equals','/web/index.php/auth/login')
    })

    it('Login - Fail (empty username and password fields)', () => {
      loginPageObj.accessLoginPage()
      cy.get(loginPageObj.selectorsList().loginButton).click()
      cy.get(loginPageObj.selectorsList().inputErrorUsernameRequire).should('be.visible')
      cy.get(loginPageObj.selectorsList().inputErrorPasswordRequire).should('be.visible')
      cy.location('pathname').should('equals','/web/index.php/auth/login')
    })

    it('Information update', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userSucess.username, userData.userSucess.password)
        dashboardPageObj.checkDashboardPage()
        menuPageObj.AcessMyInfo()
        cy.get(selectorsList.employeeContentGrid).should('be.visible')
        cy.get(selectorsList.firstnameField).clear().type('Sr')
        cy.get(selectorsList.middlenameField).clear().type('Testing')
        cy.get(selectorsList.lastnameField).clear().type('Automation')
        cy.get(selectorsList.genericInputField).eq(3).clear().type('employeeid') 
        cy.get(selectorsList.genericInputField).eq(4).clear().type('otherid') 
        cy.get(selectorsList.genericInputField).eq(5).clear().type('DLnumber') 
        cy.get(selectorsList.genericInputField).eq(6).clear().type('2025-07-19')
        cy.get('.--close').click()
        cy.get(selectorsList.genericInputField).eq(7).clear().type('2025-11-30')
        cy.get('.--close').click()
        cy.get(selectorsList.genericInputField).eq(8).clear().type('Test Field')
        cy.get(selectorsList.womanRadioButton).click()
        cy.get(selectorsList.genericComboBox).eq(0).click({force: true})        
        cy.get(selectorsList.itemComboBox15).click()
        cy.get(selectorsList.genericComboBox).eq(1).click({force: true})
        cy.get(selectorsList.itemComboBox2).click()
        cy.get(selectorsList.submitButton).eq(0).click({force: true})
        cy.get('body').should('contain', 'Successfully Updated')
        cy.get('.oxd-toast-close')
        
    })  
})