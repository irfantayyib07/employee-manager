import { Button } from "@/components/ui/button";
import {
 Dialog,
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
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectLabel,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectSupervisorById } from "@/features/supervisors/supervisosSlice";
import { useUpdateEmployeeMutation } from "@/features/employees/employeeApiSlice";

export function SupervisorSelect({ defaultValue, supervisor, setSupervisor }) {
 const supervisors = useSelector(state => state.supervisors);

 return (
  <Select value={supervisor} onValueChange={setSupervisor} defaultValue={defaultValue.id}>
   <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a supervisor" />
   </SelectTrigger>
   <SelectContent>
    <SelectGroup>
     <SelectLabel>Supervisors</SelectLabel>
     {
      supervisors.map(supervisor => {
       return <SelectItem key={supervisor.id} value={supervisor.id}>{supervisor.name}</SelectItem>;
      })
     }
    </SelectGroup>
   </SelectContent>
  </Select>
 );
}

export function EditEmployee({ employee }) {
 const defaultValue = useSelector(state => selectSupervisorById(state, employee.supervisorId));
 const [name, setName] = useState(employee.name);
 const [supervisor, setSupervisor] = useState();

 const [updateEmployee] = useUpdateEmployeeMutation()

 const onEditEmployeeClicked = async () => {
  try {
   await updateEmployee({ id: employee.id, name, supervisorId: Number(supervisor) }).unwrap();
  } catch (err) {
   console.error('Failed to update the employee', err);
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
      <SupervisorSelect defaultValue={defaultValue} supervisor={supervisor} setSupervisor={setSupervisor} />
     </div>
    </div>
    <DialogFooter>
     <Button type="submit" onClick={onEditEmployeeClicked}>Save</Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
