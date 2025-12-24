// ---------- IMPORTS ----------
import "../containers.css";
// Importing MUI Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
// Importing Components
import EmployeeButton from "../../components/Buttons/Employees/EmployeesButton";
// Importing Contexts
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useWebContext } from "@/app/context/WebContext";
import EmployeeAllocations from "./EmployeeAllocations";
import { sortedlstofEmployees } from "./EmployeeFunctions";

export default function Employees() {
  const { setAction, assignment, setAssignment, orderBy, setOrderBy } =
    useWebContext();

  const {
    lstofEmployees,
    selectedEmployee,
    setSelectedEmployee,
    orderSection,
    setOrderSection,
  } = useEmployeeContext();

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
                <TableCell>
                  <TableSortLabel
                    active={orderSection === "name"}
                    direction={orderSection === "name" ? orderBy : "asc"}
                    onClick={() => {
                      setOrderSection("name");
                      setOrderBy((prev) => (prev === "asc" ? "desc" : "asc"));
                    }}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderSection === "date"}
                    direction={orderSection === "date" ? orderBy : "asc"}
                    onClick={() => {
                      setOrderSection("date");
                      setOrderBy((prev) => (prev === "asc" ? "desc" : "asc"));
                    }}
                  >
                    Start Date
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderSection === "role"}
                    direction={orderSection === "role" ? orderBy : "asc"}
                    onClick={() => {
                      setOrderSection("role");
                      setOrderBy((prev) => (prev === "asc" ? "desc" : "asc"));
                    }}
                  >
                    Role
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderSection === "team"}
                    direction={orderSection === "team" ? orderBy : "asc"}
                    onClick={() => {
                      setOrderSection("team");
                      setOrderBy((prev) => (prev === "asc" ? "desc" : "asc"));
                    }}
                  >
                    Team
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="TableBody">
              {sortedlstofEmployees(lstofEmployees, orderSection, orderBy).map(
                (employee) => (
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
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {assignment && selectedEmployee && <EmployeeAllocations />}
      </div>
    </div>
  );
}
