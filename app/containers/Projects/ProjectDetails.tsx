// ---------- IMPORTS ----------
import { useMemo, useState } from "react";
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
import LinkOffIcon from "@mui/icons-material/LinkOff";
// Importing Components
import Forms from "../../components/Forms/Forms";
// Importing Contexts
import { useProjectContext } from "@/app/context/ProjectContext";
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useDialogContext } from "@/app/context/DialogContext";
import { useErrorContext } from "@/app/context/ErrorContext";
// Importing Functions
import {
  detachEmployee,
  getProjectEmployeesList,
  handleAttachEmployee,
} from "./ProjectFunctions";

export default function Connections() {
  
  const { setAssignment } = useDialogContext();
  const { errorMessage, setError, errorNumber, setErrorNumber } = useErrorContext();
  const { lstofEmployees, selectedEmployee, setSelectedEmployee } = useEmployeeContext();

  const {
    lstofProjects,
    setProjects,
    selectedProject,
    setSelectedProject,
  } = useProjectContext();

  const [newEmployeeName, setNewEmployeeName] = useState<string>("");
  const [newAllocation, setNewAllocation] = useState<number>(0);

  const availableEmployees = useMemo(
    () => getProjectEmployeesList(lstofEmployees, selectedProject!),
    [lstofEmployees, selectedProject]
  );

  return (
    <Dialog
      open={true}
      onClose={() => {
        setAssignment(false);
        setSelectedProject(null);
      }}
    >
      <DialogTitle>Project: {selectedProject!.name}</DialogTitle>

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
                <TableCell>Employee</TableCell>
                <TableCell>Allocation</TableCell>
                <TableCell align="center">X</TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="TableBody">
              {/* If the project has employees assigned, it will display the required data */}
              {selectedProject!.employees?.map((employee) => (
                <TableRow
                  className="TableRow"
                  key={employee.emp.name}
                  selected={selectedEmployee?.name === employee.emp.name}
                  onClick={() => setSelectedEmployee(employee.emp)}
                >
                  <TableCell>{employee.emp.name}</TableCell>
                  <TableCell>{employee.allocation}%</TableCell>
                  <TableCell align="center">
                    <LinkOffIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        detachEmployee(setProjects, selectedProject!, employee);
                        setAssignment(false);
                      }}
                    ></LinkOffIcon>
                  </TableCell>
                </TableRow>
              ))}

              {/* Last row - Attach new employee to the project */}
              <TableRow className="LastRow">
                <TableCell>
                  <Forms
                    forms="dropdown"
                    sets={availableEmployees}
                    value={newEmployeeName}
                    updt={(val) => setNewEmployeeName(val)}
                  />
                </TableCell>
                <TableCell>
                  <Forms
                    forms="text"
                    value={newAllocation}
                    updt={(val) => setNewAllocation(Number(val))}
                  />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <button
          className="actionButton"
          onClick={() => {
            handleAttachEmployee(
              newEmployeeName,
              newAllocation,
              lstofEmployees,
              lstofProjects,
              selectedProject!,
              setProjects,
              setAssignment,
              setError,
              setErrorNumber,
              errorNumber
            );
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            setAssignment(false);
            setError("");
            setErrorNumber(0);
            setSelectedProject(null);
          }}
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
}
