import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../Forms.css';
import { IndividualEmployee } from '../../../containers/Employees/Props';
import { useNavigate } from 'react-router-dom';

// TODO: Finish the local management and deletion

export default function DeleteEmployee({setEmployee}:{setEmployee:React.Dispatch<React.SetStateAction<IndividualEmployee[]>>}){

    // Routing - Link doesn't work so Navigate is an alternative
    const navigate = useNavigate();
    const onClose = () => navigate("/");

    return (
        <React.Fragment>
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogContent>Are you sure you want to delete Employee X and this allocation to projects?</DialogContent>
            <DialogActions>
                <Button className="actionButton" type="submit">
                    Delete
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}

