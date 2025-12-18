"use client";
// ---------- IMPORTS ----------
import { useState } from "react";
import { dataType, Employee, Project } from "./types";
// Importing Components
import NavBar from "./components/NavBar";
import Employees from "./containers/Employees";
import Projects from "./containers/Projects";

//TODO: Explore useEffect function for setters instead of multiple passing of props
//TODO: Separate field Validations from the Field Components
//TODO: Explore the ideia of separating css files and type files into folders
//TODO: Use of files for functions
//TODO: Review CSS and the type of sizes used
//TODO: Explore Jester and Cypress
//TODO: Husky recommended avoiding useSates in useEffects (EmployeesButton and ProjectsButton)

export default function Page() {
  // Management of Datatype (Employees / Projects)
  const [type, setType] = useState<dataType>("Employees");
  // Management of Buttons
  const [disabled, setDisable] = useState(0);
  // Management of Data
  const [employees, setEmp] = useState<Employee[]>(initialEmployees);
  const [projects, setProj] = useState<Project[]>(initialProjects);

  // Treat Employees and Projects top buttons disablement when clicked
  const handleDisablement = (button: number) => setDisable(button);

  return (
    <>
      <NavBar />

      <main>
        <button
          className="topButton"
          disabled={disabled === 0}
          onClick={() => {
            handleDisablement(0);
            setType("Employees");
          }}
        >
          Employees
        </button>{" "}
        |{" "}
        <button
          className="topButton"
          disabled={disabled === 1}
          onClick={() => {
            handleDisablement(1);
            setType("Projects");
          }}
        >
          Projects
        </button>
        {/*Depending on the top button clicked, it will be displayed diferent tables and management buttons*/}
        {type === "Employees" ? (
          <Employees lstEmployees={employees} setEmployee={setEmp} />
        ) : (
          <Projects
            lstProjects={projects}
            setProjects={setProj}
            allEmployees={employees}
          />
        )}
      </main>
    </>
  );
}

// ---------- POPULATE TABLES ----------
const initialEmployees: Employee[] = [
  {
    name: "Alice Johnson",
    date: "15-01-2023",
    role: "Junior Engineer",
    team: "Team A",
  },
  {
    name: "Bob Smith",
    date: "03-11-2022",
    role: "Senior Engineer",
    team: "Team C",
  },
  {
    name: "Charlie Brown",
    date: "22-07-2021",
    role: "Project Manager",
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
    name: "Fiona Davis",
    date: "18-02-2024",
    role: "Senior Engineer",
    team: "Team B",
  },
  {
    name: "George Miller",
    date: "01-12-2023",
    role: "Team Manager",
    team: "Team D",
  },
  {
    name: "Hannah Lee",
    date: "14-08-2017",
    role: "Junior Engineer",
    team: "Team B",
  },
  {
    name: "Ian Carter",
    date: "19-03-2013",
    role: "Junior Engineer",
    team: "Team A",
  },
  {
    name: "Julia Roberts",
    date: "25-06-2018",
    role: "Senior Engineer",
    team: "Team D",
  },
  {
    name: "Kevin Turner",
    date: "11-12-2020",
    role: "Team Manager",
    team: "Team C",
  },
  {
    name: "Laura Green",
    date: "05-01-2003",
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
    name: "Natalie Brooks",
    date: "17-11-2018",
    role: "Project Manager",
    team: "Team D",
  },
  {
    name: "Oliver White",
    date: "02-04-2019",
    role: "Junior Engineer",
    team: "Team C",
  },
];
const initialProjects: Project[] = [
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
