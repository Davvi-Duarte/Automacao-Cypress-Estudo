describe('Orange HRM Tests', () => {
  it('Login - Sucess', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("[name='username']").type('Admin')
    cy.get("[name='password']").type('admin123')
    cy.get("[type='submit']").click()
    cy.location('pathname').should('equals','/web/index.php/dashboard/index')
    cy.get('.oxd-topbar-header-breadcrumb-module').contains('Dashboard')
  })

  it('Login - Fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("[name='username']").type('Admina')
    cy.get("[name='password']").type('admin123a')
    cy.get("[type='submit']").click()
    cy.get('.oxd-alert')
    cy.location('pathname').should('equals','/web/index.php/auth/login')
  })

})