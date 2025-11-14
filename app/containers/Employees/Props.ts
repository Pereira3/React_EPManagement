// The collection of Employees
export type EmployeesObj = {
    employees:IndividualEmployee[],
    setEmployee:React.Dispatch<React.SetStateAction<IndividualEmployee[]>>,
};

// Parameters for Each Employee
export type IndividualEmployee = {
    id:number;
    name:string;
    date:Date;
    role:string;
    team:string;
}