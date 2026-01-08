import {
  validateEmployeeSubmit,
  //validateProjectSubmit,
  //validateConnectionSubmit,
} from "./formsValidation";

// ---------- TESTING EMPLOYEE SUBMIT VALIDATION ----------
// ---------- TESTING NAME FIELD ----------
// ----- UNHAPPY PATH -----
describe("UNHAPPY PATH - Validate Employee Submit - ONLY NAME", () => {
  // EMPTY NAME
  test("Fails on empty name", () => {
    const validation = validateEmployeeSubmit(
      { name: "", date: "11-04-2024", role: "Team Manager", team: "Team D" },
      []
    );
    expect(validation).toEqual({
      isValid: false,
      error: "Minimum of 2 character required.",
    });
  });
  // UNDER MIN LENGTH
  test("Fails on names with only 1 character", () => {
    const validation = validateEmployeeSubmit(
      { name: "A", date: "11-04-2024", role: "Team Manager", team: "Team D" },
      []
    );
    expect(validation).toEqual({
      isValid: false,
      error: "Minimum of 2 character required.",
    });
  });
  // EXCEDING MAX LENGTH
  test("Fails when exceding max length", () => {
    const validation = validateEmployeeSubmit(
      {
        name: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        date: "11-04-2024",
        role: "Team Manager",
        team: "Team D",
      },
      []
    );
    expect(validation).toEqual({
      isValid: false,
      error: "Maximum 30 characters allowed.",
    });
  });
  // DUPLICATED NAME
  test("Fails on duplicate name", () => {
    const validation = validateEmployeeSubmit(
      {
        name: "John Doe",
        date: "11-04-2024",
        role: "Team Manager",
        team: "Team D",
      },
      [
        {
          name: "John Doe",
          date: "05-03-2023",
          role: "Senior Engineer",
          team: "Team A",
        },
      ]
    );
    expect(validation).toEqual({
      isValid: false,
      error: "Employee already exists in database.",
    });
  });
  // DUPLICATED NAME NOT TRIMMED AND CASE SENSITIVE
  test("Fails on irregular format duplicated name", () => {
    const validation = validateEmployeeSubmit(
      {
        name: "John Doe",
        date: "11-04-2024",
        role: "Team Manager",
        team: "Team D",
      },
      [
        {
          name: " JoHn   doe     ",
          date: "05-03-2023",
          role: "Senior Engineer",
          team: "Team A",
        },
      ]
    );
    expect(validation).toEqual({
      isValid: false,
      error: "Employee already exists in database.",
    });
  });
});

// ----- HAPPY PATH -----
describe("HAPPY PATH - Validate Employee Submit - ONLY NAME", () => {
  // VALID NAME
  test("Passes on valid name", () => {
    const validation = validateEmployeeSubmit(
      {
        name: "John Doe",
        date: "11-04-2024",
        role: "Team Manager",
        team: "Team D",
      },
      [
        {
          name: "Alicia Doe",
          date: "05-02-2021",
          role: "Team Manager",
          team: "Team B",
        },
      ]
    );
    expect(validation).toEqual({
      isValid: true,
      error: "",
    });
  });

  // EXCLUDED NAME
  test("Passes when passing excluded name", () => {
    const validation = validateEmployeeSubmit(
      {
        name: "John Doe",
        date: "11-04-2024",
        role: "Team Manager",
        team: "Team D",
      },
      [
        {
          name: "John Doe",
          date: "05-03-2023",
          role: "Senior Engineer",
          team: "Team A",
        },
      ],
      "John Doe"
    );
    expect(validation).toEqual({
      isValid: true,
      error: "",
    });
  });
  // EXCLUDED NAME WITH IRREGULAR FORMATTING
  test("Passes with excluded name with irregular formatting", () => {
    const validation = validateEmployeeSubmit(
      {
        name: "John Doe",
        date: "11-04-2024",
        role: "Team Manager",
        team: "Team D",
      },
      [
        {
          name: " JoHn   doe     ",
          date: "05-03-2023",
          role: "Senior Engineer",
          team: "Team A",
        },
      ],
      "John       DoE"
    );
    expect(validation).toEqual({
      isValid: true,
      error: "",
    });
  });
});
