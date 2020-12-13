describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jonas Horvei',
      username: 'jonahor',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Login')
  })

  it('login form can be opened', function() {
    cy.contains('Login')
      .click()
  })

  describe('when user is logged in', function() {

    beforeEach(function() {
      cy.contains('Login')
        .click()
      cy.get('#username')
        .type('jonahor')
      cy.get('#password')
        .type('password')
      cy.get('#login')
        .click()
    })

    it('name of user is shown', function() {
      cy.contains('jonahor Succesfully logged in')
    })

    it('a new blog can be added', function() {
      cy.get('#togglable')
        .click()
      cy.get('#title')
        .type('Super cool blog')
      cy.get('#author')
        .type('Jonas Jonasen')
      cy.get('#url')
        .type('www.coolbeans.com')
      cy.get('#create')
        .click()
    })
  })


})