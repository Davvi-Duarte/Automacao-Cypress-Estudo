class MyInfoPage {
    selectorsList(){
        const selectors = {
            firstnameField: "[name='firstName']",
            middlenameField: "[name='middleName']",
            lastnameField: "[name='lastName']",
            genericInputField: ".oxd-input--active",
            employeeContentGrid: ".orangehrm-edit-employee-content",
            dateField: "[placeholder='yyyy-mm-dd']",
            womanRadioButton: ":nth-child(2) > :nth-child(2) > .oxd-radio-wrapper > label > .oxd-radio-input",
            maleRadioButton: ":nth-child(1) > :nth-child(2) > .oxd-radio-wrapper > label > .oxd-radio-input",
            submitButton: "[type='submit']",
            genericComboBox: ".oxd-select-text--arrow",
            itemComboBox2: ".oxd-select-dropdown > :nth-child(2)",
            itemComboBox15: ".oxd-select-dropdown > :nth-child(15)",
            generiCloseButtonDateField: ".--close",
            saveUpdatesToast: ".oxd-toast-close"
        }
        return selectors
    }

    checkEmployeeGrid (){
        cy.get(this.selectorsList().employeeContentGrid).should('be.visible')
    }

    fillPersonalDetails (firstName, middleName, lastName) {
        cy.get(this.selectorsList().firstnameField).clear().type(firstName)
        cy.get(this.selectorsList().middlenameField).clear().type(middleName)
        cy.get(this.selectorsList().lastnameField).clear().type(lastName)
    }

    fillEmployeeDetails (employeeid, otherid, DLnumber, licenseExpire, birthday, testField) {
        cy.get(this.selectorsList().genericInputField).eq(3).clear().type(employeeid) 
        cy.get(this.selectorsList().genericInputField).eq(4).clear().type(otherid) 
        cy.get(this.selectorsList().genericInputField).eq(5).clear().type(DLnumber) 
        cy.get(this.selectorsList().genericInputField).eq(6).clear().type(licenseExpire)
        cy.get(this.selectorsList().generiCloseButtonDateField).click()
        cy.get(this.selectorsList().genericInputField).eq(7).clear().type(birthday) //Birthday
        cy.get(this.selectorsList().generiCloseButtonDateField).click()
        cy.get(this.selectorsList().genericInputField).eq(8).clear().type(testField) //testField
        cy.get(this.selectorsList().womanRadioButton).click()
        cy.get(this.selectorsList().genericComboBox).eq(0).click({force: true}) //Nationality        
        cy.get(this.selectorsList().itemComboBox15).click() //Bahraini
        cy.get(this.selectorsList().genericComboBox).eq(1).click({force: true}) //Maritial Status
        cy.get(this.selectorsList().itemComboBox2).click() // Single
    }
    
    saveForm(){
        cy.get(this.selectorsList().submitButton).eq(0).click({force: true})
        cy.get('body').should('contain', 'Successfully Updated')
        cy.get(this.selectorsList().saveUpdatesToast)
    }
  
}
export default MyInfoPage