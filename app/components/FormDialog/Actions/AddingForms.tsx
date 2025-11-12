import React, {useState} from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//Forms
import FormsName from '../../../shared/FormsInputs/FormsName';
import FormsDate from '../../../shared/FormsInputs/FormsDate';
import FormsRole from '../../../shared/FormsInputs/FormsRole';
import FormsTeam from '../../../shared/FormsInputs/FormsTeam';

import './ActionForms.css';
import { EmployeeObj } from '../../Employees/Props';
import { ProjectObj } from '../../Projects/Props';

export function AddingEmployeeForms(
    {open, 
        onClose,
        setEmployee,
    }:{ open: boolean,
        onClose: () => void,
        setEmployee: React.Dispatch<React.SetStateAction<EmployeeObj[]>>,
    }){

    const [formValues, setFormValues] = useState({
        name: "",
        date: "",
        role: "",
        team: ""
    });
    
    const handleChange = (field: string, value: string) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setEmployee(prev => {
            const newID = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
            const newEmployee: EmployeeObj = {
                id: newID,
                name: formValues.name,
                date: new Date(formValues.date),
                role: formValues.role,
                team: formValues.team
            };
            return [...prev, newEmployee];
        });

        onClose();
    };

    return (
        <React.Fragment>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="addEmployee-form">
                    <FormsName value={formValues.name} onChange={(value) => handleChange("name", value)} />
                    <FormsDate value={formValues.date} onChange={(value) => handleChange("date", value)} />
                    <FormsRole value={formValues.role} onChange={(value) => handleChange("role", value)} />
                    <FormsTeam value={formValues.team} onChange={(value) => handleChange("team", value)} />
                </form>
            </DialogContent>
            <DialogActions>
                <Button className="actionButton" type="submit" form="addEmployee-form">
                    Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}

export function AddingProjectForms(
    {open, 
        onClose,
        setProject,
    }:{ open: boolean,
        onClose: () => void,
        setProject: React.Dispatch<React.SetStateAction<ProjectObj[]>>,
    }){

    const [projectName, setProjectName] = useState("");
    
    const handleChange = (name: string) => {
        setProjectName(name);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setProject(prev => {
            const newID = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
            const newProject: ProjectObj = {
                id: newID,
                name: projectName,
            };
            return [...prev, newProject];
        });

        onClose();
    };

    return (
        <React.Fragment>
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Project</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="addProject-form">
                    <FormsName value={projectName} onChange={(val) => handleChange(val)} />
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