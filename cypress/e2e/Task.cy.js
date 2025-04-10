describe('Add Task Flow', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit("http://localhost:5173");
    });

    it("Task flow (add , rename, check and delete)", () => {
        //click on add task button
        cy.get('[data-testid="add-list-button"]').click();



        //click on the name and rename it
        cy.get("[data-testid='list-item-cy']").first().click();


        cy.get('[data-testid="add-task-button"]').click();

        // test new task name and length
        cy.contains("new task").should("be.visible");
        cy.get('.task-list').should("have.length", 1);


        // click and rename task item
        cy.get('.task-name').first().click();
        cy.get('.editable-task-input')
            .clear()
            .type('Renamed Task{enter}');

        // click on the checkbox
        cy.get(".checkbox").first().click();
        cy.get('.task-name').first().should('have.class', 'strike-through')

        // click on the delete icon and delete the task
        cy.get(".bin-icon").first().click();

        //test length of task items 
        cy.get(`task-list`).should("have.length", 0);


    });
})