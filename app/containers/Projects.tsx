import { useState } from 'react';
// Importing CSS
import '../page.css';
// Importing Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// Importing Props
import ProjectTopButtons from '@/app/components/Buttons/ProjectTopButtons';
import Assignment from '../components/Buttons/ProjButtons/Assignment';
import { Project } from '../page';

// TODO: Understand in what situation does selectedProject is null when calling Assignment

export default function Projects({
  lstProjects, 
  setProject
} : {
  lstProjects: Project[];
  setProject: React.Dispatch<React.SetStateAction<Project[]>>;
}){

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [assignment, setShowAssignment] = useState<boolean>(false);

  return(
    <div className="mainArea">
      <ProjectTopButtons setProjectTB={setProject} selectedProj={selectedProject} selectProjectSetter={setSelectedProject} />
      {/** API Data */}
      <div className="data">
        <TableContainer component={Paper} className="TableContainer" >
          <Table stickyHeader className="Table">
            <TableHead className="TableHead">
              <TableRow>
                <TableCell className='tableColumn'>Name</TableCell>
                <TableCell className='tableColumn'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="TableBody" >
              {lstProjects.map((project) => (
                <TableRow 
                  className='TableRow' 
                  key={project.id}
                  selected={selectedProject?.id === project.id} 
                  onClick={() => setSelectedProject(project)}
                >
                  <TableCell>{project.name}</TableCell>
                  <TableCell align="center">
                    <button onClick={() => setShowAssignment(true)}>Employees</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {assignment && selectedProject && <Assignment project={selectedProject} setShowAssign={setShowAssignment} />}
      </div>
    </div>
  );
}