import { selectEmployeeById, selectEmployeeIds } from "@/app/employeeApiSlice";
import SectionHeading from "./ui/section-heading";
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

function ManageEmployees({ }) {
 const employees = useSelector(selectEmployeeIds);

 return (
  <>
   <main className="bg-slate-100 p-4 basis-2/3 grow flex flex-col md:overflow-auto">
    <SectionHeading>Manage your employees</SectionHeading>

     <Table>
      <TableCaption>You're all done!</TableCaption>
      <TableHeader>
       <TableRow>
        <TableHead className="w-[200px]">Name</TableHead>
        <TableHead className="w-[200px]">Supervised By</TableHead>
        <TableHead className="w-[200px]">Edit</TableHead>
       </TableRow>
      </TableHeader>
      <TableBody>
       {employees?.map((id) => {
        return <EmployeesRow employeeId={id} key={id} />;
       })}
      </TableBody>
     </Table>
   </main>
  </>
 );
}

const EmployeesRow = ({ employeeId }) => {
 const employee = useSelector((state) => selectEmployeeById(state, employeeId));
 const supervisor = useSelector((state) => selectEmployeeById(state, employee.supervisorId));

 return (
  <TableRow>
   <TableCell className="font-medium">{employee?.name}</TableCell>
   <TableCell>{supervisor?.name || "—"}</TableCell>
   <TableCell className="flex gap-1 flex-wrap">
    <EditEmployee employee={employee} />
    <DeleteEmployee employee={employee} />
   </TableCell>
  </TableRow>
 );
};

export default ManageEmployees;
