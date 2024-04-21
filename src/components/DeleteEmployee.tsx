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
import { useDeleteEmployeeMutation } from "@/features/employees/employeeApiSlice";
import { Trash } from "lucide-react";
import { useToast } from "./ui/use-toast";

function DeleteEmployee({ employeeId }) {
 const [deleteEmployee] = useDeleteEmployeeMutation();
 const { toast } = useToast();

 const onDeleteEmployeeClicked = async () => {
  try {
   await deleteEmployee({ id: employeeId });
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
    <Button variant="destructive" className="rounded-full size-8 aspect-square p-0"><Trash className="size-4" /></Button>
   </AlertDialogTrigger>
   <AlertDialogContent>
    <AlertDialogHeader>
     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
     <AlertDialogDescription>
      This action cannot be undone. This will permanently delete this employee and remove their data from our servers.
     </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
     <AlertDialogCancel>Cancel</AlertDialogCancel>
     <AlertDialogAction className="bg-red-500 hover:bg-red-500 hover:opacity-90" onClick={onDeleteEmployeeClicked}>Delete</AlertDialogAction>
    </AlertDialogFooter>
   </AlertDialogContent>
  </AlertDialog>
 );
}

export default DeleteEmployee;
