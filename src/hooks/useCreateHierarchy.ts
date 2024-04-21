import { useGetEmployeesBySupervisorIdQuery } from "@/app/employeeApiSlice";

function useCreateHierarchy(supervisorId) {
 return useGetEmployeesBySupervisorIdQuery(supervisorId);
} 

export default useCreateHierarchy;
