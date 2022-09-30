import { createYield } from 'typescript';
import { frontEndUrl } from '../../src/utils/baseUrl';

// example test given on cypress website (should always pass)
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('empty spec', () => {
    it('passes', () => {
      cy.visit(frontEndUrl);
    })
  })

describe('Visits site and finds create resource button', () => {
  it('finds the create resource button', () => {
    cy.visit(frontEndUrl);
    cy.contains('Create Resource');
  })
})

describe('Visits site, signs in as Beill, and clicks create resource button', () => {
  it('finds the login dropdown and selects Beill', () => {
    cy.visit(frontEndUrl);
    cy.get('#search-bar').get('#select-user').select('Beill Nogie');
  });
  it('logs in as Beill and clicks create resource button, which opens creat resource modal', () => {
    cy.visit(frontEndUrl);
    cy.get('#search-bar').get('#select-user').select('Beill Nogie');
    cy.contains('Create Resource').click();
    cy.contains('Add new tag');
  })
})