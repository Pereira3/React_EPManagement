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
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { useState } from "react";
import { useSetters } from "../../context/Setters";
import { getEmployeeProjects } from "./ConnectionsFunctions";

export default function Connections() {
  const { lstofProjects, selectedEmployee, setAssignment } = useSetters();

  // For error handling
  const [errorMessage, setError] = useState<string>("");
  const [errorNumber, setErrorNumber] = useState<number>(0);

  // Get all projects where the selected employee is allocated
  const employeeProjects = getEmployeeProjects(lstofProjects, selectedEmployee!);

  return (
    <Dialog open={true} onClose={() => setAssignment(false)}>
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
                <TableCell>Project</TableCell>
                <TableCell>Allocation</TableCell>
                <TableCell align="center">X</TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="TableBody">
              {/* Display all projects where the employee is allocated */}
              {employeeProjects.map((item) => (
                <TableRow className="TableRow" key={item!.project.name}>
                  <TableCell>{item!.project.name}</TableCell>
                  <TableCell>{item!.allocation}%</TableCell>
                  <TableCell align="center">
                    <LinkOffIcon style={{ cursor: "pointer" }} />
                  </TableCell>
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
