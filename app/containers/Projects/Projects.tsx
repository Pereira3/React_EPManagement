// ---------- IMPORTS ----------
import "../containers.css";
// Importing MUI Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// Importing Icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
// Importing Components
import ProjectDetails from "@/app/containers/Projects/ProjectDetails";
import ProjectsButton from "./ProjectsButton";
// Importing Contexts
import { useProjectContext } from "@/app/context/ProjectContext";
import { useDialogContext } from "@/app/context/DialogContext";
import { TableSortLabel } from "@mui/material";

import { useProjectsLogic } from "./useProjectsLogic";

export default function Projects() {
  const { assignment, setAssignment, setAction } = useDialogContext();

  const {
    selectedProject,
    setSelectedProject,
    orderBy,
    setOrderBy,
  } = useProjectContext();


  return (
    <div className="mainArea">
      {/* Top Management Buttons */}
      <div className="managementButtons">
        <button onClick={() => setAction("Add")}>
          <AddOutlinedIcon />
          <span>Add</span>
        </button>
        <button onClick={() => setAction("Delete")}>
          <RemoveOutlinedIcon />
          <span>Delete</span>
        </button>

        <ProjectsButton />
      </div>
      {/** Display Data */}
      <div className="data">
        <TableContainer component={Paper} className="TableContainer">
          <Table stickyHeader className="Table">
            <TableHead className="TableHead">
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy !== null}
                    direction={orderBy || "asc"}
                    onClick={() => {
                      setOrderBy( orderBy === null ? "asc" : orderBy === "asc" ? "desc" : "asc");
                    }}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="TableBody">
              {useProjectsLogic()
                .useSortedlstofProjects()
                .map((project) => (
                  <TableRow
                    className="TableRow"
                    key={project.name}
                    selected={selectedProject?.name === project.name}
                    onClick={() => setSelectedProject(project)}
                  >
                    <TableCell>{project.name}</TableCell>
                    <TableCell align="center">
                      <button onClick={() => setAssignment(true)}>
                        Employees
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {assignment && selectedProject && <ProjectDetails />}
      </div>
    </div>
  );
}
