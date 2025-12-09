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

        setProjectAP(projects => {
            
            const newID = generatingID(projects);

            const newProject: Project = {
                id:newID,
                name:projectName,
            };
            return [...projects, newProject];
        });

        setShowAdd(null);
    };

    return (
        <React.Fragment>
        <Dialog open={true} onClose={ () => setShowAdd(null) }>
            <DialogTitle>Add Project</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="addProject-form">
                    <FormsText value={projectName} updt={(val) => handleChange(val)} />
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

function generatingID(projects:Project[]){

    let randomID = Math.floor(Math.random() * 50);

    if( projects.some((proj) => proj.id === randomID) ){
        return generatingID(projects);
    }else{
        return randomID;
    }
}