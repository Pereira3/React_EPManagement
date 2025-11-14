import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormsText from '../Types/FormsText';
import '../Forms.css';
import { IndividualProject } from '../../../containers/Projects/Props';
import { useNavigate } from 'react-router-dom';

export default function AddProject({setProject}:{setProject: React.Dispatch<React.SetStateAction<IndividualProject[]>>}){

    // Routing - Link doesn't work so Navigate is an alternative
    const navigate = useNavigate();
    const onClose = () => navigate("/projects");

    // Initialization of Form values
    const [projectName, setProjectName] = useState("");
    
    // Setter of the input given for the Project Name
    const handleChange = (name: string) => {
        setProjectName(name);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setProject(prev => {
            // I wanted the ID automatic so if the ID is the first one being introduced, the 0 (Default initial value) will be replace for 1
            // If there's already one project, the ID of the new project created will be the last project ID + 1
            const newID = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
            // Sets a new Project into the Object (ProjectObj)
            const newProject: IndividualProject = {
                id: newID,
                name: projectName,
            };
            return [...prev, newProject];
        });

        onClose();
    };

    return (
        <React.Fragment>
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Add Project</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="addProject-form">
                    <FormsText value={projectName} onChange={(val) => handleChange(val)} />
                </form>
            </DialogContent>
            <DialogActions>
                <Button className="actionButton" type="submit" form="addProject-form">
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}