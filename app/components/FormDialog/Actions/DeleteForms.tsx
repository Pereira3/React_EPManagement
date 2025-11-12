import React, {useState} from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import './ActionForms.css';

export function DeleteEmployeeForms({ open, onClose }:{ open: boolean; onClose: () => void }){

    return (
        <React.Fragment>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogContent>Are you sure you want to delete employee X and this allocation to projects?</DialogContent>
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

export function DeleteProjectForms({ open, onClose }:{ open: boolean; onClose: () => void }){

    return (
        <React.Fragment>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogContent>Are you sure you want to delete Project X and all the employees allocated to it?</DialogContent>
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