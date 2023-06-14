describe('Positive Case', () => {
  var username = 'standard_user';
  var password = 'secret_sauce';
  var classUsername = '[data-test="username"]';
  var classPassword = '[data-test="password"]';
  var classBtnLogin = '[data-test="login-button"]';


  beforeEach(()=>{
    cy.visit('https://www.saucedemo.com/');
  })
  it('Halaman login tersedia', () => {
    cy.get(classUsername).should('exist');
    cy.get(classPassword).should('exist');
    cy.get(classBtnLogin).should('exist');
    cy.log("Halaman Login tersedia - OK");
  })
  it('Login berhasil sebagai standard_user', () => {
    cy.get(classUsername).type(username);
    cy.get(classPassword).type(password);
    cy.get(classBtnLogin).click();
    cy.url().should('include', '/inventory.html');
    cy.get('.app_logo').contains('Swag Labs');
    cy.log("Login berhasil sebagai standard_user - OK");
  })
  it('Berhasil checkout item', () => {
    var classNamaBarang = '.inventory_item_name';

    cy.get(classUsername).type(username);
    cy.get(classPassword).type(password);
    cy.get(classBtnLogin).click();
    cy.url().should('include', '/inventory.html');
    cy.get('.app_logo').contains('Swag Labs');

    //Menambahkan item backpack kedalam cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_link').click();

    //Mengecek isi cart
    cy.url().should('include', '/cart.html');
    cy.contains('Your Cart');
    cy.get('.cart_quantity').should('have.text', '1');
    cy.get(classNamaBarang).should('have.text', 'Sauce Labs Backpack');
    cy.get('[data-test="checkout"]').click();

    //Mengisi form Checkout
    cy.url().should('include', '/checkout-step-one.html');
    cy.contains('Checkout: Your Information');
    cy.get('[data-test="firstName"]').type('Rizky');
    cy.get('[data-test="lastName"]').type('Febdriasyah Lexsi');
    cy.get('[data-test="postalCode"]').type('15324');
    cy.get('[data-test="continue"]').click();

    //Overview Page
    cy.url().should('include', '/checkout-step-two.html');
    cy.contains('Checkout: Overview');
    cy.get(classNamaBarang).should('have.text', 'Sauce Labs Backpack');
    cy.get('.summary_subtotal_label').invoke('text').then((text)=>{
      const number = parseFloat(text.match(/\d+\.\d+/)[0]);
      cy.get('.summary_tax_label').invoke('text').then((text2)=>{
        const number2 = parseFloat(text2.match(/\d+\.\d+/)[0]);
        var total = number + number2;
        cy.contains('Total: $' + total);
        cy.get('[data-test="finish"]').click();
      })
    })

    //Berhasil Order
    cy.url().should('include', '/checkout-complete.html');
    cy.contains('Checkout: Complete!');
    cy.contains('Thank you for your order!');
    cy.get('[data-test="back-to-products"]').click();
    cy.log("Berhasil checkout item - OK");

    //log out
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
  })
})