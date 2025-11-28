import { useState } from 'react';
// Importing Icons
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

import '../../page.css';
import AddEmp from './EmpButtons/AddEmp';
import EditEmp from './EmpButtons/EditEmp';
import DeleteEmp from './EmpButtons/DeleteEmp';
import { Employee } from '@/app/page';

//TODO: Treat The exception of Edit and Delete where there's no Employee selected

export default function EmployeeTopButtons({
    setEmployeeTB,
    selectedEmp,
} : {
    setEmployeeTB:React.Dispatch<React.SetStateAction<Employee[]>>,
    selectedEmp:Employee | null,
}){

    const [action, setAction] = useState<'Add' | 'Edit' | 'Delete' | null>(null);

    return (
        <div className="managementButtons">
            <button onClick={() => setAction('Add')}>
                <AddOutlinedIcon />
                <span>Add</span>
            </button>
            <button onClick={() => {setAction('Edit');}}>
                <CreateOutlinedIcon />
                <span>Edit</span>
            </button>
            <button onClick={() => setAction('Delete')}>
                <RemoveOutlinedIcon />
                <span>Delete</span>
            </button>

            {action === 'Add' && <AddEmp setEmployeeAE={setEmployeeTB} setShowAdd={setAction} />}
            {action === 'Edit' && selectedEmp && (<EditEmp setEmployeeEE={setEmployeeTB} setShowEdit={setAction} employeeSelected={selectedEmp} />)}
            {action === 'Delete' && <DeleteEmp setEmployeeDE={setEmployeeTB} setShowDelete={setAction} />}

        </div>
    );
}