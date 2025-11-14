// The collection of Projects
export type ProjectsObj = {
    projects:IndividualProject[],
    setProject:React.Dispatch<React.SetStateAction<IndividualProject[]>>,
};

// TODO: Complete with Employees IDs
// Parameters for Each Project
export type IndividualProject = {
    id:number,
    name:string,
}