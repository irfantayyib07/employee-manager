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
import { useAppSelector } from "@/app/store";
import { useEffect, useState } from "react";
import { selectEmployeeById, useUpdateEmployeeMutation } from "@/app/employeeApiSlice";
import { useToast } from "./ui/use-toast";
import SupervisorSelector from "./ui/supervisor-selector";

function EditEmployee({
 employee,
 loadingState,
}: {
 employee: Employee;
 loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
 const [loading, setLoading] = loadingState;
 const [name, setName] = useState(employee.name);

 const formerSupervisor = useAppSelector((state) => selectEmployeeById(state, employee.supervisorId));

 useEffect(() => {
  if (!formerSupervisor) setSelectedSupervisorId("-");
 }, [formerSupervisor]);

 const [selectedSupervisorId, setSelectedSupervisorId] = useState(formerSupervisor?.id);
 const supervisorToBe = useAppSelector((state) => selectEmployeeById(state, selectedSupervisorId));

 const [updateEmployee] = useUpdateEmployeeMutation();

 const { toast } = useToast();

 const onEditEmployeeClicked = async () => {
  try {
   if (name.length < 3 || (name === employee.name && selectedSupervisorId === employee.supervisorId)) {
    setName(employee.name);
    return;
   }

   const jobs = [updateEmployee({ id: employee.id, name, supervisorId: selectedSupervisorId }).unwrap()];

   if (supervisorToBe) {
    jobs.push(
     updateEmployee({
      id: selectedSupervisorId,
      subordinates: [...new Set([...supervisorToBe.subordinates, employee.id])],
     }).unwrap(),
    );
   }

   if (formerSupervisor && formerSupervisor.id !== "-" && selectedSupervisorId !== formerSupervisor.id) {
    jobs.push(
     updateEmployee({
      id: formerSupervisor.id,
      subordinates: formerSupervisor.subordinates.filter((id) => id !== employee.id),
     }).unwrap(),
    );
   }

   setLoading(true);
   await Promise.all(jobs);

   toast({
    title: "Done!",
    description: "Employee updated successfully!",
   });
  } catch (err) {
   console.error("Failed to update the employee", err);
   toast({
    variant: "destructive",
    title: "Failure!",
    description: "Something went wrong!",
   });
  } finally {
   setLoading(false);
  }
 };

 return (
  <Dialog>
   <DialogTrigger asChild>
    <Button className="rounded-full size-8 aspect-square p-0" disabled={loading}>
     <Pencil className="size-4" />
    </Button>
   </DialogTrigger>
   <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
     <DialogTitle>Edit the employee</DialogTitle>
     <DialogDescription>Edit the details of your employee. Click save when you're done.</DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
     <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
       Name
      </Label>
      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
     </div>
     <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="username" className="text-right">
       Supervisor
      </Label>
      <SupervisorSelector
       employee={employee}
       defaultValue={formerSupervisor}
       supervisorId={selectedSupervisorId}
       setSupervisorId={setSelectedSupervisorId}
      />
     </div>
    </div>
    <DialogFooter>
     <DialogClose asChild>
      <Button type="submit" onClick={onEditEmployeeClicked}>
       Save
      </Button>
     </DialogClose>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}

export default EditEmployee;
