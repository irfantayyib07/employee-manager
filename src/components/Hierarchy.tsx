import SectionHeading from "./ui/SectionHeading";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useSelector } from "react-redux";
import { selectAllSupervisors } from "@/features/supervisors/supervisosSlice";
import { useGetEmployeesBySupervisorIdQuery } from "@/features/employees/employeeApiSlice";

function Hierarchy({ }) {
 const supervisors = useSelector(selectAllSupervisors);

 return (
  <>
   <SectionHeading>
    Hierarchy
   </SectionHeading>

   <SimpleTreeView
    aria-label="file system navigator"
    sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
   >
    {
     supervisors.map(sup => {
      return <Tree sup={sup} key={sup.id} />;
     })
    }
   </SimpleTreeView>
  </>
 );
}

function Tree({ sup }) {
 const { data: employees } = useGetEmployeesBySupervisorIdQuery(sup.id);

 return (
  <TreeItem itemId={sup.id} label={sup.name}>
   {
    employees?.map(employee => {
     return <TreeItem itemId={employee.id + employee.name} label={employee.name} key={employee.id} />
    })
   }
  </TreeItem>
 );
}

export default Hierarchy;
