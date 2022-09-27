describe('Burrito Builder', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      fixture: 'burritoData'
    })
    cy.visit('http://localhost:3000/?name=&pico+de+gallo=')
  })
  it('should have a header', () => {
    cy.contains('Burrito Builder')
  })
  it('should have 3 orders displayed on page load', () => {
    cy.get('.order').should('have.length', 3)
      .get('.order').first().should('have.class', 'order').contains('Pat')
      .get('.order').last().should('have.class', 'order').contains('Alex')
  })
  it('should have a form to make a burrito order', () => {
    cy.get('.burrito-form').should('be.visible')
  })
  it('should allow user to fill out name', () => {
    cy.get('input[type="text"]').first().type('Shauna').should('have.value', 'Shauna')
  })
  it('should give message if no ingredients have been selected', () => {
    cy.get('.order-display').contains('Nothing selected')
  })
  it('should show an error message if name and/or ingredient is not checked', () => {
    cy.get('.order-name').type('Shauna')
      .get('.submit-button').click()
      .get('.order-incomplete').contains('Your order is incomplete. Please be sure your name and at least one ingredient has been selected')
  })
  it('should allow user to click on ingredients and see them on the page', () => {
    cy.get('#carnitas').click()
      .get('#beans').click()
      .get('.order-display').contains('Order: carnitas, beans')
  })
it('should allow user to submit order if name and ingredient(s) have been filled out/selected', () => {
  cy.intercept("POST", 'http://localhost:3001/api/v1/orders', { fixture: 'newOrder'})
  cy.get('.order-name').type('Shauna')
    .get('#carnitas').click()
    .get('#beans').click()
    .get('#guacamole').click()
    .get('.order-display').contains('Order: carnitas, beans, guacamole')
    .get('.submit-button').click()

  cy.get('.order').should('have.length', 4)
    .get('.order').first().should('have.class', 'order').contains('Pat')
    .get('.order').last().should('have.class', 'order').contains('Shauna')
})
})