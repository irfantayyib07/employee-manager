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
import { Plus } from "lucide-react";
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectLabel,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { useAddNewEmployeeMutation } from "@/features/employees/employeeApiSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

export function SupervisorSelect({ supervisor, setSupervisor }) {
 const supervisors = useSelector(state => state.supervisors);

 return (
  <Select value={supervisor} onValueChange={setSupervisor}>
   <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a supervisor" />
   </SelectTrigger>
   <SelectContent>
    <SelectGroup>
     <SelectLabel>Supervisors</SelectLabel>
      {
       supervisors?.map(supervisor => {
        return <SelectItem key={supervisor.id} value={supervisor.id}>{supervisor.name}</SelectItem>
       })
      }
    </SelectGroup>
   </SelectContent>
  </Select>
 );
}

export function AddEmployee() {
 const [name, setName] = useState("");
 const [supervisor, setSupervisor] = useState("");

 const [addNewEmployee] = useAddNewEmployeeMutation()

 const onAddEmployeeClicked = async () => {
  try {
   await addNewEmployee({ name, supervisorId: Number(supervisor) }).unwrap();
  } catch (err) {
   console.error('Failed to add the employee', err);
  }
 };

 return (
  <Dialog>
   <DialogTrigger asChild>
    <Button className="rounded-full size-10 aspect-square p-0 absolute bottom-8 right-8"><Plus className="size-6" /></Button>
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
      <SupervisorSelect supervisor={supervisor} setSupervisor={setSupervisor} />
     </div>
    </div>
    <DialogFooter>
     <Button type="submit" onClick={onAddEmployeeClicked}>Save</Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
