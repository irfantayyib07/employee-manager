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
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";
import { useSelector } from "react-redux";
import { selectSupervisorById } from "@/features/supervisors/supervisosSlice";

function ManageEmployees({ }) {
 const { data: employees } = useGetEmployeesQuery("Employees");

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
      employees?.map(employee => {
       return <EmployeesRow employee={employee} key={employee.id} />
      })
     }
    </TableBody>
   </Table>

  </>
 );
}

const EmployeesRow = ({ employee }) => {
 const supervisor = useSelector(state => selectSupervisorById(state, employee.supervisorId));

 return (
  <TableRow>
   <TableCell className="font-medium">{employee.name}</TableCell>
   <TableCell>{supervisor?.name}</TableCell>
   <TableCell className="flex gap-1 flex-wrap">
    <EditEmployee employee={employee} />
    <DeleteEmployee employeeId={employee.id} />
   </TableCell>
  </TableRow>
 );
};

export default ManageEmployees;
