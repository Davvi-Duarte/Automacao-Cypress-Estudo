import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js';
import MenuPage from '../pages/menuPage.js';
import MyInfoPage from '../pages/myInfoPage.js';

const Chance = require('chance')
//test

const chance = new Chance()
const loginPageObj = new LoginPage()
const dashboardPageObj = new DashboardPage()
const menuPageObj = new MenuPage()
const myInfoPageObj = new MyInfoPage()

describe( "User Orange HRM Tests - E2E", () => {

    it('Information update', () => {
        loginPageObj.accessLoginPage()
        loginPageObj.loginWithAnyUser(userData.userSucess.username, userData.userSucess.password)
        dashboardPageObj.checkDashboardPage()
        menuPageObj.AcessMyInfo()
        myInfoPageObj.checkEmployeeGrid()
        myInfoPageObj.fillPersonalDetails(chance.first(), chance.last(), chance.last())
        myInfoPageObj.fillEmployeeDetails(chance.cpf(),chance.integer(),chance.integer(),chance.birthday(),chance.date(), chance.string())
        myInfoPageObj.saveForm()
    })  
})