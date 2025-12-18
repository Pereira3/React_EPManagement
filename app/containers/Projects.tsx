import { useState } from 'react';
// Importing Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// Importing Icons
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
// Importing Types
import { Project, Employee, actionsProj } from "../types";
// Importing Components
import Connections from './Connections';
import ProjectsButton from '../components/Buttons/ProjectsButton';

// TODO: Missing sort feature

export default function Projects({
  lstProjects,
  setProjects,
  allEmployees,
} : {
  lstProjects:Project[],
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  allEmployees:Employee[];
}){

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [assignment, setShowAssignment] = useState<boolean>(false);
  const [action, setAction] = useState<actionsProj>(null);

  return (
    <div className="mainArea">
      {/* Top Management Buttons */}
      {managementButtonsProj(
        action,
        setAction,
        setProjects,
        selectedProject,
        setSelectedProject,
        lstProjects
      )}
      {/** Display Data */}
      <div className="data">
        <TableContainer component={Paper} className="TableContainer">
          <Table stickyHeader className="Table">
            <TableHead className="TableHead">
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="TableBody">
              {lstProjects.map((project) => (
                <TableRow
                  className="TableRow"
                  key={project.name}
                  selected={selectedProject?.name === project.name}
                  onClick={() => setSelectedProject(project)}
                >
                  <TableCell>{project.name}</TableCell>
                  <TableCell align="center">
                    <button onClick={() => setShowAssignment(true)}>
                      Employees
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {assignment && selectedProject && (
          <Connections
            setProjects={setProjects}
            project={selectedProject}
            setShowAssign={setShowAssignment}
            listEmployees={allEmployees}
          />
        )}
      </div>
    </div>
  );
}

function managementButtonsProj(
  action: actionsProj,
  setAction:React.Dispatch<React.SetStateAction<actionsProj>>,
  setProjects:React.Dispatch<React.SetStateAction<Project[]>>,
  selectedProj:Project | null,
  selectProjectSetter:React.Dispatch<React.SetStateAction<Project | null>>,
  lstProjects:Project[],
){
  return (
    <div className="managementButtons">
      <button onClick={() => setAction("Add")}>
        <AddOutlinedIcon />
        <span>Add</span>
      </button>
      <button onClick={() => setAction("Delete")}>
        <RemoveOutlinedIcon />
        <span>Delete</span>
      </button>

      <ProjectsButton
        action={action}
        lstProjects={lstProjects}
        setProjects={setProjects}
        setAction={setAction}
        projectSelected={selectedProj}
        setSelectProject={selectProjectSetter}
      />
    </div>
  );
}