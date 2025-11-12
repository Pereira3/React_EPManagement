import { AddingEmployeeForms, AddingProjectForms } from './Actions/AddingForms';
import EditingForms from './Actions/EditingForms';
import {DeleteEmployeeForms, DeleteProjectForms} from './Actions/DeleteForms';

import { FormDialogProps } from './Props';

export default function FormDialog<T>(
  {setEmployee,
    setProject,
    open,
    action,
    onClose,
  }: FormDialogProps<T>){

  if(action === 'add'){
    if(setEmployee){
      return <AddingEmployeeForms open={open} onClose={onClose} setEmployee={setEmployee} />
    }else if(setProject){
      return <AddingProjectForms open={open} onClose={onClose} setProject={setProject} />
    }else{
      console.log('Error Adding Form Dialog Source');
    }
  }else if(action === 'edit'){
    if(setEmployee){
      return <EditingForms open={open} onClose={onClose} />
    }else{
      console.log('Error Editing Form Dialog Source');
    }
  }else if(action === 'delete'){
    if(setEmployee){
      return <DeleteEmployeeForms open={open} onClose={onClose} />
    }else if(setProject){
      return <DeleteProjectForms open={open} onClose={onClose} />
    }else{
      console.log('Error Delete Form Dialog Source');
    }
  }else if(action === ''){ // To avoid receiving the error message | Section is selected but the buttons for the actions were not pressed
    return;
  }else{
    console.log("Error FormDialog");
    return;
  }
}