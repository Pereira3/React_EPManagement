import { Employee, Project } from "@/app/shared/types";
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
import Forms from "../components/Forms/Forms";
import { validateConnectionSubmit } from "../components/Forms/formsValidation";

export default function Connections({
  project,
  setShowAssign,
  setProjects,
  listProjects,
  listEmployees,
}: {
  project: Project;
  setShowAssign: React.Dispatch<React.SetStateAction<boolean>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  listProjects: Project[];
  listEmployees: Employee[];
}) {
  // For error handling
  const [errorMessage, setError] = useState<string>("");
  const [errorNumber, setErrorNumber] = useState<number>(0);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [newEmployeeName, setNewEmployeeName] = useState<string>("");
  const [newAllocation, setNewAllocation] = useState<number>(0);

  const handleAttachEmployee = () => {
    const employee = listEmployees.find((e) => e.name === newEmployeeName);
    if (!employee) return;

    const validConnection = validateConnectionSubmit(
      project,
      employee,
      listProjects,
      newAllocation
    );

    if (validConnection.isValid) {
      setProjects((prev) =>
        prev.map((p) =>
          p.name.trim().toUpperCase() === project.name.trim().toUpperCase()
            ? {
                ...p,
                employees: [
                  ...(p.employees || []),
                  { emp: employee, allocation: newAllocation },
                ],
              }
            : p
        )
      );
      setShowAssign(false);
      setError("");
      setErrorNumber(0);
    } else {
      setErrorNumber(errorNumber + 1);
      setError(validConnection.error);
    }
  };

  return (
    <Dialog open={true} onClose={() => setShowAssign(false)}>
      <DialogTitle>Project: {project.name}</DialogTitle>

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
              {project.employees?.map((employee) => (
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
                        detachEmployee(setProjects, project, employee);
                        setShowAssign(false);
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
                    sets={getProjectEmployeesList(listEmployees, project)}
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
        <button className="actionButton" onClick={handleAttachEmployee}>
          Save
        </button>
        <button
          onClick={() => {
            setShowAssign(false);
            setError("");
            setErrorNumber(0);
          }}
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
}

/* 
Returns an array of employee names that are not assigned to the project
after filtering the whole employee list to only include that specific employees
*/
function getProjectEmployeesList(
  listEmployees: Employee[],
  project: Project
): string[] {
  const validEmployeeDropdown = listEmployees?.filter(
    (emp) => !project.employees!.some((pe) => pe.emp.name === emp.name)
  );

  return validEmployeeDropdown?.map((emp) => emp.name);
}

function detachEmployee(
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  project: Project,
  employee: { emp: Employee; allocation: number }
) {
  setProjects((prev) =>
    prev.map((p) =>
      p.name.trim().toUpperCase() === project.name.trim().toUpperCase()
        ? {
            ...p,
            employees: p.employees?.filter(
              (e) =>
                e.emp.name.trim().toUpperCase() !==
                employee.emp.name.trim().toUpperCase()
            ),
          }
        : p
    )
  );
}
