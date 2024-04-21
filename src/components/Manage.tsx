import { useGetEmployeesQuery } from "@/features/employees/employeeApiSlice";
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
import { useSelector } from "react-redux";
import { selectAllSupervisors, selectSupervisorById } from "@/features/supervisors/supervisosSlice";

const TableRowReturn = ({ employee }) => {
 const supervisor = useSelector(state => selectSupervisorById(state, employee.supervisorId));
 console.log(employee.supervisorId);

 return (
  <TableRow key={employee.id}>
   <TableCell className="font-medium">{employee.name}</TableCell>
   <TableCell>{supervisor?.name}</TableCell>
   <TableCell className="space-x-2">
    <EditEmployee employee={employee} />
    <DeleteEmployee employeeId={employee.id} />
   </TableCell>
  </TableRow>
 );
};


function ManageEmployees({ }) {
 const { data } = useGetEmployeesQuery("Employees");
 const supervisors = useSelector(selectAllSupervisors);

 console.log(supervisors);

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
       return <TableRowReturn employee={employee} key={employee.id} />
      })
     }
    </TableBody>
   </Table>

  </>
 );
}

export default ManageEmployees;
