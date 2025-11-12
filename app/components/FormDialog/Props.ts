import { EmployeeObj } from "../Employees/Props";
import { ProjectObj } from "../Projects/Props";

export type FormDialogProps<T> = {
    setEmployee?: React.Dispatch<React.SetStateAction<EmployeeObj[]>>,
    setProject?: React.Dispatch<React.SetStateAction<ProjectObj[]>>,
    open:boolean,
    action:string,
    onClose: () => void,
};