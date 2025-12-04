import { Project } from "@/app/page";
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import '../../../page.css';

export default function Assignment({
    project,
    setShowAssign,
}:{
    project:Project,
    setShowAssign:React.Dispatch<React.SetStateAction<boolean>>,
}){
    console.log(project);
    console.log(project.employees?.length);
    return (
        <Dialog open={true} onClose={ () => setShowAssign(false) }>
            <DialogTitle>Project: {project.name}</DialogTitle>
            <DialogContent>
                {DataTable(project)}
            </DialogContent>
            <DialogActions>
                <button className="actionButton" onClick={ () => setShowAssign(false) }>OK</button>
            </DialogActions>
        </Dialog>
    );
}

function DataTable(project:Project){
    return(
        <TableContainer className="TableContainer" >
            <Table stickyHeader className="Table">
            <TableHead className="TableHead">
                <TableRow>
                <TableCell className='tableColumn'>Project</TableCell>
                <TableCell className='tableColumn'>Allocation</TableCell>
                <TableCell className='tableColumn'></TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="TableBody" >
                { project.employees?.length === 0 ? "Project without Employees" : "Project WITH Employees" }
            </TableBody>
            </Table>
        </TableContainer>
    );
}