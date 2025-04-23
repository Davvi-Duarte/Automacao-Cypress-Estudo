import userData from '../fixtures/users/user-data.json'

describe( "Orange HRM Tests - User E2E", () => {

    const selectorsList = {
        usernameField: "[name='username']",
        firstnameField: "[name='firstName']",
        middlenameField: "[name='middleName']",
        lastnameField: "[name='lastName']",
        passwordField: "[name='password']",
        genericInputField: ".oxd-input--active",
        loginButton: "[type='submit']",
        loginErrorMessage: ".oxd-alert",
        dashboardGrid: ".orangehrm-dashboard-grid",
        inputErrorUsernameRequire: ":nth-child(2) > .oxd-input-group > .oxd-text",
        inputErrorPasswordRequire: ":nth-child(3) > .oxd-input-group > .oxd-text",
        myInfoButtonSideBar: "[href='/web/index.php/pim/viewMyDetails']",
        employeeContentGrid: ".orangehrm-edit-employee",
        dateField: "[placeholder='yyyy-mm-dd']",
        womanRadioButton: ":nth-child(2) > :nth-child(2) > .oxd-radio-wrapper > label > .oxd-radio-input",
        maleRadioButton: ":nth-child(1) > :nth-child(2) > .oxd-radio-wrapper > label > .oxd-radio-input",
        submitButton: "[type='submit']",
    }

    it('Information update', () => {
        cy.login_sucess(userData.userSucess.username, userData.userSucess.password, selectorsList.usernameField, selectorsList.passwordField, selectorsList.loginButton, selectorsList.dashboardGrid)
        cy.get(selectorsList.myInfoButtonSideBar).click()
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
        cy.get(selectorsList.submitButton).eq(0).click()
        cy.get('body').should('contain', 'Successfully Updated')
        cy.get('.oxd-toast-close')
    })
})