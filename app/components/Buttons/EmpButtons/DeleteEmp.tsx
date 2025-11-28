// ----- IMPORTS -----
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Employee } from '@/app/page';

// TODO: Finish the local management and deletion

export default function DeleteEmp({
    setEmployeeEE,
    setShowEdit,
    employeeSelected,
}:{
    setEmployeeEE:React.Dispatch<React.SetStateAction<Employee[]>>
    setShowEdit:React.Dispatch<React.SetStateAction<'Add' | 'Edit' | 'Delete' | null>>
    employeeSelected: Employee;
}){

    return (
        <React.Fragment>
        <Dialog open={true} onClose={ () => setShowDelete(null) }>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogContent>Are you sure you want to delete Employee X and this allocation to projects?</DialogContent>
            <DialogActions>
                <Button className="actionButton" type="submit">
                    Delete
                </Button>
                <Button onClick={ () => setShowDelete(null) }>Cancel</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}

