import { Employee, Project } from "./types";
import dayjs from "dayjs";

// Initial Employee data
export const initialEmployees: Employee[] = [
  {
    name: "Alice Johnson",
    date: dayjs("2023-01-15").format("DD-MM-YYYY"),
    role: "Junior Engineer",
    team: "Team A",
  },
  {
    name: "Bob Smith",
    date: dayjs("2022-11-03").format("DD-MM-YYYY"),
    role: "Senior Engineer",
    team: "Team C",
  },
  {
    name: "Charlie Brown",
    date: dayjs("2021-07-22").format("DD-MM-YYYY"),
    role: "Project Manager",
    team: "Team C",
  },
  {
    name: "Diana Prince",
    date: dayjs("2023-05-10").format("DD-MM-YYYY"),
    role: "Junior Engineer",
    team: "Team D",
  },
  {
    name: "Ethan Hunt",
    date: dayjs("2020-09-30").format("DD-MM-YYYY"),
    role: "Team Manager",
    team: "Team A",
  },
  {
    name: "Fiona Davis",
    date: dayjs("2024-02-18").format("DD-MM-YYYY"),
    role: "Senior Engineer",
    team: "Team B",
  },
  {
    name: "George Miller",
    date: dayjs("2023-12-01").format("DD-MM-YYYY"),
    role: "Team Manager",
    team: "Team D",
  },
  {
    name: "Hannah Lee",
    date: dayjs("2017-08-14").format("DD-MM-YYYY"),
    role: "Junior Engineer",
    team: "Team B",
  },
  {
    name: "Ian Carter",
    date: dayjs("2013-03-19").format("DD-MM-YYYY"),
    role: "Junior Engineer",
    team: "Team A",
  },
  {
    name: "Julia Roberts",
    date: dayjs("2018-06-25").format("DD-MM-YYYY"),
    role: "Senior Engineer",
    team: "Team D",
  },
  {
    name: "Kevin Turner",
    date: dayjs("2020-12-11").format("DD-MM-YYYY"),
    role: "Team Manager",
    team: "Team C",
  },
  {
    name: "Laura Green",
    date: dayjs("2003-01-05").format("DD-MM-YYYY"),
    role: "Junior Engineer",
    team: "Team B",
  },
  {
    name: "Michael Adams",
    date: dayjs("2012-09-30").format("DD-MM-YYYY"),
    role: "Senior Engineer",
    team: "Team A",
  },
  {
    name: "Natalie Brooks",
    date: dayjs("2018-11-17").format("DD-MM-YYYY"),
    role: "Project Manager",
    team: "Team D",
  },
  {
    name: "Oliver White",
    date: dayjs("2019-04-02").format("DD-MM-YYYY"),
    role: "Junior Engineer",
    team: "Team C",
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
