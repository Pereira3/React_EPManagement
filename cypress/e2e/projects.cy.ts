describe("Project Management", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("button", "Projects").click();
  });

  describe("Add Project Flow", () => {
    it("should add a new project and display in list", () => {
      cy.contains("button", "Add").click();
      cy.get("#input_name").click();
      cy.get("#input_name").type("Research");
      cy.get("button.actionButton").click();
      cy.get("#addProject-form").should("exist");
      cy.get(".MuiDialogContentText-root").contains(
        "Project already exists in database."
      );
      cy.get("#input_name").click();
      cy.get("#input_name").clear();
      cy.get("#input_name").type("technology");
      cy.get("button.actionButton").click();
      cy.get("#addProject-form").should("exist");
      cy.get(".MuiDialogContentText-root").contains(
        "Project already exists in database."
      );
      cy.get("#input_name").click();
      cy.get("#input_name").clear();
      cy.get("#input_name").type("Test Name");
      cy.get("button.actionButton").click();
      cy.get("#addProject-form").should("not.exist");
      cy.get(".TableBody .TableRow").should("contain.text", "Test Name");
      cy.end();
    });
    it("should check cancel button", function () {
      cy.contains("button", "Add").click();
      cy.contains("button", "Cancel").click();
      cy.get(".MuiDialogContent-root").should("not.exist");
      cy.end();
    });
  });
  describe("Delete Project Flow", () => {
    it("should delete an existing project and remove from list", () => {
        cy.get("tr:nth-child(2) td:nth-child(1)").click();
        cy.contains("button", "Delete").click();
        cy.get("button.actionButton").click(); 
              cy.get(".MuiDialogContent-root").should("not.exist");
              cy.get(".TableBody .TableRow").should(
                "not.contain.text",
                "Energy"
              );
        
        //Check if the time allocated from employees was removed
        cy.contains("button", "Employees").click();
        cy.contains("tr", "Alice Johnson").click();
        cy.get('tr:nth-child(2) button').click();
        cy.contains("tr", "Energy").should("not.exist");
        cy.contains("button", "Close").click();
        cy.get(".MuiDialogContent-root").should("not.exist");
        cy.get('tr:nth-child(4) button').click();
        cy.contains("tr", "Energy").should("not.exist");
        cy.contains("button", "Close").click();
        cy.get(".MuiDialogContent-root").should("not.exist");
        cy.end();
    });
    it("should display the unselected project delete confirmation correctly", () => {
      cy.contains("button", "Delete").click();
      cy.get(".MuiDialogContent-root").contains(
        "You have to select one project to be able to delete it."
      );
      cy.get("button.actionButton").click();
      cy.get(".MuiDialogContent-root").should("not.exist");
      cy.end();
    });
  });
});
