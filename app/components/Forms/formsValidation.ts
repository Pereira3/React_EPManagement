import dayjs from "dayjs";
import { Employee, formsValues, Project } from "../../shared/types";

// ---------- FORMS TEXT VALIDATION ----------
const validateEmpText = (
  employees: Employee[],
  name: string,
  excludeName: string | undefined,
  minLength: number,
  maxLength: number
): { isValid: boolean; error: string } => {
  const templatedName = name.trim().toUpperCase();

  if (!name || name.trim().length <= minLength) {
    return {
      isValid: false,
      error: `Minimum of ${minLength + 1} character required.`,
    };
  }

  if (maxLength && name.trim().length > maxLength) {
    return {
      isValid: false,
      error: `Maximum ${maxLength} characters allowed.`,
    };
  }

  const isDuplicated = employees?.some(
    (listName) =>
      listName.name.trim().toUpperCase() === templatedName &&
      listName.name.trim().toUpperCase() !== excludeName?.trim().toUpperCase()
  );
  if (isDuplicated && excludeName !== name) {
    return { isValid: false, error: "Employee already exists in database." };
  }

  return { isValid: true, error: "" };
};

// ---------- FORMS DATE VALIDATION ----------
const validateDate = (
  date: string,
  minDate: string,
  maxDate: string
): { isValid: boolean; error: string } => {
  if (date === "") {
    return { isValid: false, error: "Date not Inserted." };
  }

  // To compare the dates, had to convert them to dayjs objects
  const parsedDate = dayjs(date, "DD-MM-YYYY");
  const parsedMin = dayjs(minDate, "DD-MM-YYYY");
  // Changed to include the day of today as a valid date
  const parsedMax = dayjs(maxDate, "DD-MM-YYYY");

  if (parsedDate.isBefore(parsedMin)) {
    return {
      isValid: false,
      error: `Date must be after ${minDate}`,
    };
  }

  if (parsedDate.isAfter(parsedMax)) {
    return {
      isValid: false,
      error: `Date must be before ${maxDate}`,
    };
  }

  return { isValid: true, error: "" };
};

// ---------- FORMS NUMBER VALIDATION ----------
export const validateNumber = (
  employee: Employee,
  listProjects: Project[],
  value: number,
  min: number,
  max: number
): { isValid: boolean; error: string } => {
  let empTotalAllocation = 0;

  if (isNaN(value)) {
    return { isValid: false, error: "Must be a valid number." };
  }

  if (value < min) {
    return { isValid: false, error: `Minimum value is ${min}.` };
  }

  if (value > max) {
    return { isValid: false, error: `Maximum value is ${max}.` };
  }

  // For each project where the employee is assigned, sum the allocation of the employee
  listProjects.forEach((project) => {
    project.employees?.forEach((e) => {
      if (
        e.emp.name.trim().toUpperCase() === employee.name.trim().toUpperCase()
      ) {
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
    formsValues.name,
    excludeName,
    1,
    30
  );

  const dateValidation = validateDate(
    formsValues.date,
    dayjs().subtract(70, "year").format("DD-MM-YYYY"),
    dayjs().format("DD-MM-YYYY")
  );

  if (!nameValidation.isValid) {
    return { isValid: false, error: nameValidation.error };
  }
  if (!dateValidation.isValid) {
    return { isValid: false, error: dateValidation.error };
  }
  
  return { isValid: true, error: "" };
};

// ---------- SUBMIT PROJECT VALIDATION ----------
export const validateProjectSubmit = (
  projects: Project[],
  name: string,
  minLength: number,
  maxLength: number
): { isValid: boolean; error: string } => {
  const templatedName = name.trim().toUpperCase();

  if (!name || name.trim().length <= minLength) {
    return {
      isValid: false,
      error: `Minimum of ${minLength + 1} character required.`,
    };
  }

  if (maxLength && name.trim().length > maxLength) {
    return {
      isValid: false,
      error: `Maximum ${maxLength} characters allowed.`,
    };
  }

  const isDuplicated = projects?.some(
    (listName) => listName.name.trim().toUpperCase() === templatedName
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
  const isAlreadyAssigned = project.employees?.some(
    (e) =>
      e.emp.name.trim().toUpperCase() === employee.name.trim().toUpperCase()
  );
  if (isAlreadyAssigned) {
    return {
      isValid: false,
      error: "Employee is already assigned to this project.",
    };
  }

  const validateAllocation = validateNumber(
    employee,
    listProjects,
    allocation,
    1,
    100
  );
  if (!validateAllocation.isValid) {
    return { isValid: false, error: validateAllocation.error };
  }

  return { isValid: true, error: "" };
};
