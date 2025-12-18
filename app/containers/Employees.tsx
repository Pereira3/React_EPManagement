import { useState } from "react";
// ---------- IMPORTS ----------
// Importing Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import EmployeeButton from "../components/Buttons/EmployeesButton";
// Importing Types
import { actionsEmp, Employee } from "@/app/types";

// TODO: Project Button for Employees - Line 67
// TODO: Missing sort feature

export default function Employees({
  lstEmployees,
  setEmployee,
}: {
  lstEmployees: Employee[];
  setEmployee: React.Dispatch<React.SetStateAction<Employee[]>>;
}) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [action, setAction] = useState<actionsEmp>(null);
  const teamsAvailable = [
    "Not Defined",
    "Team A",
    "Team B",
    "Team C",
    "Team D",
  ];

  return (
    <div className="mainArea">
      {/* Top Management Buttons */}
      {managementButtonsEmp(
        action,
        setAction,
        lstEmployees,
        setEmployee,
        selectedEmployee,
        setSelectedEmployee,
        teamsAvailable
      )}
      {/* Display Data */}
      <div className="data">
        <TableContainer component={Paper} className="TableContainer">
          <Table stickyHeader className="Table">
            <TableHead className="TableHead">
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Team</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="TableBody">
              {lstEmployees.map((employee) => (
                <TableRow
                  className="TableRow"
                  key={employee.name}
                  selected={selectedEmployee?.name === employee.name}
                  onClick={() => {
                    setSelectedEmployee(employee);
                  }}
                >
                  <TableCell> {employee.name} </TableCell>
                  <TableCell align="center">{employee.date}</TableCell>
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

function managementButtonsEmp(
  action: actionsEmp,
  setAction: React.Dispatch<React.SetStateAction<actionsEmp>>,
  lstEmployees: Employee[],
  setEmployee: React.Dispatch<React.SetStateAction<Employee[]>>,
  selectedEmployee: Employee | null,
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>,
  teamsAvailable: string[]
) {
  return (
    <div className="managementButtons">
      <button onClick={() => setAction("Add")}>
        <AddOutlinedIcon />
        <span>Add</span>
      </button>
      <button
        onClick={() => {
          setAction("Edit");
        }}
      >
        <CreateOutlinedIcon />
        <span>Edit</span>
      </button>
      <button onClick={() => setAction("Delete")}>
        <RemoveOutlinedIcon />
        <span>Delete</span>
      </button>

      <EmployeeButton
        action={action}
        lstEmployees={lstEmployees}
        setEmployees={setEmployee}
        setAction={setAction}
        employeeSelected={selectedEmployee}
        setSelectEmployee={setSelectedEmployee}
        sets={teamsAvailable}
      />
    </div>
  );
}
