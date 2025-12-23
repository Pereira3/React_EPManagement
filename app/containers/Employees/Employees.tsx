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
import EmployeeButton from "../../components/Buttons/Employees/EmployeesButton";
// Importing Types
import { useSetters } from "../../context/Setters";
import Connections from "./Connections";

// TODO: Project Button for Employees - Line 67
// TODO: Missing sort feature

export default function Employees() {
  const {
    lstofEmployees,
    setAction,
    selectedEmployee,
    setSelectedEmployee,
    assignment,
    setAssignment,
  } = useSetters();

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

        <EmployeeButton sets={teamsAvailable} />
      </div>
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
              {lstofEmployees.map((employee) => (
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
                  <TableCell align="center">
                    <button onClick={() => setAssignment(true)}>
                      Projects
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {assignment && selectedEmployee && <Connections />}
      </div>
    </div>
  );
}
