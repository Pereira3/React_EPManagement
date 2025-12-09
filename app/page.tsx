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
  date:string,
  role:string,
  team:string,
}
// Parameters for Each Project
export type Project = {
  id:number,
  name:string,
  employees?:[number, number][];
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

        {type === "Employees"
        ? <Employees lstEmployees={employees} setEmployee={setEmp} />
        : <Projects lstProjects={projects} setProject={setProj} />}
      </main>
    </>
  );
}


// ----- POPULATE TABLES -----
const initialEmployees: Employee[] = [
  { id: 123, name: 'Alice Johnson', date: '15-01-2023', role: 'Junior Engineer', team: 'Team A' },
  { id: 654, name: 'Bob Smith', date: '03-11-2022', role: 'Senior Engineer', team: 'Team C' },
  { id: 176, name: 'Charlie Brown', date: '22-07-2021', role: 'Project Manager', team: 'Team C' },
  { id: 40, name: 'Diana Prince', date: '10-05-2023', role: 'Junior Engineer', team: 'Team D' },
  { id: 7, name: 'Ethan Hunt', date: '30-09-2020', role: 'Team Manager', team: 'Team A' },
  { id: 287, name: 'Fiona Davis', date: '18-02-2024', role: 'Senior Engineer', team: 'Team B' },
  { id: 823, name: 'George Miller', date: '01-12-2023', role: 'Team Manager', team: 'Team D' },
  { id: 473, name: 'Hannah Lee', date: '14-08-2017', role: 'Junior Engineer', team: 'Team B' },
  { id: 612, name: 'Ian Carter', date: '19-03-2013', role: 'Junior Engineer', team: 'Team A' },
  { id: 942, name: 'Julia Roberts', date: '25-06-2018', role: 'Senior Engineer', team: 'Team D' },
  { id: 341, name: 'Kevin Turner', date: '11-12-2020', role: 'Team Manager', team: 'Team C' },
  { id: 32, name: 'Laura Green', date: '05-01-2003', role: 'Junior Engineer', team: 'Team B' },
  { id: 70, name: 'Michael Adams', date: '30-09-2012', role: 'Senior Engineer', team: 'Team A' },
  { id: 745, name: 'Natalie Brooks', date: '17-11-2018', role: 'Project Manager', team: 'Team D' },
  { id: 92, name: 'Oliver White', date: '02-04-2019', role: 'Junior Engineer', team: 'Team C' },
];
const initialProjects: Project[] = [
  { id: 32, name: 'Technology', employees:[[176, 20]]},
  { id: 41, name: 'Energy' },
  { id: 18, name: 'Humans' },
  { id: 4, name: 'Nature' },
];