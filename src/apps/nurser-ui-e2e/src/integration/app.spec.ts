import { getGreeting } from '../support/app.po';

describe('nurser-ui', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to nurser-ui!');
  });
});
