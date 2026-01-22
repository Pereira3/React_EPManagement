import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { formsValues } from "@/app/context/FormsContext";
import { Employee } from "@/app/context/EmployeeContext";
import { Project } from "@/app/context/ProjectContext";
import { normalizedString } from "@/app/shared/utils";
import {
  teamsAvailable,
  rolesAvailable,
  minEmpNameLength,
  maxEmpNameLength,
  minProjNameLength,
  maxProjNameLength,
  minDate,
  maxDate,
} from "@/app/context/data/initialData";
dayjs.extend(customParseFormat);

// ---------- CONSTANTS ----------

// ---------- FORMS TEXT VALIDATION ----------
const validateEmpText = (
  employees: Employee[],
  field: string,
  fieldValue: string,
  excludeName: string | undefined
): { isValid: boolean; error: string } => {
  const templatedName = normalizedString(fieldValue);

  if (
    field === "name" &&
    (!fieldValue || fieldValue.trim().length <= minEmpNameLength)
  ) {
    return {
      isValid: false,
      error: `Minimum of ${minEmpNameLength + 1} character required.`,
    };
  }

  if (
    field === "name" &&
    maxEmpNameLength &&
    fieldValue.trim().length > maxEmpNameLength
  ) {
    return {
      isValid: false,
      error: `Maximum ${maxEmpNameLength} characters allowed.`,
    };
  }

  if (field === "team" && !teamsAvailable.includes(fieldValue)) {
    return {
      isValid: false,
      error: `Team not known.`,
    };
  }

  if (field === "role" && !rolesAvailable.includes(fieldValue)) {
    return {
      isValid: false,
      error: `Role not known.`,
    };
  }

  const isDuplicated = employees?.some(
    (listName) =>
      normalizedString(listName.name) === templatedName &&
      normalizedString(listName.name) !== normalizedString(excludeName || "")
  );

  if (isDuplicated && normalizedString(excludeName || "") !== templatedName) {
    return { isValid: false, error: "Employee already exists in database." };
  }

  return { isValid: true, error: "" };
};

// ---------- FORMS DATE VALIDATION ----------
const validateDate = (date: string): { isValid: boolean; error: string } => {
  if (date === "") {
    return { isValid: false, error: "Date not inserted or not valid." };
  }

  // To compare the dates, had to convert them to dayjs objects
  const parsedDate = dayjs(date, "DD-MM-YYYY");

  if (!parsedDate.isValid()) {
    return { isValid: false, error: "Invalid date format." };
  }

  if (parsedDate.isBefore(dayjs(minDate, "DD-MM-YYYY"))) {
    return {
      isValid: false,
      error: `Date must be after ${minDate}.`,
    };
  }

  if (parsedDate.isAfter(dayjs(maxDate, "DD-MM-YYYY"))) {
    return {
      isValid: false,
      error: `Date must be before ${maxDate}.`,
    };
  }

  return { isValid: true, error: "" };
};

// ---------- FORMS NUMBER VALIDATION ----------
const validateNumber = (
  employee: Employee,
  listProjects: Project[],
  value: number
): { isValid: boolean; error: string } => {
  let empTotalAllocation = 0;

  if (isNaN(value)) {
    return { isValid: false, error: "Must be a valid number." };
  }

  if (value < 1) {
    return { isValid: false, error: `Minimum value is 1.` };
  }

  if (value > 100) {
    return { isValid: false, error: `Maximum value is 100.` };
  }

  // For each project where the employee is assigned, sum the allocation of the employee
  listProjects.forEach((project) => {
    project.employees?.forEach((e) => {
      if (normalizedString(e.emp.name) === normalizedString(employee.name)) {
        empTotalAllocation += e.allocation;
      }
    });
  });

  if (empTotalAllocation + value > 100) {
    return {
      isValid: false,
      error: `Employee is already allocated ${empTotalAllocation}%. Adding ${value}% would exceed 100%.`,
    };
  }

  return { isValid: true, error: "" };
};

// ---------- SUBMIT EMPLOYEE VALIDATION ----------
export const validateEmployeeSubmit = (
  formsValues: formsValues,
  employees: Employee[],
  excludeName?: string
): { isValid: boolean; error: string } => {
  const nameValidation = validateEmpText(
    employees,
    "name",
    formsValues.name,
    excludeName
  );
  const dateValidation = validateDate(formsValues.date);
  const teamValidation = validateEmpText(
    employees,
    "team",
    formsValues.team,
    excludeName
  );
  const roleValidation = validateEmpText(
    employees,
    "role",
    formsValues.role,
    excludeName
  );

  if (!nameValidation.isValid) {
    return { isValid: false, error: nameValidation.error };
  }
  if (!dateValidation.isValid) {
    return { isValid: false, error: dateValidation.error };
  }
  if (!teamValidation.isValid) {
    return { isValid: false, error: teamValidation.error };
  }
  if (!roleValidation.isValid) {
    return { isValid: false, error: roleValidation.error };
  }

  return { isValid: true, error: "" };
};

// ---------- SUBMIT PROJECT VALIDATION ----------
export const validateProjectSubmit = (
  projects: Project[],
  name: string
): { isValid: boolean; error: string } => {
  const templatedName = normalizedString(name);
  if (!name || name.trim().length <= minProjNameLength) {
    return {
      isValid: false,
      error: `Minimum of ${minProjNameLength + 1} character required.`,
    };
  }

  if (maxProjNameLength && name.trim().length > maxProjNameLength) {
    return {
      isValid: false,
      error: `Maximum ${maxProjNameLength} characters allowed.`,
    };
  }

  const isDuplicated = projects?.some(
    (listName) => normalizedString(listName.name) === templatedName
  );
  if (isDuplicated) {
    return { isValid: false, error: "Project already exists in database." };
  }

  return { isValid: true, error: "" };
};

// ---------- SUBMIT CONNECTIONS VALIDATION ----------
export const validateConnectionSubmit = (
  project: Project,
  employee: Employee,
  listProjects: Project[],
  allocation: number
): { isValid: boolean; error: string } => {
  if (!employee) {
    return { isValid: false, error: "Employee not found or not identified." };
  }

  const projectInList = listProjects.find(
    (p) => normalizedString(p.name) === normalizedString(project.name)
  );
  if (!projectInList) {
    return { isValid: false, error: "Project not found in list." };
  }

  // Compare employee lists by content, not reference
  if (project.employees?.length !== projectInList.employees?.length) {
    return {
      isValid: false,
      error: "Project Employees list lengths inconsistent.",
    };
  }

  const allEmployeesMatch = project.employees?.every((projEmp) =>
    projectInList.employees?.some(
      (listEmp) =>
        normalizedString(projEmp.emp.name) ===
          normalizedString(listEmp.emp.name) &&
        projEmp.allocation === listEmp.allocation
    )
  );

  if (!allEmployeesMatch && allEmployeesMatch !== undefined) {
    return { isValid: false, error: "Project Employees are inconsistent." };
  }

  const isAlreadyAssigned = project.employees?.some(
    (e) => normalizedString(e.emp.name) === normalizedString(employee.name)
  );
  if (isAlreadyAssigned) {
    return {
      isValid: false,
      error: "Employee is already assigned to this project.",
    };
  }

  const validateAllocation = validateNumber(employee, listProjects, allocation);
  if (!validateAllocation.isValid) {
    return { isValid: false, error: validateAllocation.error };
  }

  return { isValid: true, error: "" };
};
