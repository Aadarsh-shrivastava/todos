describe('Add List Flow', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:5173");
  });

  it("List Flow (add, rename and delte )", () => {
    //click on add list button
    cy.get('[data-testid="add-list-button"]').click();

    // test new list name and length
    cy.contains("New List").should("be.visible");
    cy.get("[data-testid='list-item-cy']").should("have.length", 1);


    //click on the name and rename it
    cy.get('.Listitem-name').first().click();
    cy.get('.editable-list-input')
      .clear()
      .type('Renamed List{enter}');

    // check if the name is correctly renamed
    cy.contains("Renamed List").should("be.visible");

    // click on delete icon of first list item
    cy.get("[data-testid='list-item-cy']").first().first().within(() => {
      cy.get(".Listitem-icon").click();
    })

    //test length of list items 
    cy.get(`[data-testid='list-item-cy']`).should("have.length", 0);


  });
})