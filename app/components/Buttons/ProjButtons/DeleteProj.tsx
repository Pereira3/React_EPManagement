// ----- IMPORTS -----
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Project } from '@/app/page';
// Importing Style Sheet
import '../../../page.css';

//TODO: Deletion is only made to the project, If I Implement the link to the employees it will not be treated.

export default function DeleteProject({
    setProjectDP,
    setShowDelete,
    projectSelected,
    setSelectProject,
}:{
    setProjectDP:React.Dispatch<React.SetStateAction<Project[]>>,
    setShowDelete:React.Dispatch<React.SetStateAction<'Add' | 'Delete' | null>>,
    projectSelected:Project | null,
    setSelectProject:React.Dispatch<React.SetStateAction<Project | null>>;
}){

    if(projectSelected !== null){

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            // Takes the setProject array and filters to only keep/set the projects that have a diferent ID from the selected one
            setProjectDP(prev => {
                return prev.filter(project => project.id !== projectSelected.id);
            });

            setShowDelete(null);
        };

        return (
            <React.Fragment>
            <Dialog open={true} onClose={ () => {setShowDelete(null); setSelectProject(null)}}>
                <DialogTitle>Delete Project</DialogTitle>
                <DialogContent>Are you sure you want to delete Project <strong>{projectSelected.name}</strong> and all the employees allocated to it?</DialogContent>
                <DialogActions>
                    <form onSubmit={handleSubmit}>
                        <button className="actionButton" type="submit" >
                            Delete
                        </button>
                        <button onClick={() => setShowDelete(null)}>Cancel</button>
                    </form>
                </DialogActions>
            </Dialog>
            </React.Fragment>
        );
    }else{
        return (
            <Dialog open={true} onClose={ () => setShowDelete(null) }>
                <DialogTitle>Project Not Selected</DialogTitle>
                <DialogContent>You have to select one project to be able to delete it.</DialogContent>
                <DialogActions>
                    <button className="actionButton" onClick={() => {setShowDelete(null)}}>OK</button>
                </DialogActions>
            </Dialog>
        );
    }
    
}