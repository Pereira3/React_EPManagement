export type EmployeesObj = {
    employees:EmployeeObj[],
    setEmployees:React.Dispatch<React.SetStateAction<EmployeeObj[]>>,
    openDialog:boolean,
    action:string,
    handleClicks: (val:string) => void,
    handleDialog: () => void, 
};

export type EmployeeObj = {
    id:number;
    name:string;
    date:Date;
    role:string;
    team:string;
}