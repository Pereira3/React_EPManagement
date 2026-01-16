import { expect } from '@jest/globals';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  validateEmployeeSubmit,
  validateProjectSubmit,
  validateConnectionSubmit,
} from "./formsValidation";
import {
  minEmpNameLength,
  maxEmpNameLength,
  minProjNameLength,
  maxProjNameLength,
  minDate,
  maxDate,
} from "@/app/context/data/initialData";
import { Employee } from "@/app/context/EmployeeContext";

dayjs.extend(customParseFormat);

/**
 * Cases like ' AL P h a' will be flagged as different from 'Alpha' since
 * the normalizedString function trims and is case insensitive but the spacing between characters is preserved using only one.
 * Thus, ' AL P h a' becomes 'AL P H A' so it will be different from 'Alpha'.
 *
 * This could be considered a bug but it will stay this way to preserve cases as such
 * 'Davide Silva' and 'Davi de Silva', which I want to stay different.
 *
 * If I intedended to solve the bug, this last case would be marked as duplicated, both being DAVIDESILVA after normalization.
 */

// ---------- TESTING EMPLOYEE SUBMIT VALIDATION ----------
describe("---------- VALIDATE EMPLOYEE SUBMIT ----------", function () {
  describe("----- NAME FIELD -----", function () {
    describe("- UNHAPPY PATH", function () {
      // EMPTY NAME
      test("Fails on empty name", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "",
            date: "11-04-2024",
            role: "Team Manager",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: false,
          error: `Minimum of ${minEmpNameLength + 1} character required.`,
        });
      });
      // UNTRIMMED EMPTY NAME
      test("Fails on untrimmed empty name", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "        ",
            date: "11-04-2024",
            role: "Team Manager",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: false,
          error: `Minimum of ${minEmpNameLength + 1} character required.`,
        });
      });
      // UNDER MIN LENGTH
      test("Fails on names with only 1 character", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "A",
            date: "11-04-2024",
            role: "Team Manager",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: false,
          error: `Minimum of ${minEmpNameLength + 1} character required.`,
        });
      });
      // EXCEDING MAX LENGTH
      test("Fails when exceding max length", function () {
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
          error: `Maximum ${maxEmpNameLength} characters allowed.`,
        });
      });
      // DUPLICATED NAME
      test("Fails on duplicate name", function () {
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
      test("Fails on irregular format duplicated name", function () {
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

    describe("- HAPPY PATH", function () {
      // VALID NAME
      test("Passes on valid name", function () {
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
      test("Passes when passing excluded name", function () {
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
      test("Passes with excluded name with irregular formatting", function () {
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
      test("Passes within the name low length limits", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "Al",
            date: "11-04-2024",
            role: "Team Manager",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: true,
          error: "",
        });
      });
      test("Passes within the name high length limits", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "Alexander Jonnathan Montgomery",
            date: "11-04-2024",
            role: "Team Manager",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: true,
          error: "",
        });
      });
    });
  });
  describe("----- DATE FIELD -----", function () {
    describe("- UNHAPPY PATH", function () {
      // EMPTY DATE
      test("Fails on empty date", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: "",
            role: "Team Manager",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: false,
          error: "Date not inserted or not valid.",
        });
      });
      // BELLOW MIN DATE
      test("Fails on date bellow expected", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: dayjs(minDate, "DD-MM-YYYY")
              .subtract(1, "day")
              .format("DD-MM-YYYY"),
            role: "Team Manager",
            team: "Team D",
          },
          []
        );

        expect(validation).toEqual({
          isValid: false,
          error: `Date must be after ${minDate}.`,
        });
      });
      // ABOVE MAX DATE
      test("Fails on date above expected", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: dayjs().add(2, "day").format("DD-MM-YYYY"),
            role: "Team Manager",
            team: "Team D",
          },
          []
        );

        expect(validation).toEqual({
          isValid: false,
          error: `Date must be before ${maxDate}.`,
        });
      });
    });
    describe("- HAPPY PATH", function () {
      // EMPTY DATE
      test("Passes on valid date", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: "11-04-2024",
            role: "Team Manager",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: true,
          error: "",
        });
      });
      // BELLOW MIN DATE
      test("Passes on inferior limit date", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: minDate,
            role: "Team Manager",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: true,
          error: "",
        });
      });
      // ABOVE MAX DATE
      test("Passes on superior limit date", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: maxDate,
            role: "Team Manager",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: true,
          error: "",
        });
      });
    });
  });
  describe("----- TEAM FIELD -----", function () {
    describe("- UNHAPPY PATH", function () {
      // UNKNOWN TEAM
      test("Fails on unknown team", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: "11-04-2024",
            role: "Team Manager",
            team: "Unknown Team",
          },
          []
        );
        expect(validation).toEqual({
          isValid: false,
          error: "Team not known.",
        });
      });
    });
    describe("- HAPPY PATH", function () {
      // KNOWN TEAM
      test("Passes on valid team", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: "11-04-2024",
            role: "Team Manager",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: true,
          error: "",
        });
      });
      // No TEAM DEFINED
      test("Passes on undefined team", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: "11-04-2024",
            role: "Team Manager",
            team: "Not Defined",
          },
          []
        );
        expect(validation).toEqual({
          isValid: true,
          error: "",
        });
      });
    });
  });
  describe("----- ROLE FIELD -----", function () {
    describe("- UNHAPPY PATH", function () {
      // UNKNOWN ROLE
      test("Fails on unknown role.", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: "11-04-2024",
            role: "Unknown Role",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: false,
          error: "Role not known.",
        });
      });
    });
    describe("- HAPPY PATH", function () {
      // KNOWN ROLE
      test("Passes on valid role", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: "11-04-2024",
            role: "Team Manager",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: true,
          error: "",
        });
      });
      // No ROLE DEFINED
      test("Passes on undefined role", function () {
        const validation = validateEmployeeSubmit(
          {
            name: "John Doe",
            date: "11-04-2024",
            role: "None",
            team: "Team D",
          },
          []
        );
        expect(validation).toEqual({
          isValid: true,
          error: "",
        });
      });
    });
  });
});

// ---------- TESTING PROJECT SUBMIT VALIDATION ----------
describe("---------- VALIDATE PROJECT SUBMIT ----------", function () {
  describe("- UNHAPPY PATH", function () {
    // EMPTY NAME
    test("Fails on empty name", function () {
      const validation = validateProjectSubmit(
        [{ name: "Alpha" }, { name: "Beta" }],
        ""
      );
      expect(validation).toEqual({
        isValid: false,
        error: `Minimum of ${minProjNameLength + 1} character required.`,
      });
    });
    // EXCEDING MAX LENGTH
    test("Fails when exceding max length", function () {
      const validation = validateProjectSubmit(
        [{ name: "Alpha" }, { name: "Beta" }],
        "AAAAAAAAAAAAAAAA"
      );
      expect(validation).toEqual({
        isValid: false,
        error: `Maximum ${maxProjNameLength} characters allowed.`,
      });
    });
    // UNTRIMMED EMPTY NAME
    test("Fails on untrimmed empty name", function () {
      const validation = validateProjectSubmit(
        [{ name: "Alpha" }, { name: "Beta" }],
        "       "
      );
      expect(validation).toEqual({
        isValid: false,
        error: `Minimum of ${minProjNameLength + 1} character required.`,
      });
    });
    // UNTRIMMED NAME EXCEDING MAX LENGTH
    test("Fails on untrimmed name trespassing max length", function () {
      const validation = validateProjectSubmit(
        [{ name: "Alpha" }, { name: "Beta" }],
        "       A  L    P  H   A       "
      );
      expect(validation).toEqual({
        isValid: false,
        error: `Maximum ${maxProjNameLength} characters allowed.`,
      });
    });
    // DUPLICATED NAME
    test("Fails on duplicated name", function () {
      const validation = validateProjectSubmit(
        [{ name: "Alpha" }, { name: "Beta" }],
        "Alpha"
      );
      expect(validation).toEqual({
        isValid: false,
        error: "Project already exists in database.",
      });
    });
    // IRREGULAR FORMATTED DUPLICATED NAME
    test("Fails on irregular format duplicated name", function () {
      const validation = validateProjectSubmit(
        [{ name: "Alpha" }, { name: "Beta" }],
        "   AlpHa "
      );
      expect(validation).toEqual({
        isValid: false,
        error: "Project already exists in database.",
      });
    });
  });

  describe("- HAPPY PATH", function () {
    // ON LIMIT MIN LENGTH
    test("Passes only 1 character name", function () {
      const validation = validateProjectSubmit(
        [{ name: "Project Alpha" }, { name: "Project Beta" }],
        "P"
      );
      expect(validation).toEqual({
        isValid: true,
        error: "",
      });
    });
    // ON LIMIT MAX LENGTH
    test("Passes with 15 characters", function () {
      const validation = validateProjectSubmit(
        [{ name: "Project Alpha" }, { name: "Project Beta" }],
        "AAAAAAAAAAAAAAA"
      );
      expect(validation).toEqual({
        isValid: true,
        error: "",
      });
    });
  });
});

// ---------- TESTING PROJECT SUBMIT VALIDATION ----------
describe("---------- VALIDATE CONNECTIONS SUBMIT ----------", function () {
  describe("- UNHAPPY PATH", function () {
    // PROJECT DOES NOT EXIST IN LIST OF PROJECTS
    test("Fails when project does not exist in projects list", function () {
      const validation = validateConnectionSubmit(
        { name: "Alpha", employees: [] },
        {
          name: "Alicia Doe",
          date: "01-01-2020",
          role: "Engineer",
          team: "Team A",
        },
        [
          { name: "Beta", employees: [] },
          { name: "Gamma", employees: [] },
        ],
        50
      );
      expect(validation).toEqual({
        isValid: false,
        error: "Project not found in list.",
      });
    });
    // PROJECT NOT SYNCED WITH LIST OF PROJECTS (EMPLOYEES MISMATCH)
    test("Fails when the employees from the project passed are inconsistent relative to the list of projects", function () {
      const validation = validateConnectionSubmit(
        {
          name: "Alpha",
          employees: [
            {
              emp: {
                name: "Alice Smith",
                date: "01-01-2020",
                role: "Engineer",
                team: "Team A",
              },
              allocation: 50,
            },
          ],
        },
        {
          name: "Alicia Doe",
          date: "01-01-2020",
          role: "Engineer",
          team: "Team A",
        },
        [
          {
            name: "Alpha",
            employees: [
              {
                emp: {
                  name: "John Doe",
                  date: "01-01-2020",
                  role: "Engineer",
                  team: "Team A",
                },
                allocation: 50,
              },
            ],
          },
          { name: "Beta", employees: [] },
        ],
        50
      );
      expect(validation).toEqual({
        isValid: false,
        error: "Project Employees are inconsistent.",
      });
    });
    // PROJECT NOT SYNCED WITH LIST OF PROJECTS (LENGTH MISMATCH)
    test("Fails when the length of the project passed is inconsistent relative to the list of projects", function () {
      const validation = validateConnectionSubmit(
        { name: "Alpha", employees: [] },
        {
          name: "Alicia Doe",
          date: "01-01-2020",
          role: "Engineer",
          team: "Team A",
        },
        [
          {
            name: "Alpha",
            employees: [
              {
                emp: {
                  name: "John Doe",
                  date: "01-01-2020",
                  role: "Engineer",
                  team: "Team A",
                },
                allocation: 50,
              },
              {
                emp: {
                  name: "Alice Smith",
                  date: "01-01-2020",
                  role: "Engineer",
                  team: "Team A",
                },
                allocation: 50,
              },
            ],
          },
          { name: "Beta", employees: [] },
        ],
        50
      );
      expect(validation).toEqual({
        isValid: false,
        error: "Project Employees list lengths inconsistent.",
      });
    });
    // SAVED WITHOUT AN EMPLOYEE DEFINED
    test("Fails when no employee is defined", function () {
      const validation = validateConnectionSubmit(
        { name: "Alpha", employees: [] },
        undefined as unknown as Employee,
        [
          { name: "Alpha", employees: [] },
          { name: "Beta", employees: [] },
        ],
        50
      );
      expect(validation).toEqual({
        isValid: false,
        error: "Employee not found or not identified.",
      });
    });
    // SAVED WITH AN EMPLOYEE ALREADY ASSIGNED
    test("Fails when employee is already assigned to the project", function () {
      const validation = validateConnectionSubmit(
        {
          name: "Alpha",
          employees: [
            {
              emp: {
                name: "John Doe",
                date: "01-01-2020",
                role: "Engineer",
                team: "Team A",
              },
              allocation: 50,
            },
          ],
        },
        {
          name: "John Doe",
          date: "01-01-2020",
          role: "Engineer",
          team: "Team A",
        },
        [
          {
            name: "Alpha",
            employees: [
              {
                emp: {
                  name: "John Doe",
                  date: "01-01-2020",
                  role: "Engineer",
                  team: "Team A",
                },
                allocation: 50,
              },
            ],
          },
          { name: "Beta", employees: [] },
        ],
        50
      );
      expect(validation).toEqual({
        isValid: false,
        error: "Employee is already assigned to this project.",
      });
    });
    // SAVED AN EMPLOYEE WITHOUT ALLOCATION VALUE
    test("Fails when an allocation value is not defined", function () {
      const validation = validateConnectionSubmit(
        { name: "Alpha", employees: [] },
        {
          name: "John Doe",
          date: "01-01-2020",
          role: "Engineer",
          team: "Team A",
        },
        [
          { name: "Alpha", employees: [] },
          { name: "Beta", employees: [] },
        ],
        0
      );
      expect(validation).toEqual({
        isValid: false,
        error: "Minimum value is 1.",
      });
    });
    // SAVED AN EMPLOYEE TRESPASSING ALLOCATION VALUE
    test("Fails when an allocation value is trespassing the max defined", function () {
      const validation = validateConnectionSubmit(
        { name: "Alpha", employees: [] },
        {
          name: "John Doe",
          date: "01-01-2020",
          role: "Engineer",
          team: "Team A",
        },
        [
          { name: "Alpha", employees: [] },
          { name: "Beta", employees: [] },
        ],
        101
      );
      expect(validation).toEqual({
        isValid: false,
        error: "Maximum value is 100.",
      });
    });
    // SAVED AN EMPLOYEE WITH NON VALID ALLOCATION VALUE
    test("Fails when non valid allocation value defined", function () {
      const validation = validateConnectionSubmit(
        { name: "Alpha", employees: [] },
        {
          name: "John Doe",
          date: "01-01-2020",
          role: "Engineer",
          team: "Team A",
        },
        [
          { name: "Alpha", employees: [] },
          { name: "Beta", employees: [] },
        ],
        "assdas" as unknown as number
      );
      expect(validation).toEqual({
        isValid: false,
        error: "Must be a valid number.",
      });
    });
    // SAVED AN EMPLOYEE WITH ALLOCATION EXCEEDING 100% FROM OTHER PROJECTS
    test("Fails when allocation passes 100% from other projects", function () {
      const validation = validateConnectionSubmit(
        { name: "Alpha", employees: [] },
        {
          name: "John Doe",
          date: "01-01-2020",
          role: "Engineer",
          team: "Team A",
        },
        [
          { name: "Alpha", employees: [] },
          {
            name: "Beta",
            employees: [
              {
                emp: {
                  name: "John Doe",
                  date: "01-01-2020",
                  role: "Engineer",
                  team: "Team A",
                },
                allocation: 50,
              },
            ],
          },
          {
            name: "Gamma",
            employees: [
              {
                emp: {
                  name: "John Doe",
                  date: "01-01-2020",
                  role: "Engineer",
                  team: "Team A",
                },
                allocation: 45,
              },
            ],
          },
        ],
        10
      );
      expect(validation).toEqual({
        isValid: false,
        error: `Employee is already allocated 95%. Adding 10% would exceed 100%.`,
      });
    });
  });

  describe("- HAPPY PATH", function () {
    // VALID SUBMISSION
    test("Passes on valid connection submission", function () {
      const validation = validateConnectionSubmit(
        { name: "Alpha", employees: [] },
        {
          name: "Alicia Doe",
          date: "01-01-2020",
          role: "Engineer",
          team: "Team A",
        },
        [
          { name: "Alpha", employees: [] },
          { name: "Beta", employees: [] },
        ],
        50
      );
      expect(validation).toEqual({
        isValid: true,
        error: "",
      });
    });
    // VALID SUBMISSION WITH EMPLOYEE ASSIGNED TO OTHER PROJECTS
    test("Passes on valid connection submission", function () {
      const validation = validateConnectionSubmit(
        { name: "Alpha", employees: [] },
        {
          name: "John Doe",
          date: "01-01-2020",
          role: "Engineer",
          team: "Team A",
        },
        [
          { name: "Alpha", employees: [] },
          {
            name: "Beta",
            employees: [
              {
                emp: {
                  name: "John Doe",
                  date: "01-01-2020",
                  role: "Engineer",
                  team: "Team A",
                },
                allocation: 40,
              },
            ],
          },
          {
            name: "Gamma",
            employees: [
              {
                emp: {
                  name: "John Doe",
                  date: "01-01-2020",
                  role: "Engineer",
                  team: "Team A",
                },
                allocation: 10,
              },
            ],
          },
        ],
        50
      );
      expect(validation).toEqual({
        isValid: true,
        error: "",
      });
    });
  });
});
