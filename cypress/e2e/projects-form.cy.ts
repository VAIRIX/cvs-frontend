describe('Project', () => {
  const updatedFields = {
    name: 'updatedName',
    from: '2020-01-01',
    to: '2025-01-01',
    duration: 'new duration',
    description: 'updatedDescription',
  };

  beforeEach(() => {
    cy.visit('http://localhost:5173/#/login');

    cy.login({
      username: 'admin',
      password: 'admin',
    });
  });

  describe('create form', () => {
    beforeEach(() => {
      cy.get('.MuiList-root').get('[role="menu"]').contains('Projects').click();

      cy.url().should('include', '/projects');

      cy.getBySel('AddIcon').click();

      cy.url().should('include', '/projects/create');
    });

    describe('should success with', () => {
      it('valid values', () => {
        cy.fixture('project').then((project) => {
          cy.getBySel('name').should('be.visible').type(project.name);
          cy.getBySel('description')
            .should('be.visible')
            .type(project.description);
          cy.getBySel('fromDate').should('be.visible').type(project.from);
          cy.getBySel('toDate').should('be.visible').type(project.to);
          cy.getBySel('duration').should('be.visible').type(project.duration);

          cy.getBySel('SaveIcon').click();

          cy.get('[role="alert"]')
            .should('be.visible')
            .should('contain.text', `Project ${project.name} saved!`);

          cy.getBySel('projectBox')
            .should('be.visible')
            .should('contain', project.name)
            .should('contain', project.description);
        });
      });

      it('empty "to" date', () => {
        cy.fixture('project').then((project) => {
          cy.getBySel('name').should('be.visible').type(project.name);
          cy.getBySel('description')
            .should('be.visible')
            .type(project.description);
          cy.getBySel('fromDate').should('be.visible').type(project.from);
          cy.getBySel('duration').should('be.visible').type(project.duration);

          cy.getBySel('SaveIcon').click();

          cy.get('[role="alert"]')
            .should('be.visible')
            .should('contain.text', `Project ${project.name} saved!`);

          cy.getBySel('projectBox')
            .should('be.visible')
            .should('contain', project.name)
            .should('contain', project.description);
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

      it('empty name', () => {
        cy.fixture('project').then((project) => {
          cy.getBySel('description')
            .should('be.visible')
            .type(project.description);
          cy.getBySel('fromDate').should('be.visible').type(project.from);
          cy.getBySel('toDate').should('be.visible').type(project.to);
          cy.getBySel('duration').should('be.visible').type(project.duration);

          cy.getBySel('SaveIcon').click();

          cy.get('[role="alert"]')
            .contains('error', { matchCase: false })
            .should('be.visible');
        });
      });

      it('empty description', () => {
        cy.fixture('project').then((project) => {
          cy.getBySel('name').should('be.visible').type(project.name);
          cy.getBySel('fromDate').should('be.visible').type(project.from);
          cy.getBySel('toDate').should('be.visible').type(project.to);
          cy.getBySel('duration').should('be.visible').type(project.duration);

          cy.getBySel('SaveIcon').click();

          cy.get('[role="alert"]')
            .contains('error', { matchCase: false })
            .should('be.visible');
        });
      });

      it('empty duration', () => {
        cy.fixture('project').then((project) => {
          cy.getBySel('name').should('be.visible').type(project.name);
          cy.getBySel('description')
            .should('be.visible')
            .type(project.description);
          cy.getBySel('fromDate').should('be.visible').type(project.from);
          cy.getBySel('toDate').should('be.visible').type(project.to);

          cy.getBySel('SaveIcon').click();

          cy.get('[role="alert"]')
            .contains('error', { matchCase: false })
            .should('be.visible');
        });
      });

      it('empty from date', () => {
        cy.fixture('project').then((project) => {
          cy.getBySel('name').should('be.visible').type(project.name);
          cy.getBySel('description')
            .should('be.visible')
            .type(project.description);
          cy.getBySel('toDate').should('be.visible').type(project.to);
          cy.getBySel('duration').should('be.visible').type(project.duration);

          cy.getBySel('SaveIcon').click();

          cy.get('[role="alert"]')
            .contains('error', { matchCase: false })
            .should('be.visible');
        });
      });
    });
  });

  describe('update form', () => {
    beforeEach(() => {
      cy.get('.MuiList-root').contains('Projects').click();

      cy.url().should('include', '/projects');

      cy.get('tbody > tr').first().click();

      cy.getBySel('EditIcon').should('be.visible').click();
    });

    describe('should success when updating', () => {
      it('name', () => {
        cy.getBySel('name')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(updatedFields.name);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .should('be.visible')
          .should('contain', updatedFields.name);

        cy.getBySel('projectBox')
          .should('be.visible')
          .should('contain', updatedFields.name);
        cy.url().should('include', '/projects');
      });

      it('from', () => {
        cy.getBySel('fromDate')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(updatedFields.from);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]').should('be.visible');

        cy.getBySel('projectBox').should('be.visible');
        cy.url().should('include', '/projects');
      });

      it('to', () => {
        cy.getBySel('toDate')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(updatedFields.to);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]').should('be.visible');

        cy.getBySel('projectBox').should('be.visible');
        cy.url().should('include', '/projects');
      });

      it('description', () => {
        cy.getBySel('description')
          .should('be.visible')
          .find('input')
          .clear({ force: true })
          .type(updatedFields.description);

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]').should('be.visible');

        cy.getBySel('projectBox')
          .should('be.visible')
          .should('contain', updatedFields.description);
        cy.url().should('include', '/projects');
      });
    });

    describe('should display an error with', () => {
      it('empty values', () => {
        cy.getBySel('name')
          .should('be.visible')
          .find('input')
          .clear({ force: true });

        cy.getBySel('description')
          .should('be.visible')
          .find('input')
          .clear({ force: true });

        cy.getBySel('fromDate')
          .should('be.visible')
          .find('input')
          .clear({ force: true });

        cy.getBySel('toDate')
          .should('be.visible')
          .find('input')
          .clear({ force: true });

        cy.getBySel('duration')
          .should('be.visible')
          .find('input')
          .clear({ force: true });

        cy.getBySel('SaveIcon').click();

        cy.get('[role="alert"]')
          .contains('error', { matchCase: false })
          .should('be.visible');
      });
    });
  });
});
