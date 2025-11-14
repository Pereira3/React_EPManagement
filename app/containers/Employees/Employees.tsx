// Importing Files
import '../Containers.css';
// Importing Icons
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
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
import { EmployeesObj } from './Props';
// Importing Routing
import { Outlet, Link } from 'react-router-dom';

// TODO: Project Button for Employees - Line 67
// TODO: For Edition and Deletion features I've to implement the table click selection

export default function Employees({employees} : EmployeesObj){
  return(
    <div className="mainData">
      {/** Buttons to manage Dialog (Add / Edit / Delete) with the corresponding routing */}
      <div className="managementButtons">
        <Link to="/add"><button>
          <AddOutlinedIcon />
          <span>Add</span>
        </button></Link>
        <Link to="/edit"><button>
          <CreateOutlinedIcon />
          <span>Edit</span>
          </button></Link>
        <Link to="/delete"><button>
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
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Team</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.name}>
                  <TableCell>
                    {employee.name}
                  </TableCell>
                  <TableCell align="center">{employee.date.toLocaleDateString('en-GB')}</TableCell>
                  <TableCell align="center">{employee.role}</TableCell>
                  <TableCell align="center">{employee.team}</TableCell>
                  <TableCell align="center">Projects</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}