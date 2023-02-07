describe('Professional', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/#/login');

    cy.login({
      username: 'admin',
      password: 'admin',
    });
  });

  describe('create form', () => {
    beforeEach(() => {
      cy.get('.MuiList-root')
        .get('[role="menu"]')
        .contains('Professionals')
        .click();

      cy.url().should('include', '/professionals');

      cy.getBySel('AddIcon').click();

      cy.url().should('include', '/professionals/create');
    });

    describe('should success with', () => {
      it('valid values', () => {
        cy.fixture('professional').then((professional) => {
          cy.getBySel('firstName')
            .should('be.visible')
            .type(professional.firstName);
          cy.getBySel('lastName')
            .should('be.visible')
            .type(professional.lastName);
          cy.getBySel('headline')
            .should('be.visible')
            .type(professional.headline);
          cy.getBySel('allocated').click();
          cy.getBySel('email').should('be.visible').type(professional.email);
          cy.getBySel('english')
            .should('be.visible')
            .type(professional.english);
          cy.getBySel('about').should('be.visible').type(professional.about);

          cy.getBySel('SaveIcon').click();

          cy.get('[role="alert"]')
            .should('be.visible')
            .should(
              'contain.text',
              `Professional ${professional.firstName} ${professional.lastName} saved!`,
            );

          cy.getBySel('professionalBox').should('be.visible');

          cy.getBySel('professionalTitle')
            .should('be.visible')
            .should(
              'contain',
              `${professional.firstName} ${professional.lastName}`,
            )
            .should('contain', professional.headline);

          cy.getBySel('professionalAbout')
            .should('be.visible')
            .should('contain', professional.about);
        });
      });
    });

    describe('should display an error with', () => {
      it('empty values', () => {
        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .contains('error', { matchCase: false })
          .should('be.visible');
      });

      it('invalid firstName', () => {
        cy.getBySel('firstName').should('be.visible').type('10');

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .contains('error', { matchCase: false })
          .should('be.visible');
      });

      it('invalid lastName', () => {
        cy.getBySel('lastName').should('be.visible').type('10');

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .contains('error', { matchCase: false })
          .should('be.visible');
      });

      it('invalid email', () => {
        cy.getBySel('email').should('be.visible').type('invalid email');

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .contains('error', { matchCase: false })
          .should('be.visible');
      });
    });
  });

  describe('update form', () => {
    const updatedFields = {
      firstName: 'updatedFirstName',
      lastName: 'updatedLastName',
      email: 'updated@email.com',
      english: '1',
      about: 'Updated about',
      headline: 'Updated headline',
    };

    const invalidFields = {
      firstName: '00',
      lastName: '00',
      email: 'invalid email',
    };

    beforeEach(() => {
      cy.get('.MuiList-root').contains('Professionals').click();

      cy.url().should('include', '/professionals');

      cy.get('tbody > tr').first().click();

      cy.getBySel('EditIcon').should('be.visible').click();
    });

    describe('should success when updating', () => {
      it('firstName', () => {
        cy.getBySel('firstName')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(updatedFields.firstName);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .should('be.visible')
          .should('contain', updatedFields.firstName);

        cy.getBySel('professionalBox').should('be.visible');
        cy.url().should('include', '/professionals');

        cy.getBySel('professionalTitle')
          .should('be.visible')
          .should('contain', updatedFields.firstName);
      });

      it('lastName', () => {
        cy.getBySel('lastName')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(updatedFields.lastName);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .should('be.visible')
          .should('contain', updatedFields.lastName);

        cy.getBySel('professionalBox').should('be.visible');
        cy.url().should('include', '/professionals');

        cy.getBySel('professionalTitle')
          .should('be.visible')
          .should('contain', updatedFields.lastName);
      });

      it('headline', () => {
        cy.getBySel('headline')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(updatedFields.headline);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]').should('be.visible');

        cy.getBySel('professionalBox').should('be.visible');
        cy.url().should('include', '/professionals');

        cy.getBySel('professionalTitle')
          .should('be.visible')
          .should('contain', updatedFields.headline);
      });

      it('allocated status', () => {
        cy.getBySel('allocated').click();

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]').should('be.visible');

        cy.getBySel('professionalBox').should('be.visible');
        cy.url().should('include', '/professionals');
      });

      it('email', () => {
        cy.getBySel('email')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(updatedFields.email);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]').should('be.visible');

        cy.getBySel('professionalBox').should('be.visible');
        cy.url().should('include', '/professionals');
      });

      it('english', () => {
        cy.getBySel('english')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(updatedFields.english);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]').should('be.visible');

        cy.getBySel('professionalBox').should('be.visible');
        cy.url().should('include', '/professionals');
      });

      it('about', () => {
        cy.getBySel('about')
          .should('be.visible')
          .find('textarea')
          .first()
          .clear({ force: true })
          .type(updatedFields.about);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]').should('be.visible');

        cy.getBySel('professionalBox').should('be.visible');
        cy.url().should('include', '/professionals');

        cy.getBySel('professionalAbout')
          .should('be.visible')
          .should('contain', updatedFields.about);
      });
    });

    describe('should display an error with', () => {
      it('empty values', () => {
        cy.getBySel('firstName')
          .should('be.visible')
          .find('input')
          .clear({ force: true });

        cy.getBySel('lastName')
          .should('be.visible')
          .find('input')
          .clear({ force: true });

        cy.getBySel('headline')
          .should('be.visible')
          .find('input')
          .clear({ force: true });

        cy.getBySel('email')
          .should('be.visible')
          .find('input')
          .clear({ force: true });

        cy.getBySel('english')
          .should('be.visible')
          .find('input')
          .clear({ force: true });

        cy.getBySel('about')
          .should('be.visible')
          .find('textarea')
          .first()
          .clear({ force: true });

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .contains('error', { matchCase: false })
          .should('be.visible');
      });

      it('invalid firstName', () => {
        cy.getBySel('firstName')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(invalidFields.firstName);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .contains('error', { matchCase: false })
          .should('be.visible');
      });

      it('invalid lastName', () => {
        cy.getBySel('lastName')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(invalidFields.lastName);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .contains('error', { matchCase: false })
          .should('be.visible');
      });

      it('invalid email', () => {
        cy.getBySel('email')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(invalidFields.email);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .contains('error', { matchCase: false })
          .should('be.visible');
      });
    });
  });
});
