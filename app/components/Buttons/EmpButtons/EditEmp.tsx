// ----- IMPORTS -----
import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormsText from '../../Forms/Types/FormsText';
import FormsDate from '../../Forms/Types/FormsDate';
import FormsSelector from '../../Forms/Types/FormsSelector';
import FormsDropdown from '../../Forms/Types/FormsDropdown';
import { Employee } from '@/app/page';
import dayjs from 'dayjs';
// Importing Style Sheet
import '../../../page.css';

export default function EditEmp({
    setEmployeeEE,
    setShowEdit,
    employeeSelected,
    setSelectEmployee,
}:{
    setEmployeeEE:React.Dispatch<React.SetStateAction<Employee[]>>
    setShowEdit:React.Dispatch<React.SetStateAction<'Add' | 'Edit' | 'Delete' | null>>
    employeeSelected: Employee | null;
    setSelectEmployee:React.Dispatch<React.SetStateAction<Employee | null>>;
}){
    
    if(employeeSelected !== null){

        const [formValues, setFormValues] = useState({
            name: employeeSelected.name,
            date: dayjs(employeeSelected.date, "DD-MM-YYYY"),
            role: employeeSelected.role,
            team: employeeSelected.team,
        });

        const handleChange = (field: string, value: string) => {
            setFormValues(prev => ({ ...prev, [field]: value }));
        };

        
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const dateFormatted = formValues.date.format("DD-MM-YYYY");

            setEmployeeEE(prev => {
                return prev.map(employee =>
                    employee.id === employeeSelected.id ? {
                        ...employee,
                        name: formValues.name,
                        date: dateFormatted,
                        role: formValues.role,
                        team: formValues.team,
                    }
                    : employee
                );
            });

            setShowEdit(null);
            setSelectEmployee(null);
        };

        return (
            <Dialog open={true} onClose={() => {setShowEdit(null); setSelectEmployee(null);}}>
                <DialogTitle>Edit Employee</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} id="editEmployee-form">
                        <FormsText value={formValues.name} updt={val => handleChange('name', val)} />
                        <FormsDate value={formValues.date} updt={(value) => handleChange("date", value)} />
                        <FormsSelector value={formValues.role} updt={val => handleChange('role', val)} />
                        <FormsDropdown value={formValues.team} updt={val => handleChange('team', val)} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <button className="actionButton" type="submit" form="editEmployee-form">
                        Edit
                    </button>
                    <button onClick={() => setShowEdit(null)}>Cancel</button>
                </DialogActions>
            </Dialog>
        );
    }else{
        return (
            <React.Fragment>
                <Dialog open={true} onClose={ () => setShowEdit(null) }>
                    <DialogTitle>Employee Not Selected</DialogTitle>
                    <DialogContent>You have to select one employee to be able to edit it.</DialogContent>
                    <DialogActions>
                        <button className="actionButton" onClick={() => {setShowEdit(null)}}>OK</button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}