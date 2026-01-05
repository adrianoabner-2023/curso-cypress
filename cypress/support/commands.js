Cypress.Commands.add('fillMandatoryFieldsAndSubmit',(data= {
  firstName : 'John',
  lastName : 'Cruz',
  text : 'Teste.',
  email : 'john@gmail.com' 
 }) =>{
  cy.get('#firstName').type(data.firstName);
  cy.get('#lastName').type(data.lastName);
  cy.get('#open-text-area').type(data.text);
  cy.get('#email').type(data.email);
  cy.contains('Enviar').click();
  cy.contains('Mensagem enviada com sucesso.').should('be.visible');

})