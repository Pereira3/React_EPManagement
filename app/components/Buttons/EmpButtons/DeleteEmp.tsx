// ----- IMPORTS -----
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Employee } from '@/app/page';
// Importing Style Sheet
import '../../../page.css';

// TODO: Finish the local management and deletion

export default function DeleteEmp({
    setEmployeeDE,
    setShowDelete,
    employeeSelected,
    setSelectEmployee,
}:{
    setEmployeeDE:React.Dispatch<React.SetStateAction<Employee[]>>,
    setShowDelete:React.Dispatch<React.SetStateAction<'Add' | 'Edit' | 'Delete' | null>>,
    employeeSelected:Employee | null,
    setSelectEmployee:React.Dispatch<React.SetStateAction<Employee | null>>;
}){
    if(employeeSelected !== null){
        return (
            <React.Fragment>
                <Dialog open={true} onClose={ () => {setShowDelete(null); setSelectEmployee(null);}}>
                    <DialogTitle>Delete Employee</DialogTitle>
                    <DialogContent>Are you sure you want to delete Employee <strong>{employeeSelected.name}</strong> and this allocation to projects?</DialogContent>
                    <DialogActions>
                        <button className="actionButton" type="submit">
                            Delete
                        </button>
                        <button onClick={ () => setShowDelete(null)}>Cancel</button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }else{
        return (
            <Dialog open={true} onClose={ () => setShowDelete(null) }>
                <DialogTitle>Employee Not Selected</DialogTitle>
                <DialogContent>You have to select one employee to be able to delete it.</DialogContent>
                <DialogActions>
                    <button className="actionButton" onClick={() => {setShowDelete(null)}}>OK</button>
                </DialogActions>
            </Dialog>
        );
    }
}

