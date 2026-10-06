describe('Catálogo de productos: filtros', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="product-card"]').should('have.length', 8)
  })

  it('el usuario filtra por categoría y ve los resultados correspondientes', () => {
    cy.get('[data-testid="filtro-categoria-Móviles"]').click()

    cy.get('[data-testid="product-card"]').should('have.length', 2)
    cy.get('[data-testid="product-card"]').should('contain', 'Smartphone X')
    cy.get('[data-testid="product-card"]').should('contain', 'Tablet Air')
    cy.get('[data-testid="product-card"]').should('not.contain', 'Laptop Pro')
    cy.get('[data-testid="resultados-total"]').should('contain', '2 productos')

    // Al volver a "Todas" se recupera el catálogo completo
    cy.get('[data-testid="filtro-categoria-todas"]').click()
    cy.get('[data-testid="product-card"]').should('have.length', 8)
  })

  it('el usuario busca por texto y puede limpiar los filtros', () => {
    cy.get('[data-testid="filtro-busqueda"] input').type('logitech')
    cy.get('[data-testid="product-card"]').should('have.length', 1)
    cy.get('[data-testid="product-card"]').should('contain', 'Mouse Gamer')

    cy.get('[data-testid="limpiar-filtros"]').click()
    cy.get('[data-testid="product-card"]').should('have.length', 8)
  })
})
