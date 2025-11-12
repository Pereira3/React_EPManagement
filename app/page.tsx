'use client'
import {useState} from 'react';

//Importing Files
import './globals.css';
import NavBar from './components/NavBar/NavBar';
import Employees from './components/Employees/Employees';
import Projects from './components/Projects/Projects';

// Importing the Props
import { EmployeeObj } from './components/Employees/Props';
import { ProjectObj } from './components/Projects/Props';

export default function Home() {

  //Control Top Buttons (Employee / Projects)
  const [value, setValue] = useState(0);

  //Control Dialogs
  const [openDialog, setDialog] = useState(false);
  const [action, setAction] = useState('');

  const handleClicks = (type:string) => {
    if(type === 'employees'){
      setValue(0);
    }else if(type === 'projects'){
      setValue(1);
    }else{
      setAction(type);
      setDialog(true);
    }
  }

  // Managing the Employees
  const [employee, setEmployee] = useState<EmployeeObj[]>([]);
  const [project, setProject] = useState<ProjectObj[]>([]);
  // Managing the Dialogs
  const handleDialog = () => (setDialog(false), setAction(''));

  return (

    <>
      <NavBar />
      <main>
        {/** Employee and Project Buttons */}
        <div className="typeOfDataButtons">
          <button onClick={() => handleClicks("employees")} disabled={value === 0}>Employees</button>
          {" | "}
          <button onClick={() => handleClicks("projects")} disabled={value === 1}>Projects</button>
        </div>

        {/** Main Part */}
        {value === 0 
        ? <Employees employees={employee} setEmployees={setEmployee} openDialog={openDialog} action={action} handleClicks={handleClicks} handleDialog={handleDialog} />
        : <Projects projects={project} setProjects={setProject} openDialog={openDialog} action={action} handleClicks={handleClicks} handleDialog={handleDialog} />
        }
      </main>
    </>
  );
}
