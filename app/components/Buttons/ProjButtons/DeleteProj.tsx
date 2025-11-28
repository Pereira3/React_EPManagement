// ----- IMPORTS -----
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Project } from '@/app/page';

//TODO: Deletion is only made to the project, If I Implement the link to the employees it will not be treated.

export default function DeleteProject({
    setProjectDP,
    setShowDelete,
    projectSelected,
}:{
    setProjectDP:React.Dispatch<React.SetStateAction<Project[]>>,
    setShowDelete:React.Dispatch<React.SetStateAction<'Add' | 'Delete' | null>>,
    projectSelected: Project;
}){

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setProjectDP(prev => {
            return prev.filter(project => project.id !== projectSelected.id);
        });

        setShowDelete(null);
    };

    return (
        <React.Fragment>
        <Dialog open={true} onClose={ () => setShowDelete(null) }>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogContent>Are you sure you want to delete Project <strong>{projectSelected.name}</strong> and all the employees allocated to it?</DialogContent>
            <DialogActions>
                <form onSubmit={handleSubmit}>
                    <Button className="actionButton" type="submit">
                        Delete
                    </Button>
                    <Button onClick={() => setShowDelete(null)}>Cancel</Button>
                </form>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}