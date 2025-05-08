class MenuPage {
    selectorsList(){
        const selectors = {
            myInfoButtonSideBar: "[href='/web/index.php/pim/viewMyDetails']",
        }
        return selectors
    }

    AcessMyInfo () {
        cy.get(this.selectorsList().myInfoButtonSideBar).click()
    }
}

export default MenuPage