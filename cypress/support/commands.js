Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {}) => {
  if (data.firstName) cy.get('#firstName').type(data.firstName);
  if (data.lastName) cy.get('#lastName').type(data.lastName);
  if (data.email) cy.get('#email').type(data.email);
  if (data.text) cy.get('#open-text-area').type(data.text, { delay: 0 });
  cy.contains('button', 'Enviar').click();
});
Cypress.Commands.add('clearFormFields', () => {
  cy.get('#firstName').clear();
  cy.get('#lastName').clear();
  cy.get('#email').clear();
  cy.get('#phone').clear();
});

Cypress.Commands.add('selectProduct', (value) => {
  cy.get('select').select(value);
});

Cypress.Commands.add('checkServiceType', (value) => {
  cy.get(`input[value="${value}"]`).check();
});

Cypress.Commands.add('uploadFile', (fileName, options = {}) => {
  cy.get('#file-upload').selectFile(`cypress/fixtures/${fileName}`, options);
});