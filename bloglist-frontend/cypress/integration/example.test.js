describe('Blog ', function() {
    beforeEach(function() {
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
                .type('username1234')
            cy.get('#password')
                .type('password1234')
            cy.contains('login')
                .click()
        })

        it('name of user is shown', function() {
            cy.contains('somekindofname is currently logged in')
        })

        it('a new blog can be added', function() {
            cy.contains('New form')
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