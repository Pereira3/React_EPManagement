// Importing Files
import '../Containers.css';
// Importing Icons
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
// Importing Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// Importing Props
import { ProjectsObj } from './Props';
// Importing Routing
import { Outlet, Link } from 'react-router-dom';

// TODO: Employees Button for Projects - Line 56
// TODO: For Edition and Deletion features I've to implement the table click selection

export default function Projects({projects} : ProjectsObj){
  return(
    <div className="mainData">
      {/** Buttons to manage Dialog (Add / Delete) with the corresponding routing */}
      <div className="managementButtons">
        <Link to="/projects/add"><button>
          <AddOutlinedIcon />
          <span>Add</span>
        </button></Link>
        <Link to="/projects/delete"><button>
          <RemoveOutlinedIcon />
          <span>Delete</span>
          </button></Link>
      </div>

      {/** Tried to display the content on the children routes but it fails, the solution is Outlet
       * Children components of the nested routing will be rendered here
       */}
      <Outlet />

      {/** API Data */}
      <div className="data">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.name}>
                  <TableCell>
                    {project.name}
                  </TableCell>
                  <TableCell align="center">Employees</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}