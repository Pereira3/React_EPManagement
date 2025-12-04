'use client'
// ----- IMPORTS ------
import {useState} from 'react';
// Importing Style Sheet
import './page.css';
// Importing Components
import NavBar from './components/NavBar';
import Employees from './containers/Employees';
import Projects from './containers/Projects';

// ----- TYPES AND INTERFACES -----
type dataType = "Employees" | "Projects";
// Parameters for Each Employee
export type Employee = {
  id:number,
  name:string,
  date:Date,
  role:string,
  team:string,
  allocation?:number;
}
// Parameters for Each Project
export type Project = {
  id:number,
  name:string;
  employees?:Employee[];
}

export default function Page() {
  // Management of Datatype (Employees / Projects)
  const [type, setType] = useState<dataType>("Employees");
  // Management of Buttons
  const [disabled, setDisable] = useState(0);
  // Management of Data
  const [employees, setEmp] = useState<Employee[]>(initialEmployees);
  const [projects, setProj] = useState<Project[]>(initialProjects);

  const handleDisablement = (button:number) => setDisable(button);

  return (
    <>
      <NavBar />

      <main>
        <button className='topButton' disabled={disabled === 0} onClick={() => {handleDisablement(0); setType("Employees")}}>Employees</button> | {" "}
        <button className='topButton' disabled={disabled === 1} onClick={() => {handleDisablement(1); setType("Projects")}}>Projects</button>

        {type === "Employees"  ? <Employees lstEmployees={employees} setEmployee={setEmp} /> : <Projects lstProjects={projects} setProject={setProj} />}
      </main>
    </>
  );
}


// ----- POPULATE TABLES -----
const initialEmployees: Employee[] = [
  { id: 1, name: 'Alice Johnson', date: new Date('2023-01-15'), role: 'Junior Engineer', team: 'Team A' },
  { id: 2, name: 'Bob Smith', date: new Date('2022-11-03'), role: 'Senior Engineer', team: 'Team C' },
  { id: 3, name: 'Charlie Brown', date: new Date('2021-07-22'), role: 'Project Manager', team: 'Team C' },
  { id: 4, name: 'Diana Prince', date: new Date('2023-05-10'), role: 'Junior Engineer', team: 'Team D' },
  { id: 5, name: 'Ethan Hunt', date: new Date('2020-09-30'), role: 'Team Manager', team: 'Team A' },
  { id: 6, name: 'Fiona Davis', date: new Date('2024-02-18'), role: 'Senior Engineer', team: 'Team B' },
  { id: 7, name: 'George Miller', date: new Date('2023-12-01'), role: 'Team Manager', team: 'Team D' },
  { id: 8, name: 'Hannah Lee', date: new Date('2017-08-14'), role: 'Junior Engineer', team: 'Team B' },
  { id: 9, name: 'Ian Carter', date: new Date('2013-03-19'), role: 'Junior Engineer', team: 'Team A' },
  { id: 10, name: 'Julia Roberts', date: new Date('2018-06-25'), role: 'Senior Engineer', team: 'Team D' },
  { id: 11, name: 'Kevin Turner', date: new Date('2020-12-11'), role: 'Team Manager', team: 'Team C' },
  { id: 12, name: 'Laura Green', date: new Date('2003-01-05'), role: 'Junior Engineer', team: 'Team B' },
  { id: 13, name: 'Michael Adams', date: new Date('2012-09-30'), role: 'Senior Engineer', team: 'Team A' },
  { id: 14, name: 'Natalie Brooks', date: new Date('2018-11-17'), role: 'Project Manager', team: 'Team D' },
  { id: 15, name: 'Oliver White', date: new Date('2019-04-02'), role: 'Junior Engineer', team: 'Team C' },
];

const initialProjects: Project[] = [
  { id: 1, name: 'Technology' },
  { id: 2, name: 'Energy' },
  { id: 3, name: 'Humans' },
  { id: 4, name: 'Nature' },
];