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
import dayjs, { Dayjs } from "dayjs";
import '../../../page.css';

export default function AddEmp({
    setEmployeeAE, 
    setShowAdd,
} : {
    setEmployeeAE:React.Dispatch<React.SetStateAction<Employee[]>>,
    setShowAdd:React.Dispatch<React.SetStateAction<'Add' | 'Edit' | 'Delete' | null>>
}){
    
    const [formValues, setFormValues] = useState<{
        name: string;
        date: Dayjs;
        role: string;
        team: string;
    }>({
        name: "",
        date: dayjs(),
        role: "None",
        team: "Not Defined",
    });

    const handleChange = (field: string, value: string) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dateFormatted = formValues.date.format("DD-MM-YYYY");

        setEmployeeAE(employees => {

            const newID = generatingID(employees); 
            
            const newEmployee:Employee = {
                id: newID,
                name: formValues.name,
                date: dateFormatted,
                role: formValues.role,
                team: formValues.team,
            };
            return [...employees, newEmployee];
        });

        setShowAdd(null);
    };

    return (
        <React.Fragment>
        <Dialog open={true} onClose={ () => setShowAdd(null) }>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="addEmployee-form">
                    <FormsText value={formValues.name} updt={(val) => handleChange("name", val)} />
                    <FormsDate value={formValues.date} updt={(val) => handleChange("date", val)} />
                    <FormsSelector value={formValues.role} updt={(val) => handleChange("role", val)} />
                    <FormsDropdown value={formValues.team} updt={(val) => handleChange("team", val)} />
                </form>
            </DialogContent>
            <DialogActions>
                <button className="actionButton" type="submit" form="addEmployee-form">
                    Add
                </button>
                <button onClick={ () => setShowAdd(null) }>Cancel</button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}

function generatingID(employees:Employee[]){

    let randomID = Math.floor(Math.random() * 1000);

    if( employees.some((emp) => emp.id === randomID) ){
        return generatingID(employees);
    }else{
        return randomID;
    }
}