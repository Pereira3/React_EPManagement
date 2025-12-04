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
import EmployeeTopButtons from '@/app/components/Buttons/EmployeeTopButtons';
import { Employee } from '../page';

// TODO: Project Button for Employees - Line 67

export default function Employees({
  lstEmployees, 
  setEmployee
} : {
  lstEmployees: Employee[];
  setEmployee: React.Dispatch<React.SetStateAction<Employee[]>>;
}){
  
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  return(
    <div className="mainArea">   
      <EmployeeTopButtons setEmployeeTB={setEmployee} selectedEmp={selectedEmployee} selectedEmployeeSetter={setSelectedEmployee} />
      {/** API Data */}
      <div className="data">
        <TableContainer component={Paper} className="TableContainer" >
          <Table stickyHeader className="Table">
            <TableHead className="TableHead">
              <TableRow>
                <TableCell className='tableColumn'>Name</TableCell>
                <TableCell className='tableColumn' align="center">Start Date</TableCell>
                <TableCell className='tableColumn' align="center">Role</TableCell>
                <TableCell className='tableColumn' align="center">Team</TableCell>
                <TableCell className='tableColumn' align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="TableBody">
              {lstEmployees.map((employee) => (
                <TableRow
                  className="TableRow" 
                  key={employee.id}
                  selected={selectedEmployee?.id === employee.id}
                  onClick={() => { setSelectedEmployee(employee); }}
                >
                  <TableCell> {employee.name} </TableCell>
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