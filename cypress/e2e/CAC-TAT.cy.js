describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('1. preenche os campos obrigatórios e envia o formulário', () => {
    cy.fillMandatoryFieldsAndSubmit({
      firstName: 'Adriano Abner',
      lastName: 'Venancio Barbosa',
      email: 'adrianoabner7@gmail.com',
      text: 'Estou fazendo o curso de Cypress...'
    });
    cy.contains('Mensagem enviada com sucesso.').should('be.visible');
  });

  it('2. Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.fillMandatoryFieldsAndSubmit({
      firstName: 'Adriano Abner',
      lastName: 'Venancio Barbosa',
      email: 'adrianoabner7.gmail.com'
    });
    cy.contains('Valide os campos obrigatórios!').should('be.visible');
  });

  it('3. Teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio', () => {
    cy.get('#phone').type('ABCDE').should('have.value', '');
  });

  it('4. exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
    cy.get('#lastName').type('Venancio Barbosa');
    cy.get('#email').type('adriano@gmail.com');
    cy.get('#phone-checkbox').check();
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
  });

  it('preenche e limpa os campos', () => {
    cy.get('#firstName').type('Adriano').should('have.value', 'Adriano');
    cy.clearFormFields();
    cy.get('#firstName').should('have.value', '');
  });

  it('6. Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
  });

  it('7. seleciona um produto (YouTube) por seu texto', () => {
    cy.selectProduct('YouTube').should('have.value', 'youtube');
  });

  it('8. seleciona um produto por seu value', () => {
    cy.selectProduct('mentoria').should('have.value', 'mentoria');
  });

  it('9. seleciona um produto por seu índice', () => {
    cy.selectProduct(1).should('have.value', 'blog');
  });

  it('10. marca o tipo de atendimento "Feedback"', () => {
    cy.checkServiceType('feedback').should('be.checked');
  });

  it('11. marca o tipo de atendimento "Ajuda"', () => {
    cy.checkServiceType('ajuda').should('be.checked');
  });

  it('12. marca o tipo de atendimento "Elogio"', () => {
    cy.checkServiceType('elogio').should('be.checked');
  });

  it('13. marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked')
      .last().uncheck().should('not.be.checked');
  });

  it('14. seleciona um arquivo da pasta fixtures', () => {
    cy.uploadFile('car.jpg');
    cy.get('#file-upload').should(input => {
      expect(input[0].files[0].name).to.equal('car.jpg');
    });
  });

  it('15. seleciona um arquivo simulando um drag-and-drop', () => {
    cy.uploadFile('car.jpg', { action: 'drag-drop' });
    cy.get('#file-upload').should(input => {
      expect(input[0].files[0].name).to.equal('car.jpg');
    });
  });

  it('16. seleciona um arquivo da pasta fixtures pelo alias', () => {
    cy.fixture('car.jpg').as('carro');
    cy.get('#file-upload').selectFile('@carro');
    cy.get('#file-upload').should(input => {
      expect(input[0].files[0].name).to.equal('car.jpg');
    });
  });

  it('17. verifica que a política de privacidade abre em outra aba sem o clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank');
  });

  it('18. acessa a página da política de privacidade removendo o target', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click();
    cy.contains('Talking About Testing').should('be.visible');
  });
});