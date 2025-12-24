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
import ProjectsButton from "@/app/components/Buttons/Projects/ProjectsButton";
// Importing Contexts
import { useProjectContext } from "@/app/context/ProjectContext";
import { useWebContext } from "@/app/context/WebContext";

// TODO: Missing sort feature

export default function Projects() {
  
  const { assignment, setAssignment, setAction } = useWebContext();
  
  const {
    lstofProjects,
    selectedProject,
    setSelectedProject,
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
                <TableCell>Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="TableBody">
              {lstofProjects.map((project) => (
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
