import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
 selectEmployeeById,
 useDeleteEmployeeMutation,
 useUpdateEmployeeMutation,
} from "@/app/employeeApiSlice";
import { Trash } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useSelector } from "react-redux";

function DeleteEmployee({ employee }) {
 const [deleteEmployee] = useDeleteEmployeeMutation();
 const { toast } = useToast();

 const [updateEmployee] = useUpdateEmployeeMutation();
 const supervisor = useSelector((state) => selectEmployeeById(state, employee.supervisorId));

 const onDeleteEmployeeClicked = async () => {
  try {
   const jobs = [deleteEmployee({ id: employee.id }).unwrap()];
   if (supervisor)
    jobs.push(
     updateEmployee({
      id: supervisor.id,
      subordinates: supervisor.subordinates.filter((id) => id !== employee.id),
     }).unwrap(),
    );

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
  }
 };

 return (
  <AlertDialog>
   <AlertDialogTrigger asChild>
    <Button variant="destructive" className="rounded-full size-8 aspect-square p-0">
     <Trash className="size-4" />
    </Button>
   </AlertDialogTrigger>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
     <AlertDialogDescription>
      This action cannot be undone. This will permanently delete this employee and remove their data from our
      servers.
     </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel>Cancel</AlertDialogCancel>
     <AlertDialogAction
      className="bg-red-500 hover:bg-red-500 hover:opacity-90"
      onClick={onDeleteEmployeeClicked}
     >
      Delete
     </AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
  </AlertDialog>
 );
}

export default DeleteEmployee;
