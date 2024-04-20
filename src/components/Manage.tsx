import { useGetEmployeesQuery } from "@/features/employeeApiSlice";
import SectionHeading from "./ui/SectionHeading";
import {
 Table,
 TableBody,
 TableCaption,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { EditEmployee } from "./EditEmployee";
import { DeleteEmployee } from "./DeleteEmployee";


function ManageEmployees({ }) {
 const { data } = useGetEmployeesQuery("Employees");

 return (
  <>
   <SectionHeading>
    Manage your employees
   </SectionHeading>

   <Table>
    <TableCaption>You're all done!</TableCaption>
    <TableHeader>
     <TableRow>
      <TableHead className="w-[200px]">Name</TableHead>
      <TableHead className="w-[200px]">Supervisor</TableHead>
      <TableHead className="w-[200px]">Edit</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
     {
      data?.map(employee => {
       return <TableRow key={employee.id}>
        <TableCell className="font-medium">{employee.name}</TableCell>
        <TableCell>{employee.supervisor}</TableCell>
        <TableCell className="space-x-2">
         <EditEmployee employee={employee} />
         <DeleteEmployee />
        </TableCell>
       </TableRow>;
      })
     }
    </TableBody>
   </Table>

  </>
 );
}

export default ManageEmployees;
