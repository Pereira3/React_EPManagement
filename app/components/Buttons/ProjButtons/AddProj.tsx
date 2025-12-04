import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// Forms
import FormsText from '../../Forms/Types/FormsText';
import { Project } from '@/app/page';
// Importing Style Sheet
import '../../../page.css';

export default function AddProject({
    setProjectAP, 
    setShowAdd
} : {
    setProjectAP:React.Dispatch<React.SetStateAction<Project[]>>,
    setShowAdd:React.Dispatch<React.SetStateAction<'Add' | 'Delete' | null>>
}){

    // Initialization of Form values
    const [projectName, setProjectName] = useState("");
    
    // Setter of the input given for the Project Name
    const handleChange = (name: string) => {
        setProjectName(name);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setProjectAP(prev => {
            // I wanted the ID automatic so if the ID is the first one being introduced, the 0 (Default initial value) will be replace for 1
            // If there's already one project, the ID of the new project created will be the last project ID + 1
            const newID = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
            // Sets a new Project into the Object (ProjectObj)
            const newProject: Project = {
                id:newID,
                name:projectName,
            };
            return [...prev, newProject];
        });

        setShowAdd(null);
    };

    return (
        <React.Fragment>
        <Dialog open={true} onClose={ () => setShowAdd(null) }>
            <DialogTitle>Add Project</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="addProject-form">
                    <FormsText value={projectName} onChange={(val) => handleChange(val)} />
                </form>
            </DialogContent>
            <DialogActions>
                <button className="actionButton" type="submit" form="addProject-form">
                    Add
                </button>
                <button onClick={ () => setShowAdd(null) }>Cancel</button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}