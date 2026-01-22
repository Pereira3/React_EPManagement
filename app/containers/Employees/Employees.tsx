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
import SearchIcon from "@mui/icons-material/Search";
// Importing Components
import EmployeesButton from "./EmployeesButton";
// Importing Contexts
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useDialogContext } from "@/app/context/DialogContext";
import EmployeeDetails from "./EmployeeDetails";
import { useEmployeesLogic } from "./useEmployeesLogic";
import { TablePagination } from "@mui/material";
import { useEffect } from "react";

export default function Employees() {
  const { setAction, assignment, setAssignment } = useDialogContext();

  const {
    selectedEmployee,
    setSelectedEmployee,
    orderSection,
    setOrderSection,
    orderBy,
    setOrderBy,
    pages,
    setPages,
    rowsPerPage,
    setRowsPerPage,
    searchTerm,
    setSearchTerm,
  } = useEmployeeContext();

  const handleSort = (section: string) => {
    setOrderSection(section);
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  const filteredEmployees = useEmployeesLogic().useFilteredlstofEmployees(searchTerm);

  // Reset to first page when search changes
  useEffect(() => {
    setPages(0);
  }, [searchTerm, setPages]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPages(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPages(0);
  };

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

        <EmployeesButton />
      </div>
      {/* Search Bar */}
      <div className="searchBar">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Display Data */}
      <div className="data">
        <TableContainer
          component={Paper}
          className="TableContainer">
          <Table stickyHeader className="Table">
            <TableHead className="TableHead">
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderSection === "name"}
                    direction={orderSection === "name" ? orderBy : "asc"}
                    onClick={() => {
                      handleSort("name");
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
                      handleSort("date");
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
                      handleSort("role");
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
                      handleSort("team");
                    }}
                  >
                    Team
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="TableBody">
              {filteredEmployees
                .slice(pages * rowsPerPage, pages * rowsPerPage + rowsPerPage)
                .map((employee) => (
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredEmployees.length}
          rowsPerPage={rowsPerPage}
          page={pages}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {assignment && selectedEmployee && <EmployeeDetails />}
      </div>
    </div>
  );
}
