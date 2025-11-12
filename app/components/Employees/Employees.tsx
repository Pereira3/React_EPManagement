// Importing Files
import '../../globals.css';
import FormDialog from '../FormDialog/FormDialog';

// Importing Icons
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { EmployeesObj } from './Props';

export default function Employees(
  {employees,
    setEmployees,
    openDialog,
    action,
    handleClicks, 
    handleDialog
  } : EmployeesObj){

  return(
      <div className="mainData">
        <div className="managementButtons">
          <button onClick={() => handleClicks("add")}>
            <AddOutlinedIcon />
            <span>Add</span>
          </button>

          {/** Edit button is only available in Employees tab */}
          <button onClick={() => handleClicks("edit")}>
              <CreateOutlinedIcon />
              <span>Edit</span>
          </button>

          <button onClick={() => handleClicks("delete")}>
            <RemoveOutlinedIcon />
            <span>Delete</span>
          </button>
        </div>

        <FormDialog setEmployee={setEmployees} open={openDialog} action={action} onClose={handleDialog} />
        
        {/**API Data*/}
        <div className="data">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Start Date</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right">Team</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow
                    key={employee.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {employee.name}
                    </TableCell>
                    <TableCell align="right">{employee.date.toLocaleDateString('en-GB')}</TableCell>
                    <TableCell align="right">{employee.role}</TableCell>
                    <TableCell align="right">{employee.team}</TableCell>
                    <TableCell align="right">Projects</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
  );
}