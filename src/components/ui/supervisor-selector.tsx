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
import { useAppSelector } from "@/app/store";
import React, { useEffect } from "react";

type SupervisorSelectorProps = {
 employee?: Employee;
 defaultValue?: Employee;
 supervisorId: string;
 setSupervisorId: React.Dispatch<React.SetStateAction<string>>;
};

function SupervisorSelector({ employee, defaultValue, supervisorId, setSupervisorId }: SupervisorSelectorProps) {
 const supervisors = useAppSelector(selectAllEmployees);

 const ceo = supervisors.find(supervisor => {
  return supervisor.supervisorId === "-";
 });
 
 useEffect(() => {
  if (!ceo && !defaultValue) setSupervisorId("-");
 }, [])

 return (
  <Select value={supervisorId} onValueChange={value => setSupervisorId(value)}>
   <SelectTrigger className="w-[180px]">
    <SelectValue placeholder={defaultValue?.name || "Select a supervisor"} />
   </SelectTrigger>
   <SelectContent>
    <SelectGroup>
     <SelectLabel>Supervisors</SelectLabel>
     {(ceo?.id === employee?.id || !ceo) && <SelectItem value="-">No Supervisor</SelectItem>}
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
