import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../Forms.css';
import { IndividualProject } from '../../../containers/Projects/Props';
import { useNavigate } from 'react-router-dom';

// TODO: Finish the local management and deletion

export default function DeleteProject({setProject}:{setProject: React.Dispatch<React.SetStateAction<IndividualProject[]>>}){

    // Routing - Link doesn't work so Navigate is an alternative
    const navigate = useNavigate();
    const onClose = () => navigate("/projects");

    return (
        <React.Fragment>
        <Dialog open={true} onClose={onClose}>
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