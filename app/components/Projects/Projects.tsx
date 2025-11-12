// Importing Files
import '../../globals.css';
import FormDialog from '../FormDialog/FormDialog';

// Importing Icons
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ProjectsObj } from './Props';

export default function Projects(
  {projects,
    setProjects,
    openDialog,
    action,
    handleClicks,
    handleDialog
  } : ProjectsObj){

    return(
        <div className="mainData">
          <div className="managementButtons">
            <button onClick={() => handleClicks("add")}>
              <AddOutlinedIcon />
              <span>Add</span>
            </button>

            <button onClick={() => handleClicks("delete")}>
              <RemoveOutlinedIcon />
              <span>Delete</span>
            </button>
          </div>

          <FormDialog setProject={setProjects} open={openDialog} action={action} onClose={handleDialog} />

          {/**API Data*/}
          <div className="data">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow
                      key={project.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {project.name}
                      </TableCell>
                      <TableCell align="right">Employees</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
    );
}