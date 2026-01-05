describe('Política de Privacidade', () => {
    beforeEach(() => {
        cy.visit('./src/privacy.html');
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')

    })
    it('Testa a página da política de privacidade de forma independente', () => {

        cy.contains('p', 'Não salvamos dados submetidos no formulário da aplicação CAC TAT.').should('be.visible')

    })
})
