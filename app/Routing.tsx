// Importing Routering
import { Routes, Route } from "react-router-dom";
// Importing Containers and Components
import Employees from "./containers/Employees/Employees";
import Projects from "./containers/Projects/Projects";
import AddEmployee from "./components/Forms/Employee/AddEmployee";
import EditEmployee from "./components/Forms/Employee/EditEmployee";
import DeleteEmployee from "./components/Forms/Employee/DeleteEmployee";
import AddProject from "./components/Forms/Project/AddProject";
import DeleteProject from "./components/Forms/Project/DeleteProject";
// Importing Containers
import { IndividualEmployee } from "./containers/Employees/Props";
import { IndividualProject } from "./containers/Projects/Props";

export default function Routing({
  employees,
  setEmployees,
  projects,
  setProjects
}:{
  employees: IndividualEmployee[];
  setEmployees: React.Dispatch<React.SetStateAction<IndividualEmployee[]>>;
  projects: IndividualProject[];
  setProjects: React.Dispatch<React.SetStateAction<IndividualProject[]>>;
}) {
  return (
    <>
      <Routes>
          {/* Employees main routes */}
          <Route path="/" element={<Employees employees={employees} setEmployee={setEmployees} />} >
            <Route path="/add" element={<AddEmployee setEmployee={setEmployees} />} />
            <Route path="/edit" element={<EditEmployee setEmployee={setEmployees} />} />
            <Route path="/delete" element={<DeleteEmployee setEmployee={setEmployees} />} />
          </Route>

          {/* Projects main routes */}
          <Route path="/projects" element={<Projects projects={projects} setProject={setProjects} />} >
              <Route path="/projects/add" element={<AddProject setProject={setProjects} />} />
              <Route path="/projects/delete" element={<DeleteProject setProject={setProjects} />} />
          </Route>
      </Routes>
    </>
  );
}
