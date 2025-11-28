// ----- IMPORTS -----
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormsText from '../../Forms/Types/FormsText';
import FormsDate from '../../Forms/Types/FormsDate';
import FormsSelector from '../../Forms/Types/FormsSelector';
import FormsDropdown from '../../Forms/Types/FormsDropdown';
import { Employee } from '@/app/page';

// TODO: Date and Role are not pre selected - This needs a solution

export default function EditEmp({
    setEmployeeEE,
    setShowEdit,
    employeeSelected,
}:{
    setEmployeeEE:React.Dispatch<React.SetStateAction<Employee[]>>
    setShowEdit:React.Dispatch<React.SetStateAction<'Add' | 'Edit' | 'Delete' | null>>
    employeeSelected: Employee;
}){

    
    const [formValues, setFormValues] = useState({
        name: employeeSelected.name,
        date: employeeSelected.date.toLocaleDateString('en-GB'),
        role: employeeSelected.role,
        team: employeeSelected.team,
    });
    
    const handleChange = (field: string, value: string) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    };

    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setEmployeeEE(prev => {
            return prev.map(employee =>
                employee.id === employeeSelected.id ? {
                    ...employee,
                    name: formValues.name,
                    date: new Date(formValues.date),
                    role: formValues.role,
                    team: formValues.team,
                }
                : employee
            );
        });

        setShowEdit(null);
    };

    return (
        <Dialog open={true} onClose={() => setShowEdit(null)}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit} id="editEmployee-form">
                <FormsText value={formValues.name} onChange={val => handleChange('name', val)} />
                <FormsDate value={formValues.date} onChange={val => handleChange('date', val)} />
                <FormsSelector value={formValues.role} onChange={val => handleChange('role', val)} />
                <FormsDropdown value={formValues.team} onChange={val => handleChange('team', val)} />
            </form>
        </DialogContent>
        <DialogActions>
            <Button className="actionButton" type="submit" form="editEmployee-form">
            Edit
            </Button>
            <Button onClick={() => setShowEdit(null)}>Cancel</Button>
        </DialogActions>
        </Dialog>
    );
}