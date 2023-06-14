describe('Negative Case', () => {
    var classUsername = '[data-test="username"]';
    var classPassword = '[data-test="password"]';
    var classBtnLogin = '[data-test="login-button"]';

    beforeEach(()=>{
        cy.visit('https://www.saucedemo.com/');
    })
    it('a. Input wrong password', () => {
      var arrUsername = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user'];
  
      for(var i = 0; i < 4; i++){
        cy.get(classUsername).type(arrUsername[i]);
        cy.get(classPassword).type('123');
        cy.get(classBtnLogin).click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
        cy.get(classUsername).clear();
        cy.get(classPassword).clear();
      }
    })

    it('b. Input wrong username', () => {
        cy.get(classUsername).type('Testing username');
        cy.get(classPassword).type('secret_sauce');
        cy.get(classBtnLogin).click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    })
  })