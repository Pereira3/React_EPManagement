describe("Employee Management", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  describe("Add Employee Flow", () => {
    it("should add a new employee and display in list", () => {
      cy.contains("button", "Add").click();
      cy.get("#input_name").click();
      cy.get("#input_name").type("Test Name");
      cy.get('#input_role input[value="Junior Engineer"]').check();
      cy.get("#input_team").click();
      cy.get('[data-value="Team C"]').click();
      cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
      cy.get('button[data-timestamp="1768348800000"]').click();
      cy.get("button.actionButton").click();
      cy.get("tr:nth-child(16) td:nth-child(1)").click();
      cy.get(".TableBody .TableRow")
        .contains("Test Name")
        .closest(".TableRow")
        .should("contain.text", "14-01-2026")
        .should("contain.text", "Junior Engineer")
        .should("contain.text", "Team C");

      cy.end();
    });

    it("should test adding a new employee and display the required errors", () => {
      cy.contains("button", "Add").click();
      cy.get("#input_name").type("George Miller");
      cy.get(".MuiInputAdornment-root > .MuiButtonBase-root").click();
      cy.get('[data-timestamp="1767225600000"]').click();
      cy.get('#input_role input[value="Senior Engineer"]').click({
        force: true,
      });
      cy.get("#input_team").click();
      cy.get('[role="option"]').contains("Team C").click();
      cy.get(".actionButton").click();
      cy.get("#addEmployee-form").should("exist");
      cy.get(".MuiDialogContentText-root").contains(
        "Employee already exists in database."
      );

      cy.get("#input_name").clear();
      cy.get("#addEmployee-form").should("exist");

      cy.get("#input_name").click();
      cy.get("#input_name").type("Test Name");
      cy.get("#addEmployee-form button").click();
      for (let i = 0; i < 5; i++) {
        cy.get('[data-testid="ArrowRightIcon"]').click();
      };
      cy.get('button[data-timestamp="1781046000000"]').click();
      cy.get("button.actionButton").click();
      cy.get("#addEmployee-form").should("exist");
      cy.get(".MuiDialogContentText-root").contains("Date must be before");

      cy.get("#addEmployee-form button").click();
      cy.get('[data-testid="ArrowLeftIcon"]').click();
      cy.get('[data-testid="ArrowLeftIcon"]').click();
      for (let i = 0; i < 5; i++) {
        cy.get('[data-testid="ArrowLeftIcon"]').click();
      };
      cy.get('button[data-timestamp="1763424000000"]').click();
      cy.get("button.actionButton").click();
      cy.get("#addEmployee-form").should("not.exist");

      cy.get(".TableBody .TableRow")
        .contains("Test Name")
        .closest(".TableRow")
        .should("contain.text", "18-11-2025")
        .should("contain.text", "Senior Engineer")
        .should("contain.text", "Team C");

      cy.end();
    });

    it('should check cancel button', function() {
      cy.contains("button", "Add").click();
      cy.get('div:nth-child(3) > button:nth-child(2)').click();
      cy.get('.MuiDialogContent-root').should('not.exist');
      cy.end();
    });
  });

  describe("Edit Employee Flow", () => {
    it("should edit an existing employee and display updated info", () => {
      cy.get("tr:nth-child(1) td:nth-child(1)").click();
      cy.contains("button", "Edit").click();
      cy.get("#input_name").click();
      cy.get("#input_name").clear();
      cy.get("#input_name").type("Alice Johnson");
      cy.get('#input_role input[value="Project Manager"]').check();
      cy.get("#input_team").click();
      cy.get('[data-value="Team B"]').click();
      cy.get("button.actionButton").click();
      cy.get("#editEmployee-form").should("exist");
      cy.get(".MuiDialogContentText-root").contains(
        "Employee already exists in database."
      );

      cy.get("#editEmployee-form > div:nth-child(1)").click();
      cy.get("#input_name").clear();
      cy.get("#input_name").type("Diana Prince");
      cy.get("#editEmployee-form button").click();
      for (let i = 0; i < 30; i++) {
        cy.get('[data-testid="ArrowRightIcon"]').click();
      }
      cy.get('button[data-timestamp="1781132400000"]').click();
      cy.get('#input_role input[value="Senior Engineer"]').check();
      cy.get("button.actionButton").click();
      cy.get("#editEmployee-form").should("exist");
      cy.get(".MuiDialogContentText-root").contains(
        "Employee already exists in database."
      );

      cy.get("#editEmployee-form > div:nth-child(1)").click();
      cy.get("#input_name").clear();
      cy.get("#input_name").type("George Miller");
      cy.get("button.actionButton").click();
      cy.get("#editEmployee-form").should("exist");
      cy.get(".MuiDialogContentText-root").contains("Date must be before");

      cy.get("#input_name").click();
      cy.get('[data-testid="CalendarIcon"]').click();
      for (let i = 0; i < 8; i++) {
        cy.get('[data-testid="ArrowLeftIcon"]').click();
      }
      cy.get('button[data-timestamp="1761260400000"]').click();
      cy.get('#input_role input[value="Junior Engineer"]').check();
      cy.get("#input_team").click();
      cy.get('[data-value="Team C"]').click();
      cy.get('button.actionButton').click();

      cy.get("#editEmployee-form").should("not.exist");
      cy.get(".TableBody .TableRow")
        .contains("George Miller")
        .closest(".TableRow")
        .should("contain.text", "24-10-2025")
        .should("contain.text", "Junior Engineer")
        .should("contain.text", "Team C");

      cy.end();
    });
    it("should display the unselected employee details correctly", () => {
      cy.contains("button", "Edit").click();
      cy.get(".MuiDialogContent-root").contains("You have to select one employee to be able to edit it.");
      cy.get("button.actionButton").click();
      cy.get(".MuiDialogContent-root").should("not.exist");
      cy.end();
    });
  });
  describe("Delete Employee Flow", () => {
    it("should delete an existing employee and remove from list", () => {
      cy.get("tr:nth-child(2) td:nth-child(1)").click();
      cy.contains("button", "Delete").click();
      cy.get('button.actionButton').click();
      cy.get(".TableBody .TableRow")
        .contains("Alice Johnson")
        .should("not.exist");
      
      //Check if it's still allocated to projects
      cy.get('main > button:nth-child(2)').click();
      cy.get('tr:nth-child(2) button').click();
      cy.get(".TableBody").should("not.contain.text", "Alice Johnson");
      cy.end();
    });
    it("should display the unselected employee delete confirmation correctly", () => {
      cy.contains("button", "Delete").click();
      cy.get(".MuiDialogContent-root").contains("You have to select one employee to be able to delete it.");
      cy.get("button.actionButton").click();
      cy.get(".MuiDialogContent-root").should("not.exist");
      cy.end();
    });
  });
});
