import dayjs from "dayjs";
import { Employee } from "../EmployeeContext";
import { Project } from "../ProjectContext";

export const minEmpNameLength = 1;
export const maxEmpNameLength = 30;
export const minProjNameLength = 0;
export const maxProjNameLength = 15;
export const minDate = (dayjs().subtract(70, "year")).format("DD-MM-YYYY");
export const maxDate = (dayjs().add(1, "day")).format("DD-MM-YYYY");

// Initial Employee data
export const initialEmployees: Employee[] = [
  {
    name: "George Miller",
    date: "01-12-2023",
    role: "Team Manager",
    team: "Team D",
  },
  {
    name: "Alice Johnson",
    date: "15-01-2023",
    role: "Junior Engineer",
    team: "Team A",
  },
  {
    name: "Oliver White",
    date: "02-04-2019",
    role: "Junior Engineer",
    team: "Team C",
  },
  {
    name: "Diana Prince",
    date: "10-05-2023",
    role: "Junior Engineer",
    team: "Team D",
  },
  {
    name: "Ethan Hunt",
    date: "30-09-2020",
    role: "Team Manager",
    team: "Team A",
  },
  {
    name: "Charlie Brown",
    date: "22-07-2021",
    role: "Project Manager",
    team: "Team C",
  },
  {
    name: "Kevin Turner",
    date: "11-12-2020",
    role: "Team Manager",
    team: "Team C",
  },
  {
    name: "Julia Roberts",
    date: "25-06-2018",
    role: "Senior Engineer",
    team: "Team D",
  },
  {
    name: "Bob Smith",
    date: "03-11-2022",
    role: "Senior Engineer",
    team: "Team C",
  },
  {
    name: "Natalie Brooks",
    date: "17-11-2018",
    role: "Project Manager",
    team: "Team D",
  },
  {
    name: "Fiona Davis",
    date: "18-02-2024",
    role: "Senior Engineer",
    team: "Team B",
  },
  {
    name: "Ian Carter",
    date: "19-03-2013",
    role: "Junior Engineer",
    team: "Team A",
  },
  {
    name: "Hannah Lee",
    date: "14-08-2017",
    role: "Junior Engineer",
    team: "Team B",
  },
  {
    name: "Michael Adams",
    date: "30-09-2012",
    role: "Senior Engineer",
    team: "Team A",
  },
  {
    name: "Laura Green",
    date: "05-01-2003",
    role: "Junior Engineer",
    team: "Team B",
  },
];

// Initial Project data
export const initialProjects: Project[] = [
  {
    name: "Technology",
    employees: [
      { emp: initialEmployees[0], allocation: 50 },
      { emp: initialEmployees[2], allocation: 30 },
    ],
  },
  {
    name: "Innovation",
    employees: [
      { emp: initialEmployees[1], allocation: 70 },
      { emp: initialEmployees[3], allocation: 20 },
    ],
  },
  {
    name: "Research",
    employees: [
      { emp: initialEmployees[4], allocation: 60 },
      { emp: initialEmployees[5], allocation: 40 },
    ],
  },
  { name: "Development" },
  {
    name: "Marketing",
    employees: [{ emp: initialEmployees[6], allocation: 80 }],
  },
  { name: "Energy" },
  { name: "Humans" },
  { name: "Nature" },
];

export const teamsAvailable = [
  "Not Defined",
  "Team A",
  "Team B",
  "Team C",
  "Team D",
];

export const rolesAvailable = [
  "None",
  "Junior Engineer",
  "Senior Engineer",
  "Project Manager",
  "Team Manager",
];
