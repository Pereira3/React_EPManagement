// Importing Table
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
import Connections from "./Connections";
import ProjectsButton from "../../components/Buttons/Projects/ProjectsButton";
import { useSetters } from "../../context/Setters";

// TODO: Missing sort feature

export default function Projects() {
  const {
    lstofProjects,
    selectedProject,
    setSelectedProject,
    setAction,
    assignment,
    setAssignment,
  } = useSetters();

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

        {assignment && selectedProject && <Connections />}
      </div>
    </div>
  );
}
