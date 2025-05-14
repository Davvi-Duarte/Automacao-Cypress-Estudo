class LoginPage {
    selectorsList () {
        const selectors = {
            usernameField: "[name='username']",
            passwordField: "[name='password']",
            loginButton: "[type='submit']",
            loginErrorMessage: ".oxd-alert",
            inputErrorUsernameRequire: ":nth-child(2) > .oxd-input-group > .oxd-text",
            inputErrorPasswordRequire: ":nth-child(3) > .oxd-input-group > .oxd-text"
        }
        return selectors
    }

    accessLoginPage () {
        cy.visit('/auth/login')
    }

    loginWithAnyUser(username, password) {
        cy.get(this.selectorsList().usernameField).type(username)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().loginButton).click()
    }

    checkAcessInvalid(){
        cy.get(this.selectorsList().loginErrorMessage).should('be.visible')
        cy.location('pathname').should('equals','/web/index.php/auth/login')
    }

}

export default LoginPage