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
import { Button } from "@/components/ui/button";
import {
 selectAllEmployees,
 selectEmployeeById,
 useDeleteEmployeeMutation,
 useUpdateEmployeeMutation,
} from "@/app/employeeApiSlice";
import { Trash } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useAppSelector } from "@/app/store";
import { getSubordinates } from "@/lib/utils";

function DeleteEmployee({
 employee,
 loadingState,
}: {
 employee: Employee;
 loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}) {
 const [loading, setLoading] = loadingState;

 const [updateEmployee] = useUpdateEmployeeMutation();
 const [deleteEmployee] = useDeleteEmployeeMutation();

 // const employees = useAppSelector(selectAllEmployees);
 const supervisor = useAppSelector((state) => selectEmployeeById(state, employee.supervisorId));

 const { toast } = useToast();

 const onDeleteEmployeeClicked = async () => {
  try {
   if (employee.subordinates.length > 0) {
    toast({
     variant: "destructive",
     title: "Failure!",
     description: "Cannot delete an employee who is a supervisor.",
    });

    return;
   }

   const jobs = [deleteEmployee({ id: employee.id }).unwrap()];

   if (supervisor)
    jobs.push(
     updateEmployee({
      id: supervisor.id,
      subordinates: supervisor.subordinates.filter((id) => id !== employee.id),
     }).unwrap(),
    );

   // const subordinates = getSubordinates(employees, employee);

   // subordinates?.map((subordinate) => {
   //  jobs.push(updateEmployee({ id: subordinate.id, supervisorId: "-" }).unwrap());
   // });

   setLoading(true);
   await Promise.all(jobs);

   toast({
    title: "Done!",
    description: "Employee deleted successfully!",
   });
  } catch (err) {
   console.error(`Failed to delete the employee: ${err}`);
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
    <Button variant="destructive" className="rounded-full size-8 aspect-square p-0" disabled={loading}>
     <Trash className="size-4" />
    </Button>
   </DialogTrigger>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Are you absolutely sure?</DialogTitle>
     <DialogDescription>
      This action cannot be undone. This will permanently delete this employee and remove their data from our
      servers.
     </DialogDescription>
    </DialogHeader>
    <DialogFooter>
     <DialogClose asChild>
      <Button variant="outline">Cancel</Button>
     </DialogClose>
     <DialogClose asChild>
      <Button className="bg-red-500 hover:bg-red-500 hover:opacity-90" onClick={onDeleteEmployeeClicked}>
       Delete
      </Button>
     </DialogClose>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}

export default DeleteEmployee;
