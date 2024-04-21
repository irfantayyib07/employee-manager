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
import { Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectEmployeeById, useUpdateEmployeeMutation } from "@/app/employeeApiSlice";
import { useToast } from "./ui/use-toast";
import SupervisorSelector from "./ui/SupervisorSelector";

function EditEmployee({ employee }) {
 const defaultValue = useSelector(state => selectEmployeeById(state, employee.supervisorId));
 const [name, setName] = useState(employee.name);
 const [supervisorId, setSupervisorId] = useState(defaultValue?.id);
 const { toast } = useToast();

 const [updateEmployee] = useUpdateEmployeeMutation();

 const prevSupervisor = useSelector(state => selectEmployeeById(state, employee.supervisorId))
 const supervisor = useSelector(state => selectEmployeeById(state, supervisorId));

 const onEditEmployeeClicked = async () => {
  try {
   if (name.length < 3 || (name === employee.name && supervisorId == employee.supervisorId)) {
    setName(employee.name);
    return;
   };

   const jobs = [updateEmployee({ id: employee.id, name, supervisorId: supervisorId }).unwrap()];
   if (supervisor) {
    jobs.push(updateEmployee({ id: supervisorId, subordinates: [...new Set([...supervisor.subordinates, employee.id])] }).unwrap());
   }

   if (prevSupervisor && (supervisorId !== prevSupervisor.id)) {
    jobs.push(updateEmployee({ id: prevSupervisor.id, subordinates: [...new Set([...prevSupervisor.subordinates].filter(id => id !== employee.id))] }).unwrap());
   }

   await Promise.all(jobs);

   toast({
    title: "Done!",
    description: "Employee updated successfully!",
   });
  } catch (err) {
   console.error('Failed to update the employee', err);
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
    <Button className="rounded-full size-8 aspect-square p-0"><Pencil className="size-4" /></Button>
   </DialogTrigger>
   <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
     <DialogTitle>Add an employee</DialogTitle>
     <DialogDescription>
      Edit the details of your employee. Click save when you're done.
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
      />
     </div>
     <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="username" className="text-right">
       Supervisor
      </Label>
      <SupervisorSelector employee={employee} defaultValue={defaultValue} supervisorId={supervisorId} setSupervisorId={setSupervisorId} />
     </div>
    </div>
    <DialogFooter>
     <DialogClose asChild>
      <Button type="submit" onClick={onEditEmployeeClicked}>Save</Button>
     </DialogClose>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}

export default EditEmployee;
