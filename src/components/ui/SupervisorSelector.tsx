import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectLabel,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { selectAllEmployees } from "@/app/employeeApiSlice";
import { useSelector } from "react-redux";

function SupervisorSelector({ employee, defaultValue, supervisorId, setSupervisorId }) {
 const supervisors = useSelector(selectAllEmployees);

 return (
  <Select value={supervisorId} onValueChange={setSupervisorId}>
   <SelectTrigger className="w-[180px]">
    <SelectValue placeholder={defaultValue?.name || "Select a supervisor"} />
   </SelectTrigger>
   <SelectContent>
    <SelectGroup>
     <SelectLabel>Supervisors</SelectLabel>
     <SelectItem value={"—"}>No Supervisor</SelectItem>
     {supervisors?.map((supervisor) => {
      if (supervisor.id !== employee?.id) {
       if (!employee?.subordinates.includes(supervisor.id))
        return (
         <SelectItem key={supervisor.id} value={supervisor.id}>
          {supervisor.name}
         </SelectItem>
        );
      }
     })}
    </SelectGroup>
   </SelectContent>
  </Select>
 );
}

export default SupervisorSelector;
