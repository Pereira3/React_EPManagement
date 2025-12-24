// ---------- IMPORTS ----------
import { useState } from "react";
import "../containers.css";
// Importing MUI Components
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
// Importing Contexts
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useProjectContext } from "@/app/context/ProjectContext";
import { useWebContext } from "@/app/context/WebContext";
// Importing Functions
import { getEmployeeProjects } from "./EmployeeFunctions";

export default function EmployeeAllocations() {

  const { setAssignment } = useWebContext();
  const { selectedEmployee, setSelectedEmployee } = useEmployeeContext();
  const { lstofProjects } = useProjectContext();

  // For error handling
  const [errorMessage, setError] = useState<string>("");
  const [errorNumber, setErrorNumber] = useState<number>(0);

  // Get all projects where the selected employee is allocated
  const employeeProjects = getEmployeeProjects(
    lstofProjects,
    selectedEmployee!
  );

  return (
    <Dialog open={true} onClose={() => { setAssignment(false); setSelectedEmployee(null); }}>
      <DialogTitle>Employee: {selectedEmployee!.name}</DialogTitle>

      <DialogContent>
        {errorMessage && (
          <DialogContentText>
            {errorMessage + " (" + errorNumber + ")"}
          </DialogContentText>
        )}
        <TableContainer className="TableConnectionsContainer">
          <Table stickyHeader className="Table">
            <TableHead className="TableHead">
              <TableRow>
                <TableCell align="center">Project</TableCell>
                <TableCell align="center">Allocation</TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="TableBody">
              {/* Display all projects where the employee is allocated */}
              {employeeProjects.map((item) => (
                <TableRow className="TableRow" key={item!.project.name}>
                  <TableCell align="center">{item!.project.name}</TableCell>
                  <TableCell align="center">{item!.allocation}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <button
          onClick={() => {
            setAssignment(false);
            setSelectedEmployee(null);
            setError("");
            setErrorNumber(0);
          }}
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
}
