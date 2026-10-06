describe('Catálogo de productos: detalle con rutas', () => {
  it('el usuario abre el detalle de un producto y vuelve al catálogo', () => {
    cy.visit('/')
    cy.get('[data-testid="product-card"]').should('have.length', 8)

    cy.get('[data-testid="product-card"]').first().find('[data-testid="boton-detalle"]').click()
    cy.location('pathname').should('eq', '/producto/1')
    cy.get('[data-testid="detalle-producto"]').should('contain', 'Laptop Pro')

    cy.get('[data-testid="volver-catalogo"]').click()
    cy.location('pathname').should('eq', '/')
    cy.get('[data-testid="product-card"]').should('have.length', 8)
  })

  it('una ruta inexistente muestra la página 404', () => {
    cy.visit('/ruta-que-no-existe')
    cy.get('[data-testid="pagina-no-encontrada"]').should('be.visible')
  })
})
