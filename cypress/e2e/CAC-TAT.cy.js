describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Adriano Abner');
    cy.get('#lastName').type('Venancio Barbosa');
    cy.get('#open-text-area').type('Estou fazendo o curso de Cypress,Estou fazendo o curso de Cypress,Estou fazendo o curso de Cypress,Estou fazendo o curso de Cypress', Object({ delay: 0 }));
    cy.get('#email').type('adrianoabner7@gmail.com');
    cy.contains('Enviar').click();
    cy.contains('Mensagem enviada com sucesso.').should('be.visible');
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Adriano Abner');
    cy.get('#lastName').type('Venancio Barbosa');
    cy.get('#email').type('adrianoabner7.gmail.com');
    cy.contains('Enviar').click();
    cy.contains('Valide os campos obrigatórios!').should('be.visible');
  })
  it('Teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio', () => {
    cy.get('#phone').type('ABCDE')
    cy.get('#phone').should('have.value', '');
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#lastName').type('Venancio Barbosa');
    cy.get('#email').type('adrianoabner7.gmail.com');
    cy.get('#phone-checkbox').check();
    cy.contains('Enviar').click();
    cy.get('.error').should('be.visible');

  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Adriano Abner')
      .clear().should('have.value', '');
    cy.get('#lastName').type('Venancio Barbosa')
      .clear().should('have.value', '');
    cy.get('#email').type('adrianoabner7.gmail.com')
      .clear().should('have.value', '');
    cy.get('#phone').type('61996427443')
      .clear().should('have.value', '');

  })
  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('Enviar').click();
    cy.get('.error').should('be.visible');

  })

  it('fillMandatoryFieldsAndSubmit', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('.success').should('be.visible');

  })

  it('seleciona um produto (YouTube) por seu texto', () => {

    cy.get('select').select('YouTube')
      .should('have.value', 'youtube');

  })

  it('seleciona um produto por seu value', () => {

    cy.get('select').select('mentoria')
      .should('have.value', 'mentoria');

  })

  it('seleciona um produto por seu índice', () => {

    cy.get('select').select(1)
      .should('have.value', 'blog');

  })
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[value="feedback"]').check();

  })
  it('marca cada tipo de atendimento', () => {

    cy.get('input[value="feedback"]').check()
      .should('be.checked');
    cy.get('input[value="ajuda"]').check()
      .should('be.checked');
    cy.get('input[value="elogio"]').check()
      .should('be.checked');


  })
  it('marca ambos checkboxes, depois desmarca o último', () => {

    cy.get('input[type="checkbox"]').check()
      .should('be.checked')
      .first()
      .uncheck()
      .should('not.be.checked')

  })

  it('seleciona um arquivo da pasta fixtures', () => {

    cy.get('#file-upload').selectFile('cypress/fixtures/car.jpg')
      .should(input => {
        expect(input[0].files[0].name).to.equal('car.jpg')

      })
  })


  it('seleciona um arquivo simulando um drag-and-drop', () => {

    cy.get('#file-upload').selectFile('cypress/fixtures/car.jpg', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('car.jpg')
      })
  })

  it('seleciona um arquivo da pasta fixtures pelo alias', () => {
    cy.fixture('car.jpg').as('carro')
    cy.get('#file-upload').selectFile('@carro')
      .should(input => {
        expect(input[0].files[0].name).to.equal('car.jpg')

      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')

  })

})