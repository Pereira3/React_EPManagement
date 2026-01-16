// ---------- IMPORTS ----------
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
import { useDialogContext } from "@/app/context/DialogContext";
import { useErrorContext } from "@/app/context/ErrorContext";
// Importing Functions
import { useEmployeesLogic } from "./useEmployeesLogic";

export default function EmployeeDetails() {
  const { setAssignment } = useDialogContext();
  const { selectedEmployee, setSelectedEmployee } = useEmployeeContext();

  // For error handling
  const { errorMessage, errorNumber } = useErrorContext();

  const { useGetterEmployeeProjects, clearSelectionsAndErrors } =
    useEmployeesLogic();
  
  const employeeProjects = useGetterEmployeeProjects();

  return (
    <Dialog
      open={true}
      onClose={() => {
        setAssignment(false);
        setSelectedEmployee(null);
      }}
    >
      <DialogTitle>
        Employee: {selectedEmployee ? selectedEmployee.name : ""}
      </DialogTitle>

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
                <TableRow className="TableRow" key={item.project.name}>
                  <TableCell align="center">{item.project.name}</TableCell>
                  <TableCell align="center">{item.allocation}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <button onClick={clearSelectionsAndErrors}>Close</button>
      </DialogActions>
    </Dialog>
  );
}
