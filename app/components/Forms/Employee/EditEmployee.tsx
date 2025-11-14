import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormsName from '../Types/FormsText';
import FormsDate from '../Types/FormsDate';
import FormsRole from '../Types/FormsSelector';
import FormsTeam from '../Types/FormsDropdown';
import '../Forms.css';
import { IndividualEmployee } from '../../../containers/Employees/Props';

// TODO: Finish the local management and change

export default function EditEmployee({setEmployee}:{setEmployee:React.Dispatch<React.SetStateAction<IndividualEmployee[]>>}){

    const [dialog, setDialog] = useState(false);
    // Initialization of a function to control the Dialogs
    const onClose = () => setDialog(false);

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
        onClose();
    };

    return (
        <React.Fragment>
        <Dialog open={dialog} onClose={onClose}>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="addEmployee-form">
                    <FormsName value={formValues.name} onChange={(val) => handleChange("name", val)} />
                    <FormsDate value={formValues.date} onChange={(val) => handleChange("date", val)} />
                    <FormsRole value={formValues.role} onChange={(val) => handleChange("role", val)} />
                    <FormsTeam value={formValues.team} onChange={(val) => handleChange("team", val)} />
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