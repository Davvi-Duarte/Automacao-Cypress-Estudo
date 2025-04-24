class LoginPage {
    selectorsList () {
        return{
            usernameField: "[name='username']",
            passwordField: "[name='password']",
            loginButton: "[type='submit']",
            loginErrorMessage: ".oxd-alert",
            dashboardGrid: ".orangehrm-dashboard-grid",
            inputErrorUsernameRequire: ":nth-child(2) > .oxd-input-group > .oxd-text",
            inputErrorPasswordRequire: ":nth-child(3) > .oxd-input-group > .oxd-text"
        }
    
      }
}