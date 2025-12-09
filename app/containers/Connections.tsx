import { Employee, Project } from "@/app/page";
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import '../page.css';

export default function Connections({
    project,
    setShowAssign,
}:{
    project:Project,
    setShowAssign:React.Dispatch<React.SetStateAction<boolean>>,
}){

    return (
        <Dialog open={true} onClose={() => setShowAssign(false)}>
        <DialogTitle>Project: {project.name}</DialogTitle>

        <DialogContent>
            <TableContainer className="TableContainer">
            <Table stickyHeader className="Table">
                <TableHead className="TableHead">
                <TableRow>
                    <TableCell className="tableColumn">Employee</TableCell>
                    <TableCell className="tableColumn">Allocation</TableCell>
                    <TableCell className="tableColumn" />
                </TableRow>
                </TableHead>

                <TableBody className="TableBody">
                {project.employees !== undefined ? (
                    <TableRow className="TableRow">
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="center">
                        <button onClick={() => setShowAssign(false)}>Save</button>
                        </TableCell>
                    </TableRow>
                ) : (
                    <TableRow>
                    {/* Adjust colSpan to your number of columns */}
                    <TableCell colSpan={3} align="center">
                        Project WITHOUT Employees
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
        </DialogContent>

        <DialogActions>
            <button className="actionButton" onClick={() => setShowAssign(false)}>
            OK
            </button>
        </DialogActions>
        </Dialog>
    );
}
