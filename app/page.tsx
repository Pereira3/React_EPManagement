'use client'
// React Imports
import {useState} from 'react';

// Importing Style Sheet
import './page.css';
// Importing Components
import NavBar from './components/NavBar/NavBar';
import Routing from './Routing';

// Importing the Props
import { IndividualEmployee } from './containers/Employees/Props';
import { IndividualProject } from './containers/Projects/Props';

// Importing Routing
import { BrowserRouter, Link } from 'react-router-dom';

export default function Page() {

  // Management of Employees
  const [employees, setEmployee] = useState<IndividualEmployee[]>([]);
  // Management of Projects
  const [projects, setProject] = useState<IndividualProject[]>([]);
  // Management of Buttons
  const [disabled, setDisable] = useState(0);

  const handleDisablement = (button:number) => setDisable(button);

  return (
    <BrowserRouter>
      {/* Custom component defined in 'components/NavBar' that curretly only presents the header with "Employees & Projects Management" */}
      <NavBar />

      <main>
        {/* Top Buttons */}
        <Link to='/'><button className='topButton' disabled={disabled === 0} onClick={() => handleDisablement(0)}>Employees</button></Link> | {" "}
        <Link to='/projects'><button className='topButton' disabled={disabled === 1} onClick={() => handleDisablement(1)}>Projects</button></Link>
          
        {/* Routing for the corresponding pages/containers */}
        <Routing employees={employees} setEmployees={setEmployee} projects={projects} setProjects={setProject} />

      </main>
    </BrowserRouter>
  );
}
