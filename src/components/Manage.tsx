import { selectEmployeeById, selectEmployeeIds, useGetEmployeesQuery } from "@/app/employeeApiSlice";
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
import Loader from "./ui/loader";
import { useState } from "react";

function ManageEmployees({ }) {
 const { isLoading } = useGetEmployeesQuery();

 const employees = useSelector(selectEmployeeIds);

 return (
  <>
   <main className="relative bg-slate-100 p-4 basis-2/3 grow flex flex-col md:overflow-auto">
    <SectionHeading>Manage your employees</SectionHeading>
    <div className="relative flex-stretch">
     {isLoading ? <Loader />:
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
      </Table>}
    </div>
   </main>
  </>
 );
}

const EmployeesRow = ({ employeeId }) => {
 const loadingState = useState(false);
 
 const employee = useSelector((state) => selectEmployeeById(state, employeeId));
 const supervisor = useSelector((state) => selectEmployeeById(state, employee.supervisorId));

 return (
  <TableRow>
   <TableCell className="font-medium">{employee?.name}</TableCell>
   <TableCell>{supervisor?.name || "—"}</TableCell>
   <TableCell className="flex gap-1 flex-wrap">
    <EditEmployee employee={employee} loadingState={loadingState} />
    <DeleteEmployee employee={employee} loadingState={loadingState} />
   </TableCell>
  </TableRow>
 );
};

export default ManageEmployees;
