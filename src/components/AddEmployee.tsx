import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { selectEmployeeById, useAddNewEmployeeMutation, useUpdateEmployeeMutation } from "@/app/employeeApiSlice";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import SupervisorSelector from "./ui/SupervisorSelector";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

export function AddEmployee() {
 const [name, setName] = useState("");
 const [supervisorId, setSupervisorId] = useState("—");
 const { toast } = useToast();

 const [addNewEmployee] = useAddNewEmployeeMutation();
 const [updateEmployee] = useUpdateEmployeeMutation();

 const supervisor = useSelector(state => selectEmployeeById(state, supervisorId));

 const onAddEmployeeClicked = async () => {
  try {
   if (name.length < 3) {
    setName("");
    setSupervisorId("—");
    return;
   };

   const id = uuidv4();
   const jobs = [addNewEmployee({ id, name, supervisorId: supervisorId, subordinates: [] }).unwrap()];
   if (supervisor) jobs.push(updateEmployee({ id: supervisorId, subordinates: [...new Set([...supervisor?.subordinates, id])] }).unwrap());
   await Promise.all(jobs);
   setName("");
   setSupervisorId("—");
   toast({
    title: "Done!",
    description: "Employee added successfully!",
   });
  } catch (err) {
   console.error('Failed to add the employee', err);
   toast({
    variant: "destructive",
    title: "Failure!",
    description: "Something went wrong!",
   });
  }
 };

 return (
  <Dialog>
   <DialogTrigger asChild>
    <Button className="rounded-full size-10 aspect-square p-0 fixed bottom-8 right-8"><Plus className="size-6" /></Button>
   </DialogTrigger>
   <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
     <DialogTitle>Add an employee</DialogTitle>
     <DialogDescription>
      Fill in the details of your employee. Click save when you're done.
     </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
     <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
       Name
      </Label>
      <Input
       id="name"
       value={name}
       onChange={e => setName(e.target.value)}
       className="col-span-3"
       required={true}
      />
     </div>
     <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="username" className="text-right">
       Supervisor
      </Label>
      <SupervisorSelector supervisorId={supervisorId} setSupervisorId={setSupervisorId} />
     </div>
    </div>
    <DialogFooter>
     <DialogClose asChild>
      <Button type="submit" onClick={onAddEmployeeClicked}>Save</Button>
     </DialogClose>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}



export default AddEmployee;
