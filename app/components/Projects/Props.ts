export type ProjectsObj = {
    projects:ProjectObj[],
    setProjects:React.Dispatch<React.SetStateAction<ProjectObj[]>>,
    openDialog:boolean,
    action:string,
    handleClicks: (val:string) => void,
    handleDialog: () => void,
};

export type ProjectObj = {
    id:number,
    name:string,
}