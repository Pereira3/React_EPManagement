import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormsText from '../Types/FormsText';
import FormsDate from '../Types/FormsDate';
import FormsSelector from '../Types/FormsSelector';
import FormsDropdown from '../Types/FormsDropdown';
import '../Forms.css';
import { IndividualEmployee } from '../../../containers/Employees/Props';
import { useNavigate } from 'react-router-dom';

export default function AddEmployee({setEmployee}:{setEmployee:React.Dispatch<React.SetStateAction<IndividualEmployee[]>>}){

    // Routing - Link doesn't work so Navigate is an alternative
    const navigate = useNavigate();
    const onClose = () => navigate("/");

    // Initialization of Form values
    const [formValues, setFormValues] = useState({
        name: "",
        date: "",
        role: 'None',
        team: 'Not Defined'
    });
    
    // Loads the values for the setter based on the field called on lines 64-67 ("name" - "team")
    const handleChange = (field: string, value: string) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setEmployee(prev => {
            // I wanted the ID automatic so if the ID is the first one being introduced, the 0 (Default initial value) will be replace for 1
            // If there's already one employee, the ID of the new employee created will be the last employee ID + 1
            const newID = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
            // Sets a new Employee into the Object (EmployeesObj)
            const newEmployee: IndividualEmployee = {
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
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="addEmployee-form">
                    <FormsText value={formValues.name} onChange={(value) => handleChange("name", value)} />
                    <FormsDate value={formValues.date} onChange={(value) => handleChange("date", value)} />
                    <FormsSelector value={formValues.role} onChange={(value) => handleChange("role", value)} />
                    <FormsDropdown value={formValues.team} onChange={(value) => handleChange("team", value)} />
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